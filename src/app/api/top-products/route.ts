import { NextResponse } from 'next/server';
import { getTopProducts } from '@/lib/products';

/**
 * GET /api/top-products
 * Devuelve los productos más populares basado en votos
 */
export async function GET() {
  try {
    // Use a static limit value instead of parsing from URL to allow static optimization
    const limit = 5;
    
    const products = await getTopProducts(limit);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching top products:', error);
    return NextResponse.json(
      { error: 'Error al obtener los productos destacados' },
      { status: 500 }
    );
  }
} 