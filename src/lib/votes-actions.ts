"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

export interface VoteResult {
  success: boolean;
  hasVoted?: boolean;
  voteCount?: number;
  error?: string;
}

/**
 * Toggle vote for a product
 * Returns the new vote state and updated count
 */
export async function toggleVote(productId: string): Promise<VoteResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "No estás autenticado" };
    }

    const userId = session.user.id;

    // Check if user already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    let hasVoted: boolean;

    if (existingVote) {
      // Remove vote
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });
      hasVoted = false;
    } else {
      // Add vote
      await prisma.vote.create({
        data: {
          userId,
          productId,
        },
      });
      hasVoted = true;
    }

    // Get updated vote count
    const voteCount = await prisma.vote.count({
      where: { productId },
    });

    revalidatePath("/products");
    revalidatePath(`/app/${productId}`);

    return {
      success: true,
      hasVoted,
      voteCount,
    };
  } catch (error) {
    console.error("Error toggling vote:", error);
    return { success: false, error: "Error al procesar el voto" };
  }
}

/**
 * Check if current user has voted for a product
 */
export async function hasUserVoted(productId: string): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return false;
    }

    const vote = await prisma.vote.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    });

    return !!vote;
  } catch (error) {
    console.error("Error checking vote status:", error);
    return false;
  }
}

/**
 * Get vote count for a product
 */
export async function getProductVoteCount(productId: string): Promise<number> {
  try {
    return await prisma.vote.count({
      where: { productId },
    });
  } catch (error) {
    console.error("Error getting vote count:", error);
    return 0;
  }
}

/**
 * Get vote data for multiple products
 * Returns object with productId as key and vote data as value
 */
export async function getProductsVoteData(
  productIds: string[]
): Promise<Record<string, { count: number; hasVoted: boolean }>> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Get vote counts for all products
    const voteCounts = await prisma.vote.groupBy({
      by: ["productId"],
      where: {
        productId: { in: productIds },
      },
      _count: {
        productId: true,
      },
    });

    // Get user votes if authenticated
    let userVotes: { productId: string }[] = [];
    if (userId) {
      userVotes = await prisma.vote.findMany({
        where: {
          userId,
          productId: { in: productIds },
        },
        select: { productId: true },
      });
    }

    const userVoteSet = new Set(userVotes.map((v) => v.productId));

    // Build result object
    const result: Record<string, { count: number; hasVoted: boolean }> = {};

    productIds.forEach((productId) => {
      const voteData = voteCounts.find((vc) => vc.productId === productId);
      result[productId] = {
        count: voteData?._count.productId || 0,
        hasVoted: userVoteSet.has(productId),
      };
    });

    return result;
  } catch (error) {
    console.error("Error getting products vote data:", error);
    return {};
  }
}
