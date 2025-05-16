import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    
    console.log('Sesión completa:', JSON.stringify(session, null, 2));
    
    if (!session || !session.user || !session.user.id) {
      console.log('No autenticado o falta ID de usuario');
      return NextResponse.json(
        { error: 'No autenticado o falta ID de usuario' },
        { status: 401 }
      );
    }
    
    // Obtener el ID del usuario de la sesión
    const userId = session.user.id;
    console.log('ID de usuario de la sesión:', userId);
    
    // Parsear los datos del formulario
    const data = await request.json();
    const { problem, solution, features, monetization, roadmap, technology } = data;
    
    // Validar datos requeridos
    if (!problem || !solution || !features || !monetization || !roadmap || !technology) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }
    
    // Verificar que el usuario existe en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });
    
    if (!user) {
      console.log('Usuario no encontrado en la base de datos');
      return NextResponse.json(
        { error: 'Usuario no encontrado en la base de datos' },
        { status: 404 }
      );
    }
    
    console.log('Usuario encontrado:', user.id);
    
    // Crear el producto usando SQL directo para evitar problemas con el modelo
    const id = randomUUID();
    await prisma.$executeRaw`
      INSERT INTO "Product" (
        "id", 
        "problema", 
        "solucion", 
        "funcionalidades", 
        "monetizacion", 
        "roadmap", 
        "tecnologia", 
        "userId", 
        "createdAt", 
        "updatedAt"
      )
      VALUES (
        ${id},
        ${problem},
        ${solution},
        ${features},
        ${monetization},
        ${roadmap},
        ${technology},
        ${user.id},
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      );
    `;
    
    console.log('Producto creado correctamente con ID:', id);
    
    return NextResponse.json({ 
      success: true, 
      productId: id 
    }, { status: 201 });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
} 