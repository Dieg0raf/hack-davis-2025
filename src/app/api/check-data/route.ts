import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';

export async function GET() {
  try {
    const product = await prisma.sonnyAngelProduct.findUnique({
      where: { id: '0035b9c1-76e4-4a87-8a22-8c486ace758d' }
    });
    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error checking data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 