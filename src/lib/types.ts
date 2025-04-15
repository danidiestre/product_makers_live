export type BadgeType = 'new' | 'trending' | 'top'

export interface Update {
  date: string
  version: string
  description: string
}

export interface ExternalLinks {
  website?: string
  appStore?: string
  playStore?: string
  github?: string
}

export interface Maker {
  name: string
  role: string
  avatar: string
  bio?: string
  twitter?: string
  github?: string
  website?: string
  makerCategory?: 'Designer' | 'Developer' | 'Marketing' | 'Other'
  isVerified?: boolean
}

export interface Metrics {
  downloads?: number
  activeUsers?: number
  avgRating?: number
}

export interface App {
  id: string
  name: string
  description: string
  imageUrl: string
  coverImage?: string
  screenshots?: string[]
  votes: number
  tags?: string[]
  commentsCount: number
  badges?: BadgeType[]
  technologies?: string[]
  launchDate: string
  updates?: Update[]
  externalLinks?: ExternalLinks
  makers?: Maker[]
  metrics?: Metrics
} 