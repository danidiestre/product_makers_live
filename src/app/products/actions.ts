"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  try {
    // Get current user
    const session = await getServerSession();
    if (!session?.user?.email) {
      return {
        success: false,
        error: "You must be logged in to create a product",
      };
    }

    // Get the user from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Extraer datos del formulario
    const name = formData.get("name") as string;
    const tagline = formData.get("tagline") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const problem = formData.get("problem") as string;
    const solution = formData.get("solution") as string;
    const features = formData.get("features") as string;
    const monetization = formData.get("monetization") as string;
    const roadmap = formData.get("roadmap") as string;
    const technology = formData.get("technology") as string;

    // Extraer URLs de imágenes
    const iconUrl = formData.get("iconUrl") as string;
    const screenshotUrls = formData.getAll("screenshotUrls") as string[];

    // Validación básica
    if (!name || !description || !iconUrl) {
      return {
        success: false,
        error: "Los campos nombre, descripción e icono son obligatorios",
      };
    }

    // Create product in database - using updated schema fields
    const product = await prisma.product.create({
      data: {
        name,
        tagline,
        description,
        link,
        iconUrl,
        screenshotUrls,
        problema: problem,
        solucion: solution,
        funcionalidades: features,
        monetizacion: monetization,
        roadmap,
        tecnologia: technology,
        userId: user.id,
      },
    });

    if (!product) {
      return { success: false, error: "Failed to create product" };
    }

    // Revalidate products page
    revalidatePath("/products");

    return { success: true, data: product };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: error.message || "Failed to create product",
    };
  }
}
