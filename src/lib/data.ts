import { App, Maker } from './types'

// Main makers data
const makers: Maker[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Senior Product Designer',
    avatar: '/avatars/john-doe.png',
    bio: 'Passionate about creating beautiful and functional user interfaces.',
    category: 'Designer',
    isVerified: true,
    joinedDate: '2024-01-15',
    followers: 1200,
    twitter: 'johndoe',
    github: 'johndoe',
    website: 'https://johndoe.design'
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Full Stack Developer',
    avatar: '/avatars/jane-smith.png',
    bio: 'Building scalable web applications with modern technologies.',
    category: 'Developer',
    isVerified: true,
    joinedDate: '2024-02-01',
    followers: 850,
    twitter: 'janesmith',
    github: 'janesmith'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Growth Marketing Manager',
    avatar: '/avatars/mike-johnson.png',
    bio: 'Helping products reach their target audience effectively.',
    category: 'Marketing',
    isVerified: false,
    joinedDate: '2024-03-10',
    followers: 650,
    twitter: 'mikejohnson'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    role: 'UI/UX Designer',
    avatar: '/avatars/sarah-williams.png',
    bio: 'Creating delightful user experiences through thoughtful design.',
    category: 'Designer',
    isVerified: true,
    joinedDate: '2024-02-15',
    followers: 920,
    twitter: 'sarahw',
    website: 'https://sarahwilliams.design'
  },
  {
    id: '5',
    name: 'David Chen',
    role: 'Product Manager',
    avatar: '/avatars/david-chen.png',
    bio: 'Bridging the gap between business needs and user experience.',
    category: 'Other',
    isVerified: true,
    joinedDate: '2024-01-20',
    followers: 1500,
    twitter: 'davidchen'
  }
]

// Additional mock makers for the makers page
export const ADDITIONAL_MAKERS: Maker[] = [
  {
    id: 'maker1',
    name: 'Emma Watson',
    role: 'UX Designer',
    avatar: 'https://i.pravatar.cc/150?u=emmawatson',
    bio: 'Creating user-centered digital experiences with passion and precision.',
    category: 'Designer',
    isVerified: true,
    joinedDate: '2024-01-01',
    followers: 1500
  },
  {
    id: 'maker2',
    name: 'Ryan Johnson',
    role: 'Full Stack Developer',
    avatar: 'https://i.pravatar.cc/150?u=ryanjohnson',
    bio: 'Building scalable web applications with modern technologies.',
    category: 'Developer',
    isVerified: false,
    joinedDate: '2024-01-15',
    followers: 800
  },
  {
    id: 'maker3',
    name: 'Sophia Martinez',
    role: 'Growth Marketer',
    avatar: 'https://i.pravatar.cc/150?u=sophiamartinez',
    bio: 'Driving user acquisition and retention through data-driven strategies.',
    category: 'Marketing',
    isVerified: true,
    joinedDate: '2024-02-01',
    followers: 1200
  }
]

// Mock data for UI only - will be replaced with real data fetching
export const MOCK_APPS: App[] = [
  {
    id: '1',
    name: 'BrowserAgent',
    description: 'Browser-based AI agents - unlimited runs, fixed cost.',
    imageUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/chrome/chrome.png',
    coverImage: 'https://picsum.photos/1920/400?random=1',
    screenshots: [
      'https://picsum.photos/800/450?random=11',
      'https://picsum.photos/800/450?random=12',
      'https://picsum.photos/800/450?random=13',
    ],
    votes: 345,
    tags: ['SaaS', 'No-Code', 'Marketing automation'],
    commentsCount: 24,
    badges: ['trending'],
    technologies: ['React', 'Node.js', 'WebAssembly', 'TensorFlow.js'],
    launchDate: '2023-10-15',
    updates: [
      { date: '2023-12-01', version: '1.1.0', description: 'Added support for custom agent workflows' },
      { date: '2024-02-15', version: '1.2.0', description: 'Introduced template marketplace' },
    ],
    externalLinks: {
      website: 'https://browseragent.example.com',
      appStore: 'https://apps.apple.com/example',
      playStore: 'https://play.google.com/store/example',
      github: 'https://github.com/example/browseragent',
    },
    makers: [makers[1], makers[2]], // Reference existing makers
    metrics: {
      downloads: 12500,
      activeUsers: 5300,
      avgRating: 4.8,
    }
  },
  {
    id: '2',
    name: 'Gemini Personalization',
    description: 'Get help made just for you.',
    imageUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/google/google.png',
    coverImage: 'https://picsum.photos/1920/400?random=2',
    screenshots: [
      'https://picsum.photos/800/450?random=21',
      'https://picsum.photos/800/450?random=22',
      'https://picsum.photos/800/450?random=23',
    ],
    votes: 243,
    tags: ['Artificial Intelligence', 'Search'],
    commentsCount: 3,
    badges: ['new'],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'Google Cloud'],
    launchDate: '2024-01-20',
    updates: [
      { date: '2024-02-28', version: '1.0.1', description: 'Improved response accuracy and reduced latency' },
    ],
    externalLinks: {
      website: 'https://gemini-personalization.example.com',
    },
    makers: [makers[3], makers[4]], // Reference existing makers
    metrics: {
      activeUsers: 35000,
      avgRating: 4.6,
    }
  },
  {
    id: '3',
    name: 'GrammarPaw',
    description: 'AI writing assistant for Mac. GrammarPaw uses advanced machine learning algorithms to analyze your writing and suggest improvements to grammar, style, and clarity. It integrates seamlessly with all major writing applications on macOS.',
    imageUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/markdown/markdown.png',
    coverImage: 'https://picsum.photos/1920/400?random=3',
    screenshots: [
      'https://picsum.photos/800/450?random=31',
      'https://picsum.photos/800/450?random=32',
    ],
    votes: 200,
    tags: ['Productivity', 'User Experience', 'Tech'],
    commentsCount: 9,
    badges: ['top'],
    technologies: ['Swift', 'Core ML', 'Natural Language Processing'],
    launchDate: '2023-09-05',
    updates: [
      { date: '2023-11-10', version: '1.1.0', description: 'Added support for additional languages' },
      { date: '2024-01-20', version: '1.2.0', description: 'Improved performance and reduced memory usage' },
    ],
    externalLinks: {
      website: 'https://grammarpaw.example.com',
      appStore: 'https://apps.apple.com/example-grammarpaw',
    },
    makers: [
      { name: 'David Kim', role: 'Founder', avatar: 'https://i.pravatar.cc/150?u=davidkim', makerCategory: 'Developer', isVerified: true },
    ],
    metrics: {
      downloads: 8700,
      avgRating: 4.7,
    }
  },
  {
    id: '4',
    name: 'Interlify',
    description: 'Connect your APIs to LLMs in minutes. Interlify provides a no-code platform to integrate your existing APIs with large language models, enabling advanced AI capabilities with minimal development effort.',
    imageUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/json/json.png',
    coverImage: 'https://picsum.photos/1920/400?random=4',
    screenshots: [
      'https://picsum.photos/800/450?random=41',
      'https://picsum.photos/800/450?random=42',
      'https://picsum.photos/800/450?random=43',
    ],
    votes: 193,
    tags: ['SaaS', 'Developer Tools', 'Artificial Intelligence'],
    commentsCount: 17,
    technologies: ['JavaScript', 'Python', 'Docker', 'Kubernetes'],
    launchDate: '2023-11-01',
    updates: [
      { date: '2024-01-15', version: '1.1.0', description: 'Added support for advanced authentication methods' },
    ],
    externalLinks: {
      website: 'https://interlify.example.com',
      github: 'https://github.com/example/interlify',
    },
    makers: [
      { name: 'Sarah Johnson', role: 'Co-founder', avatar: 'https://i.pravatar.cc/150?u=sarahjohnson', makerCategory: 'Marketing', isVerified: true },
      { name: 'Michael Lee', role: 'Co-founder', avatar: 'https://i.pravatar.cc/150?u=michaellee', makerCategory: 'Developer', isVerified: false },
    ],
    metrics: {
      activeUsers: 2800,
    }
  },
  {
    id: '5',
    name: 'Direct Sponsorships by beehiiv',
    description: 'Selling ads any other way is selling yourself short. Direct Sponsorships provides newsletter creators with a streamlined platform to manage sponsorships, negotiate with advertisers, and maximize revenue from their audience.',
    imageUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/telegram/telegram.png',
    coverImage: 'https://picsum.photos/1920/400?random=5',
    screenshots: [
      'https://picsum.photos/800/450?random=51',
      'https://picsum.photos/800/450?random=52',
    ],
    votes: 177,
    tags: ['Newsletters', 'Growth Hacking', 'Advertising'],
    commentsCount: 5,
    badges: ['new'],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    launchDate: '2024-02-01',
    externalLinks: {
      website: 'https://directsponsorships.example.com',
    },
    makers: [
      { name: 'Tyler Wilson', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?u=tylerwilson', makerCategory: 'Marketing', isVerified: false },
    ],
    metrics: {
      activeUsers: 1200,
    }
  },
]

// Helper functions
export function getAllMakers(): Maker[] {
  return [...makers, ...ADDITIONAL_MAKERS]
}

export function getMakersByCategory(category: string): Maker[] {
  const allMakers = getAllMakers()
  if (category === 'All') return allMakers
  return allMakers.filter(maker => maker.category === category)
}

export function getAppById(id: string): App | undefined {
  return MOCK_APPS.find(app => app.id === id)
}

export function getAllApps(): App[] {
  return [...MOCK_APPS]
}

export function getTopApps(limit: number = 5): App[] {
  return [...MOCK_APPS]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, limit)
} 