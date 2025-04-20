import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '../../../../../prisma/prisma';

// Updated function to create user with profile
async function createUser({
  clerkId,
  userFirstName,
  userLastName,
  userEmail,
}: {
  clerkId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}) {
  try {
    // Check if user already exists to avoid duplicates
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { clerkId },
          { email: userEmail }
        ]
      },
      include: { profile: true }
    });

    if (existingUser) {
      // Update existing user with Clerk ID if needed
      if (!existingUser.clerkId) {
        return await prisma.user.update({
          where: { id: existingUser.id },
          data: { clerkId },
          include: { profile: true }
        });
      }
      return existingUser;
    }

    // Generate a username based on email and random number
    const username = (userEmail.split('@')[0] + Math.floor(Math.random() * 1000)).toLowerCase();

    // Create new user with profile
    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email: userEmail,
        name: `${userFirstName} ${userLastName}`.trim(),
        username,
        profile: {
          create: {
            starRating: 0,
            amountProductsSold: 0
          }
        }
      },
      include: { profile: true }
    });

    console.log('Created new user with profile in database:', newUser.id);
    return newUser;
  } catch (error) {
    console.error('Error in createUser function:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  console.log("Webhook received");
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Create User in the db
  if (evt.type === 'user.created') {
    const { id, email_addresses } = evt.data;
    const first_name = evt.data.first_name || '';
    const last_name = evt.data.last_name || '';

    // Check if there are any email addresses
    if (!email_addresses || email_addresses.length === 0) {
      console.error('No email addresses found in webhook data');
      return new Response('Invalid user data: no email address', {
        status: 400,
      });
    }

    const primary_email = email_addresses[0].email_address;

    // Validate required fields
    if (!id || !primary_email) {
      console.error('Missing required fields:', { id, primary_email });
      return new Response('Invalid user data: missing required fields', {
        status: 400,
      });
    }

    try {
      const user = await createUser({
        clerkId: id,
        userFirstName: first_name,
        userLastName: last_name,
        userEmail: primary_email,
      });

      return new Response(JSON.stringify({
        success: true,
        userId: user.id,
        profileId: user.profile?.id || null,
        message: 'User and profile created successfully'
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.error('Error creating user in db:', err);
      return new Response('Error creating user in db', {
        status: 500,
      });
    }
  }

  return new Response('Webhook processed successfully', { status: 200 });
}