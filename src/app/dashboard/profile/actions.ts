"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { Role, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

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
    const session = await getServerSession();

    if (!session?.user?.email) {
      throw new Error("You must be logged in to update your profile");
    }

    // Validate role
    if (data.role && !Object.values(Role).includes(data.role)) {
      throw new Error("Invalid role selected");
    }

    // Update user profile
    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
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

    revalidatePath("/dashboard/profile");
    return { success: true, user };
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return { success: false, error: error.message };
  }
}
