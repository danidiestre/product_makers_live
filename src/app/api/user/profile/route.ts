import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth-options'

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to update your profile' },
        { status: 401 }
      )
    }
    
    const data = await request.json()
    
    // Validate the role value if provided
    if (data.role && !['Developer', 'Designer', 'ProductManager', 'Marketer', 'Founder', 'Other'].includes(data.role)) {
      return NextResponse.json(
        { error: 'Invalid role value' },
        { status: 400 }
      )
    }
    
    // Update user profile in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        name: data.name,
        role: data.role || undefined,
        // Add any other fields from your schema that you want to update
      }
    })
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        role: updatedUser.role
      }
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
} 