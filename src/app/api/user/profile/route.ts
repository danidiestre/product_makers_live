import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

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
    
    // Define the update data with proper type casting
    const updateData: any = {
      name: data.name,
      role: data.role as Role | undefined,
      bio: data.bio,
      twitter: data.twitter,
      github: data.github,
      linkedin: data.linkedin,
      website: data.website,
    }
    
    // Update user profile in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: updateData
    })
    
    // Cast the user to our extended type
    const userWithExtendedFields = updatedUser as unknown as ExtendedUser
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: userWithExtendedFields.id,
        name: userWithExtendedFields.name,
        email: userWithExtendedFields.email,
        image: userWithExtendedFields.image,
        role: userWithExtendedFields.role,
        bio: userWithExtendedFields.bio,
        twitter: userWithExtendedFields.twitter,
        github: userWithExtendedFields.github,
        linkedin: userWithExtendedFields.linkedin,
        website: userWithExtendedFields.website,
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