"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { App, Maker } from "@/lib/types";

// Helper function to get current user from session
async function getCurrentUserFromSession() {
  const session = await getServerSession(authOptions);

  // Check if we have either ID or email to identify the user
  if (!session?.user?.id && !session?.user?.email) {
    return null;
  }

  // Try to find user by ID first (more reliable), then fallback to email
  let user = null;
  if (session.user.id) {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
  }

  // Fallback to email if ID search didn't work and email is available
  if (!user && session.user.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  }

  return user;
}

export async function createProduct(formData: FormData) {
  try {
    // Get current user
    const user = await getCurrentUserFromSession();
    if (!user) {
      return {
        success: false,
        error: "You must be logged in to create a product",
      };
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
    const productType = formData.get("productType") as string;

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
        productType: productType as any, // Prisma will validate the enum
        userId: user.id,
      },
    });

    if (!product) {
      return { success: false, error: "Failed to create product" };
    }

    // Revalidate products page
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/app/${product.id}`);
    revalidatePath(`/maker/${user.id}`);

    return { success: true, data: product };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: error.message || "Failed to create product",
    };
  }
}

export async function updateProduct(formData: FormData) {
  try {
    // Get current user
    const user = await getCurrentUserFromSession();
    if (!user) {
      return {
        success: false,
        error: "You must be logged in to update a product",
      };
    }

    // Extraer ID del producto
    const productId = formData.get("id") as string;
    if (!productId) {
      return { success: false, error: "Product ID is required" };
    }

    // Verificar que el producto existe y pertenece al usuario
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return { success: false, error: "Product not found" };
    }

    if (existingProduct.userId !== user.id) {
      return { success: false, error: "You can only edit your own products" };
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
    const productType = formData.get("productType") as string;

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

    // Update product in database
    const product = await prisma.product.update({
      where: { id: productId },
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
        productType: productType as any, // Prisma will validate the enum
      },
    });

    if (!product) {
      return { success: false, error: "Failed to update product" };
    }

    // Revalidate products page
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${productId}`);
    revalidatePath(`/app/${productId}`);
    revalidatePath(`/maker/${user.id}`);

    return { success: true, data: product };
  } catch (error: any) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: error.message || "Failed to update product",
    };
  }
}

export async function deleteProduct(productId: string) {
  try {
    // Get current user
    const user = await getCurrentUserFromSession();
    if (!user) {
      return {
        success: false,
        error: "You must be logged in to delete a product",
      };
    }

    // Verificar que el producto existe y pertenece al usuario
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return { success: false, error: "Product not found" };
    }

    if (existingProduct.userId !== user.id) {
      return { success: false, error: "You can only delete your own products" };
    }

    // Delete the product and all related data (votes will be deleted via cascade)
    await prisma.product.delete({
      where: { id: productId },
    });

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/dashboard");
    revalidatePath(`/app/${productId}`);
    revalidatePath(`/maker/${user.id}`);

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: error.message || "Failed to delete product",
    };
  }
}

// Helper function to convert user role to Maker category
function roleToCategory(role?: string): Maker["category"] {
  if (!role) return "Other";

  switch (role) {
    case "Designer":
    case "Developer":
    case "Marketing":
    case "Founder":
    case "ProductManager":
      return role as Maker["category"];
    default:
      return "Other";
  }
}

// Helper function to convert product to App format
function convertProductToApp(
  product: any,
  voteCount: number = 0,
  hasUserVoted: boolean = false
): App {
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
    votes: voteCount,
    commentsCount: 0, // Por ahora, dejamos los comentarios en 0
    launchDate: product.createdAt.toISOString().split("T")[0],
    externalLinks: {
      website: product.link,
    },
    makers: maker ? [maker] : [],
    tags: [],
    badges: [],
    // Mapear los campos en español a sus equivalentes en inglés
    problem: product.problema || "",
    solution: product.solucion || "",
    features: product.funcionalidades || "",
    monetization: product.monetizacion || "",
    roadmap: product.roadmap || "",
    technology: product.tecnologia || "",
    productType: product.productType || "WEB",
    initialHasVoted: hasUserVoted,
  };

  return app;
}

/**
 * Get products without user session (static-friendly)
 * This function doesn't check user vote status and can be used for static rendering
 */
export async function getProductsStatic() {
  try {
    // Obtener productos con su relación de usuario (maker) y votos
    const products = await prisma.product.findMany({
      include: {
        user: true,
        votes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convertir los productos de la base de datos al formato App
    const formattedProducts = products.map((product) => {
      const voteCount = product.votes.length;
      return convertProductToApp(product, voteCount, false);
    });

    return { success: true, data: formattedProducts };
  } catch (error) {
    console.error("❌ Error en getProductsStatic:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

/**
 * Get products with user vote information (requires session)
 * Use this when you need to know if the current user has voted
 */
export async function getProducts() {
  try {
    // Obtener sesión solo para información de votación, no es requerida
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Obtener productos con su relación de usuario (maker) y votos
    const products = await prisma.product.findMany({
      include: {
        user: true,
        votes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convertir los productos de la base de datos al formato App
    const formattedProducts = products.map((product) => {
      // Calcular votos y si el usuario actual ha votado (solo si está autenticado)
      const voteCount = product.votes.length;
      const hasUserVoted = userId
        ? product.votes.some((vote) => vote.userId === userId)
        : false;

      return convertProductToApp(product, voteCount, hasUserVoted);
    });

    return { success: true, data: formattedProducts };
  } catch (error) {
    console.error("❌ Error en getProducts:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

/**
 * Get top products without user session (static-friendly)
 */
export async function getTopProductsStatic(limit = 5) {
  try {
    const result = await getProductsStatic();

    if (!result.success || !result.data) {
      return result;
    }

    // Sort by votes and get first 'limit' products
    const topProducts = result.data
      .sort((a, b) => b.votes - a.votes)
      .slice(0, limit);

    return { success: true, data: topProducts };
  } catch (error) {
    console.error("Failed to fetch top products:", error);
    return { success: false, error: "Failed to fetch top products" };
  }
}

/**
 * Get top products with user vote information (requires session)
 */
export async function getTopProducts(limit = 5) {
  try {
    const result = await getProducts();

    if (!result.success || !result.data) {
      return result;
    }

    // Sort by votes and get first 'limit' products
    const topProducts = result.data
      .sort((a, b) => b.votes - a.votes)
      .slice(0, limit);

    return { success: true, data: topProducts };
  } catch (error) {
    console.error("Failed to fetch top products:", error);
    return { success: false, error: "Failed to fetch top products" };
  }
}

/**
 * Get user vote status for multiple products
 * This function can be called separately when user session is available
 */
export async function getUserVoteStatus(productIds: string[]) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      // Return empty vote status if not authenticated
      const emptyStatus: Record<string, boolean> = {};
      productIds.forEach((id) => {
        emptyStatus[id] = false;
      });
      return { success: true, data: emptyStatus };
    }

    const userId = session.user.id;

    // Get user votes for the specified products
    const userVotes = await prisma.vote.findMany({
      where: {
        userId,
        productId: { in: productIds },
      },
      select: { productId: true },
    });

    // Create a map of productId -> hasVoted
    const voteStatus: Record<string, boolean> = {};
    productIds.forEach((id) => {
      voteStatus[id] = userVotes.some((vote) => vote.productId === id);
    });

    return { success: true, data: voteStatus };
  } catch (error) {
    console.error("Error getting user vote status:", error);
    return { success: false, error: "Failed to get vote status" };
  }
}

export async function getProductById(id: string) {
  try {
    // Obtener sesión solo para información de votación, no es requerida
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: true,
        votes: true, // Solo necesitamos el conteo y userId
      },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    // Calcular votos y si el usuario actual ha votado (solo si está autenticado)
    const voteCount = product.votes.length;
    const hasUserVoted = userId
      ? product.votes.some((vote) => vote.userId === userId)
      : false;

    const app = convertProductToApp(product, voteCount, hasUserVoted);

    return { success: true, data: app };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

/**
 * Get product by ID without user session (static-friendly)
 */
export async function getProductByIdStatic(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: true,
        votes: true,
      },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    const voteCount = product.votes.length;
    const app = convertProductToApp(product, voteCount, false);

    return { success: true, data: app };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

export async function getUserProducts(userId: string) {
  try {
    // Obtener sesión solo para información de votación del usuario actual
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    // Obtener productos de un usuario específico
    const products = await prisma.product.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        votes: true, // Solo necesitamos el conteo y userId
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Reutiliza la misma lógica de conversión de getProducts
    const formattedProducts = products.map((product) => {
      // Calcular votos y si el usuario actual ha votado (solo si está autenticado)
      const voteCount = product.votes.length;
      const hasUserVoted = currentUserId
        ? product.votes.some((vote) => vote.userId === currentUserId)
        : false;

      return convertProductToApp(product, voteCount, hasUserVoted);
    });

    return { success: true, data: formattedProducts };
  } catch (error) {
    console.error("Failed to fetch user products:", error);
    return { success: false, error: "Failed to fetch user products" };
  }
}

/**
 * Get user products without current user session (static-friendly)
 */
export async function getUserProductsStatic(userId: string) {
  try {
    // Obtener productos de un usuario específico
    const products = await prisma.product.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        votes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedProducts = products.map((product) => {
      const voteCount = product.votes.length;
      return convertProductToApp(product, voteCount, false);
    });

    return { success: true, data: formattedProducts };
  } catch (error) {
    console.error("Failed to fetch user products:", error);
    return { success: false, error: "Failed to fetch user products" };
  }
}

/**
 * Get random product and maker for hero section
 */
export async function getRandomProductAndMaker() {
  try {
    // Get all products with their users
    const products = await prisma.product.findMany({
      include: {
        user: true,
        votes: true,
      },
    });

    if (products.length === 0) {
      return { success: false, error: "No products found" };
    }

    // Select a random product
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    // Convert to App format
    const voteCount = randomProduct.votes.length;
    const app = convertProductToApp(randomProduct, voteCount, false);

    // Extract the maker from the product
    const maker = app.makers?.[0];

    return {
      success: true,
      data: {
        product: app,
        maker: maker,
      },
    };
  } catch (error) {
    console.error("Error fetching random product and maker:", error);
    return {
      success: false,
      error: "Failed to fetch random product and maker",
    };
  }
}

/**
 * Get total counts for hero section
 */
export async function getHeroCounts() {
  try {
    const [productCount, userCount] = await Promise.all([
      prisma.product.count(),
      prisma.user.count(),
    ]);

    return {
      success: true,
      data: {
        totalProducts: productCount,
        totalMakers: userCount,
      },
    };
  } catch (error) {
    console.error("Error fetching hero counts:", error);
    return { success: false, error: "Failed to fetch counts" };
  }
}
