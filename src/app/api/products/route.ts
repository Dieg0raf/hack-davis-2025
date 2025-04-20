import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';

export async function GET() {
  try {
    const products = await prisma.sonnyAngelProduct.findMany({
      select: {
        id: true,
        name: true,
        series: true,
        year: true,
      },
      orderBy: {
        series: 'asc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 