import { NextResponse } from 'next/server';
import { getTopProducts } from '@/lib/products';

/**
 * GET /api/top-products
 * Devuelve los productos más populares basado en votos
 */
export async function GET(request: Request) {
  try {
    // Obtener el límite desde los parámetros de consulta, por defecto 5
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    
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