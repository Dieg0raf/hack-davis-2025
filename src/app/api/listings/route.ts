import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Get text fields
    const productId = formData.get('productId') as string;
    const listerId = formData.get('listerId') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') ? new Prisma.Decimal(formData.get('price') as string) : null;
    const status = formData.get('status') as string;
    const colors = JSON.parse(formData.get('colors') as string) as string[];

    // Validate required fields
    if (!productId || !listerId || !description) {
      return NextResponse.json(
        { error: 'Missing required fields', details: { productId, listerId, description } },
        { status: 400 }
      );
    }

    // Handle file uploads
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    // TODO: Upload images to your storage service (e.g., AWS S3, Cloudinary)
    // For now, we'll just store the file names
    for (const file of imageFiles) {
      imageUrls.push(file.name);
    }

    // Verify the product exists
    const product = await prisma.sonnyAngelProduct.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Verify the lister exists
    const lister = await prisma.profile.findUnique({
      where: { id: listerId },
    });

    if (!lister) {
      return NextResponse.json(
        { error: 'Lister profile not found' },
        { status: 404 }
      );
    }

    // Create the listing
    const listing = await prisma.listing.create({
      data: {
        productId,
        listerId,
        colors,
        description,
        price,
        status,
        imageUrls,
      },
      include: {
        product: true,
        lister: true,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    
    // Return more detailed error information
    return NextResponse.json(
      { 
        error: 'Failed to create listing',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 