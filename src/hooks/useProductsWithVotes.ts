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
  const [hasLoadedVotes, setHasLoadedVotes] = useState(false);

  // Update products when initialProducts change
  useEffect(() => {
    setProducts(initialProducts);
    setHasLoadedVotes(false);
  }, [initialProducts]);

  useEffect(() => {
    const loadUserVoteStatus = async () => {
      if (initialProducts.length === 0 || hasLoadedVotes) {
        return;
      }

      setIsLoadingVotes(true);
      setError(null);

      try {
        const productIds = initialProducts.map((product) => product.id);
        const result = await getUserVoteStatus(productIds);

        if (result.success && result.data) {
          // Actualizar productos con información de votación del usuario
          // Solo actualizar si realmente hay cambios
          const updatedProducts = initialProducts.map((product) => {
            const newHasVoted = result.data[product.id] || false;
            // Solo actualizar si el estado de votación es diferente
            if (product.initialHasVoted !== newHasVoted) {
              return {
                ...product,
                initialHasVoted: newHasVoted,
              };
            }
            return product;
          });

          setProducts(updatedProducts);
          setHasLoadedVotes(true);
        } else {
          setError(result.error || "Failed to load vote status");
          // Even if vote loading fails, still set the products without vote info
          setProducts(initialProducts);
        }
      } catch (err) {
        console.error("Error loading user vote status:", err);
        setError("Failed to load vote status");
        // Even if vote loading fails, still set the products without vote info
        setProducts(initialProducts);
      } finally {
        setIsLoadingVotes(false);
      }
    };

    // Only load votes on the client side
    if (typeof window !== "undefined") {
      loadUserVoteStatus();
    }
  }, [initialProducts, hasLoadedVotes]);

  return {
    products,
    isLoadingVotes,
    error,
  };
}
