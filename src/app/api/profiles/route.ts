import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get('clerkId');

    if (!clerkId) {
        return NextResponse.json({ error: 'Missing clerkId' }, { status: 400 });
    }

    try {
        // Find user profile by clerk ID
        const user = await prisma.user.findUnique({
            where: { clerkId },
            include: { profile: true }
        });

        if (!user || !user.profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json({ profileId: user.profile.id });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}