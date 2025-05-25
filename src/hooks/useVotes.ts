"use client";

import { useState, useTransition, useEffect } from "react";
import {
  toggleVote as toggleVoteAction,
  VoteResult,
} from "@/lib/votes-actions";

export interface UseVotesProps {
  productId: string;
  initialVotes: number;
  initialHasVoted: boolean;
}

export interface UseVotesReturn {
  votes: number;
  hasVoted: boolean;
  isLoading: boolean;
  toggleVote: () => Promise<void>;
  error: string | null;
}

export function useVotes({
  productId,
  initialVotes,
  initialHasVoted,
}: UseVotesProps): UseVotesReturn {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Update state when props change (important for when useProductsWithVotes updates the data)
  useEffect(() => {
    setVotes(initialVotes);
    setHasVoted(initialHasVoted);
  }, [initialVotes, initialHasVoted]);

  const toggleVote = async () => {
    // Optimistic update
    const newHasVoted = !hasVoted;
    const newVotes = newHasVoted ? votes + 1 : votes - 1;

    setHasVoted(newHasVoted);
    setVotes(newVotes);
    setError(null);

    startTransition(async () => {
      try {
        const result: VoteResult = await toggleVoteAction(productId);

        if (
          result.success &&
          typeof result.hasVoted === "boolean" &&
          typeof result.voteCount === "number"
        ) {
          // Update with server response
          setHasVoted(result.hasVoted);
          setVotes(result.voteCount);
        } else {
          // Revert optimistic update on error
          setHasVoted(!newHasVoted);
          setVotes(votes);
          setError(result.error || "Error al procesar el voto");
        }
      } catch (err) {
        // Revert optimistic update on error
        setHasVoted(!newHasVoted);
        setVotes(votes);
        setError("Error de conexión");
        console.error("Vote error:", err);
      }
    });
  };

  return {
    votes,
    hasVoted,
    isLoading: isPending,
    toggleVote,
    error,
  };
}
