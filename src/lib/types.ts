export type BadgeType = "new" | "trending" | "top";

export interface Update {
  date: string;
  version: string;
  description: string;
}

export interface ExternalLinks {
  website?: string;
  appStore?: string;
  playStore?: string;
  github?: string;
}

export type Maker = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  isVerified: boolean;
  category:
    | "Designer"
    | "Developer"
    | "Marketing"
    | "Founder"
    | "Other"
    | "Product Manager";
  joinedDate: string;
  followers: number;
  twitter?: string;
  github?: string;
  website?: string;
  linkedin?: string;
  dribbble?: string;
  makerCategory?:
    | "Designer"
    | "Developer"
    | "Marketing"
    | "Founder"
    | "Other"
    | "Product Manager";
};

export interface Metrics {
  downloads?: number;
  activeUsers?: number;
  avgRating?: number;
}

export interface App {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  coverImage?: string;
  screenshots?: string[];
  votes: number;
  tags?: string[];
  commentsCount: number;
  badges?: BadgeType[];
  technologies?: string[];
  launchDate: string;
  updates?: Update[];
  externalLinks?: ExternalLinks;
  makers?: Maker[];
  metrics?: Metrics;
  initialHasVoted?: boolean;
}

export type MakerCategory =
  | "Designer"
  | "Developer"
  | "Marketing"
  | "Founder"
  | "Other"
  | "Product Manager";
