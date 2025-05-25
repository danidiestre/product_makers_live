"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { App, Maker } from "@/lib/types";

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

export async function getProducts() {
  try {
    // Obtener productos con su relación de usuario (maker)
    const products = await prisma.product.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convertir los productos de la base de datos al formato App
    const formattedProducts = products.map((product) => {
      // Convertir el rol a una categoría válida para Maker
      const roleToCategory = (role?: string): Maker["category"] => {
        if (!role) return "Other";

        switch (role) {
          case "Designer":
          case "Developer":
          case "Marketing":
          case "Founder":
          case "Product Manager":
            return role as Maker["category"];
          default:
            return "Other";
        }
      };

      // Convertir el usuario a formato Maker
      const maker = product.user
        ? {
            id: product.user.id,
            name: product.user.name || "Unknown",
            avatar:
              product.user.image ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            role: roleToCategory(product.user.role?.toString()),
            bio: product.user.bio || "",
            category: roleToCategory(product.user.role?.toString()),
            makerCategory: roleToCategory(product.user.role?.toString()),
            isVerified: true,
            joinedDate:
              product.user.emailVerified?.toISOString().split("T")[0] ||
              new Date().toISOString().split("T")[0],
            followers: 0,
            twitter: product.user.twitter || undefined,
            github: product.user.github || undefined,
            website: product.user.website || undefined,
            linkedin: product.user.linkedin || undefined,
          }
        : undefined;

      // Convertir al formato App
      const app: App = {
        id: product.id,
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        imageUrl: product.iconUrl,
        screenshots: product.screenshotUrls || [],
        votes: 0, // Por ahora, dejamos los votos en 0 ya que no podemos contarlos
        commentsCount: 0, // Por ahora, dejamos los comentarios en 0
        launchDate: product.createdAt.toISOString().split("T")[0],
        externalLinks: {
          website: product.link,
        },
        makers: maker ? [maker] : [],
        // Campos adicionales requeridos por la interfaz App
        tags: [],
        badges: [],
        // Mapear los campos en español a sus equivalentes en inglés
        problem: product.problema || '',
        solution: product.solucion || '',
        features: product.funcionalidades || '',
        monetization: product.monetizacion || '',
        roadmap: product.roadmap || '',
        technology: product.tecnologia || ''
      };

      return app;
    });

    return { success: true, data: formattedProducts };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { success: false, error: 'Failed to fetch products' };
  }
}

export async function getTopProducts(limit = 5) {
  try {
    const result = await getProducts();
    
    if (!result.success || !result.data) {
      return result;
    }
    
    // Get first 'limit' products
    const topProducts = result.data.slice(0, limit);
    return { success: true, data: topProducts };
  } catch (error) {
    console.error('Failed to fetch top products:', error);
    return { success: false, error: 'Failed to fetch top products' };
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: true
      }
    });

    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    // Convert to App format (reusing the same conversion logic from getProducts)
    const roleToCategory = (role?: string): Maker['category'] => {
      if (!role) return "Other";
      
      switch(role) {
        case "Designer":
        case "Developer":
        case "Marketing":
        case "Founder":
        case "Product Manager":
          return role as Maker['category'];
        default:
          return "Other";
      }
    };
    
    const maker = product.user ? {
      id: product.user.id,
      name: product.user.name || 'Unknown',
      avatar: product.user.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      role: roleToCategory(product.user.role?.toString()),
      bio: product.user.bio || '',
      category: roleToCategory(product.user.role?.toString()),
      makerCategory: roleToCategory(product.user.role?.toString()),
      isVerified: true,
      joinedDate: product.user.emailVerified?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      followers: 0,
      twitter: product.user.twitter || undefined,
      github: product.user.github || undefined,
      website: product.user.website || undefined,
      linkedin: product.user.linkedin || undefined
    } : undefined;

    const app: App = {
      id: product.id,
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      imageUrl: product.iconUrl,
      screenshots: product.screenshotUrls || [],
      votes: 0,
      commentsCount: 0,
      launchDate: product.createdAt.toISOString().split("T")[0],
      externalLinks: {
        website: product.link,
      },
      makers: maker ? [maker] : [],
      tags: [],
      badges: [],
      // Mapear los campos en español a sus equivalentes en inglés
      problem: product.problema || '',
      solution: product.solucion || '',
      features: product.funcionalidades || '',
      monetization: product.monetizacion || '',
      roadmap: product.roadmap || '',
      technology: product.tecnologia || ''
    };

    return { success: true, data: app };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

export async function getUserProducts(userId: string) {
  try {
    // Obtener productos de un usuario específico
    const products = await prisma.product.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Reutiliza la misma lógica de conversión de getProducts
    const formattedProducts = products.map((product) => {
      // Convertir el rol a una categoría válida para Maker
      const roleToCategory = (role?: string): Maker["category"] => {
        if (!role) return "Other";

        switch (role) {
          case "Designer":
          case "Developer":
          case "Marketing":
          case "Founder":
          case "Product Manager":
            return role as Maker["category"];
          default:
            return "Other";
        }
      };

      // Convertir el usuario a formato Maker
      const maker = product.user
        ? {
            id: product.user.id,
            name: product.user.name || "Unknown",
            avatar:
              product.user.image ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            role: roleToCategory(product.user.role?.toString()),
            bio: product.user.bio || "",
            category: roleToCategory(product.user.role?.toString()),
            makerCategory: roleToCategory(product.user.role?.toString()),
            isVerified: true,
            joinedDate:
              product.user.emailVerified?.toISOString().split("T")[0] ||
              new Date().toISOString().split("T")[0],
            followers: 0,
            twitter: product.user.twitter || undefined,
            github: product.user.github || undefined,
            website: product.user.website || undefined,
            linkedin: product.user.linkedin || undefined,
          }
        : undefined;

      // Convertir al formato App
      const app: App = {
        id: product.id,
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        imageUrl: product.iconUrl,
        screenshots: product.screenshotUrls || [],
        votes: 0, // Por ahora, dejamos los votos en 0 ya que no podemos contarlos
        commentsCount: 0, // Por ahora, dejamos los comentarios en 0
        launchDate: product.createdAt.toISOString().split("T")[0],
        externalLinks: {
          website: product.link,
        },
        makers: maker ? [maker] : [],
        tags: [],
        badges: [],
        // Mapear los campos en español a sus equivalentes en inglés
        problem: product.problema || '',
        solution: product.solucion || '',
        features: product.funcionalidades || '',
        monetization: product.monetizacion || '',
        roadmap: product.roadmap || '',
        technology: product.tecnologia || ''
      };

      return app;
    });

    return { success: true, data: formattedProducts };
  } catch (error) {
    console.error("Failed to fetch user products:", error);
    return { success: false, error: "Failed to fetch user products" };
  }
}
