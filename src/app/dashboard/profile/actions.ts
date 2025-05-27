"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { Role, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth-options";

export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);

  // Check if we have either ID or email to identify the user
  if (!session?.user?.id && !session?.user?.email) {
    return null;
  }

  // Try to find user by ID first (more reliable), then fallback to email
  let user = null;
  if (session.user.id) {
    user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
  }

  // Fallback to email if ID search didn't work and email is available
  if (!user && session.user.email) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
  }

  // Si no encontramos el usuario pero tenemos datos válidos de sesión,
  // crear el usuario automáticamente (especialmente útil para usuarios de Discord sin email)
  if (!user && session.user.id) {
    try {
      user = await prisma.user.create({
        data: {
          id: session.user.id,
          name: session.user.name || null,
          email: session.user.email || null,
          image: session.user.image || null,
        },
      });
    } catch (error) {
      // Si falla la creación, intentar encontrar el usuario otra vez
      // (por si ya fue creado por otro proceso concurrente)
      if (session.user.id) {
        user = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
        });
      }
    }
  }

  return user;
}

interface UpdateProfileData {
  name: string;
  bio: string;
  role: Role | "";
  twitter: string;
  github: string;
  linkedin: string;
  website: string;
}

export async function updateProfile(data: UpdateProfileData) {
  try {
    const session = await getServerSession(authOptions);

    // Check if we have either ID or email to identify the user
    if (!session?.user?.id && !session?.user?.email) {
      throw new Error("You must be logged in to update your profile");
    }

    // Validate role
    if (data.role && !Object.values(Role).includes(data.role)) {
      throw new Error("Invalid role selected");
    }

    // Determine which field to use for update (prefer ID over email)
    const whereCondition = session.user.id
      ? { id: session.user.id }
      : { email: session.user.email! }; // We know email exists if ID doesn't due to the check above

    // Update user profile
    const user = await prisma.user.update({
      where: whereCondition,
      data: {
        name: data.name || null,
        bio: data.bio || null,
        role: data.role || null,
        twitter: data.twitter || null,
        github: data.github || null,
        linkedin: data.linkedin || null,
        website: data.website || null,
      },
    });

    // Revalidate both profile and dashboard pages
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");

    return { success: true, user };
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return { success: false, error: error.message };
  }
}
