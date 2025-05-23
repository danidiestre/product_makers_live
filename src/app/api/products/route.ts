import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

/**
 * GET /api/products
 * Devuelve todos los productos de la base de datos
 */
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
} 