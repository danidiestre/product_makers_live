export type BadgeType = "new" | "trending" | "top";

export type ViewType = 'grid' | 'list';

export type SortKey = 'votes' | 'launchDate';

export type PlatformFilter = 'all' | 'web' | 'ios' | 'android' | 'others'

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
};

export interface Metrics {
  downloads?: number;
  activeUsers?: number;
  avgRating?: number;
}

export type ProductType = "WEB" | "IOS" | "ANDROID" | "OTHERS";

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
  problem?: string;
  solution?: string;
  features?: string;
  monetization?: string;
  roadmap?: string;
  technology?: string;
  productType?: ProductType;
  initialHasVoted?: boolean;
}
