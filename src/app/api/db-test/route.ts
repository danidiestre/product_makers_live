import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/db-test
 * Endpoint para probar la conexión a la base de datos
 */
export async function GET() {
  try {
    console.log('DB-Test: Intentando consultar la tabla Product directamente');
    
    // Intentar una consulta simple
    const count = await prisma.product.count();
    console.log('DB-Test: Número de productos encontrados:', count);
    
    // Obtener un producto para verificar la estructura
    const firstProduct = await prisma.product.findFirst();
    console.log('DB-Test: Primer producto:', firstProduct);
    
    return NextResponse.json({
      success: true,
      count,
      firstProduct: firstProduct || null
    });
  } catch (error) {
    console.error('DB-Test: Error al conectar con la base de datos:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: `Error al conectar con la base de datos: ${error instanceof Error ? error.message : String(error)}`
      },
      { status: 500 }
    );
  }
} 