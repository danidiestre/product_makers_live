import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNextTuesdayAt18CEST(): number {
  const now = new Date();
  const day = now.getUTCDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  // const hour = now.getUTCHours();

  // Offset from CEST (UTC+2 during daylight saving)
  const targetHourUTC = 16; // 18:00 CEST = 16:00 UTC

  let daysUntilTuesday = (2 - day + 7) % 7; // Days until next Tuesday
  const isTuesday = day === 2;

  // If it's Tuesday but past 18:00 CEST, go to next week
  if (isTuesday && now.getUTCHours() >= targetHourUTC) {
    daysUntilTuesday = 7;
  } else if (isTuesday && now.getUTCHours() < targetHourUTC) {
    daysUntilTuesday = 0;
  }

  const nextTuesday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + daysUntilTuesday,
    targetHourUTC,
    0,
    0
  ));

  const diffInSeconds = Math.floor((nextTuesday.getTime() - now.getTime()) / 1000);
  return diffInSeconds;
}

export function getSecondsUntilEndOfWeekCEST(): number {
  const now = new Date();

  // Midnight (00:00) CEST on Monday = 22:00 UTC on Sunday
  const targetHourUTC = 22; // Sunday 24:00 CEST = Sunday 22:00 UTC

  const day = now.getUTCDay(); // Sunday = 0, ..., Saturday = 6

  // Days until next Sunday
  const daysUntilSunday = (7 - day) % 7;

  // Create a Date object for next Sunday at 22:00 UTC
  const nextSundayMidnight = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + daysUntilSunday,
    targetHourUTC,
    0,
    0
  ));

  const diffInSeconds = Math.floor((nextSundayMidnight.getTime() - now.getTime()) / 1000);
  return diffInSeconds;
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

/**
 * Formats a number of bytes into a human-readable string
 * @param bytes - The file size in bytes
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns Formatted string with appropriate unit (B, KB, MB, GB, etc.)
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}