"use client";

import { useState, useEffect } from "react";
import { App } from "@/lib/types";
import { getUserVoteStatus } from "@/app/products/actions";

interface UseProductsWithVotesProps {
  initialProducts: App[];
}

interface UseProductsWithVotesReturn {
  products: App[];
  isLoadingVotes: boolean;
  error: string | null;
}

/**
 * Hook que combina productos estáticos con información de votación del usuario
 * Permite renderizado estático inicial y luego hidrata con datos de votación
 */
export function useProductsWithVotes({
  initialProducts,
}: UseProductsWithVotesProps): UseProductsWithVotesReturn {
  const [products, setProducts] = useState<App[]>(initialProducts);
  const [isLoadingVotes, setIsLoadingVotes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserVoteStatus = async () => {
      if (initialProducts.length === 0) return;

      setIsLoadingVotes(true);
      setError(null);

      try {
        const productIds = initialProducts.map((product) => product.id);
        const result = await getUserVoteStatus(productIds);

        if (result.success && result.data) {
          // Actualizar productos con información de votación del usuario
          const updatedProducts = initialProducts.map((product) => ({
            ...product,
            initialHasVoted: result.data[product.id] || false,
          }));

          setProducts(updatedProducts);
        } else {
          setError(result.error || "Failed to load vote status");
        }
      } catch (err) {
        console.error("Error loading user vote status:", err);
        setError("Failed to load vote status");
      } finally {
        setIsLoadingVotes(false);
      }
    };

    loadUserVoteStatus();
  }, [initialProducts]);

  return {
    products,
    isLoadingVotes,
    error,
  };
}
