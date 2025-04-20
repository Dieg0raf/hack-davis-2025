import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma';

export async function GET() {
  try {
    const series = await prisma.sonnyAngelProduct.findMany({
      select: {
        series: true,
        year: true,
      },
      distinct: ['series'],
      orderBy: {
        series: 'asc',
      },
    });

    return NextResponse.json(series);
  } catch (error) {
    console.error('Error fetching series:', error);
    return NextResponse.json(
      { error: 'Failed to fetch series' },
      { status: 500 }
    );
  }
} 