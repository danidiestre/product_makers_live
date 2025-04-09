import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Voting utilities
const VOTES_STORAGE_KEY = 'product_makers_votes'

interface VoteStorage {
  date: string;
  votes: { [key: string]: boolean };
}

export function getTodayVotes(): VoteStorage {
  if (typeof window === 'undefined') return { date: getCurrentDate(), votes: {} };
  
  const stored = localStorage.getItem(VOTES_STORAGE_KEY);
  if (!stored) return { date: getCurrentDate(), votes: {} };
  
  const data: VoteStorage = JSON.parse(stored);
  if (data.date !== getCurrentDate()) {
    // Reset votes for new day
    return { date: getCurrentDate(), votes: {} };
  }
  
  return data;
}

export function hasVotedToday(appId: string): boolean {
  const { votes } = getTodayVotes();
  return !!votes[appId];
}

export function toggleVote(appId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const data = getTodayVotes();
  const newVoteState = !data.votes[appId];
  
  data.votes[appId] = newVoteState;
  localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(data));
  
  return newVoteState;
}

function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
} 