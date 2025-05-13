import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Inicializar el cliente Prisma con opciones de registro para depurar
export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

// Guardar la referencia en desarrollo para evitar múltiples instancias
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 