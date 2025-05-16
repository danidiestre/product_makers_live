'use server'

import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return { success: true, data: users }
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return { success: false, error: 'Failed to fetch users' }
  }
}

export async function getUsersByRole(role: Role | 'All') {
  try {
    if (role === 'All') {
      return getUsers()
    }

    const users = await prisma.user.findMany({
      where: {
        role
      },
      orderBy: {
        name: 'asc'
      }
    })
    return { success: true, data: users }
  } catch (error) {
    console.error('Failed to fetch users by role:', error)
    return { success: false, error: 'Failed to fetch users by role' }
  }
}

export async function getMakerById(id: string) {
  try {
    const maker = await prisma.user.findUnique({
      where: { id }
    })

    if (!maker) {
      return { success: false, error: 'Maker not found' }
    }

    return { success: true, data: maker }
  } catch (error) {
    console.error('Error fetching maker:', error)
    return { success: false, error: 'Failed to fetch maker' }
  }
}