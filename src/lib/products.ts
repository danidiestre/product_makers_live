import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { App, Maker } from "./types";

/**
 * Obtiene todos los productos desde la base de datos y los convierte
 * al formato App que espera la UI
 */
export async function getProducts(): Promise<App[]> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Obtener productos con su relación de usuario (maker) y votos
    const products = await prisma.product.findMany({
      include: {
        user: true,
        votes: {
          include: {
            user: true,
          },
        },
      },
    });

    // Convertir los productos de la base de datos al formato App
    return products.map((product) => {
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

      // Calcular votos y si el usuario actual ha votado
      const voteCount = product.votes.length;
      const hasUserVoted = userId
        ? product.votes.some((vote) => vote.userId === userId)
        : false;

      // Convertir al formato App
      const app: App = {
        id: product.id,
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        imageUrl: product.iconUrl,
        screenshots: product.screenshotUrls || [],
        votes: voteCount,
        commentsCount: 0, // Por ahora, dejamos los comentarios en 0
        launchDate: product.createdAt.toISOString().split("T")[0],
        externalLinks: {
          website: product.link,
        },
        makers: maker ? [maker] : [],
        // Campos adicionales requeridos por la interfaz App
        tags: [],
        badges: [],
        // Campo nuevo para indicar si el usuario ha votado
        initialHasVoted: hasUserVoted,
      };

      return app;
    });
  } catch (error) {
    console.error("Error en getProducts:", error);
    throw error;
  }
}

/**
 * Obtiene los productos más populares basado en número de votos
 */
export async function getTopProducts(limit = 5): Promise<App[]> {
  const products = await getProducts();
  // Ordenar por número de votos (descendente) y tomar los primeros 'limit'
  return products.sort((a, b) => b.votes - a.votes).slice(0, limit);
}
