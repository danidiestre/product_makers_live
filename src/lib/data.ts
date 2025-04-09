import { App } from './types'

// Mock data for UI only - will be replaced with real data fetching
export const MOCK_APPS: App[] = [
  {
    id: '1',
    name: 'BrowserAgent',
    description: 'Browser-based AI agents - unlimited runs, fixed cost. BrowserAgent is a revolutionary platform that allows you to create and deploy AI agents directly in your browser. It offers unlimited agent runs for a fixed monthly cost, making it perfect for businesses of all sizes that need reliable AI functionality without unpredictable usage-based pricing.',
    imageUrl: 'https://picsum.photos/200/200?random=1',
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
    makers: [
      { name: 'Jane Doe', role: 'Founder & CEO', avatar: 'https://i.pravatar.cc/150?u=janedoe' },
      { name: 'John Smith', role: 'CTO', avatar: 'https://i.pravatar.cc/150?u=johnsmith' },
    ],
    metrics: {
      downloads: 12500,
      activeUsers: 5300,
      avgRating: 4.8,
    }
  },
  {
    id: '2',
    name: 'Gemini Personalization',
    description: 'Get help made just for you. Gemini Personalization uses advanced AI to learn your preferences, work style, and needs to provide increasingly personalized assistance. It adapts to your unique requirements over time, making it more useful with each interaction.',
    imageUrl: 'https://picsum.photos/200/200?random=2',
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
    makers: [
      { name: 'Alex Chen', role: 'Product Lead', avatar: 'https://i.pravatar.cc/150?u=alexchen' },
      { name: 'Maria Garcia', role: 'Lead Engineer', avatar: 'https://i.pravatar.cc/150?u=mariagarcia' },
    ],
    metrics: {
      activeUsers: 35000,
      avgRating: 4.6,
    }
  },
  {
    id: '3',
    name: 'GrammarPaw',
    description: 'AI writing assistant for Mac. GrammarPaw uses advanced machine learning algorithms to analyze your writing and suggest improvements to grammar, style, and clarity. It integrates seamlessly with all major writing applications on macOS.',
    imageUrl: 'https://picsum.photos/200/200?random=3',
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
      { name: 'David Kim', role: 'Founder', avatar: 'https://i.pravatar.cc/150?u=davidkim' },
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
    imageUrl: 'https://picsum.photos/200/200?random=4',
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
      { name: 'Sarah Johnson', role: 'Co-founder', avatar: 'https://i.pravatar.cc/150?u=sarahjohnson' },
      { name: 'Michael Lee', role: 'Co-founder', avatar: 'https://i.pravatar.cc/150?u=michaellee' },
    ],
    metrics: {
      activeUsers: 2800,
    }
  },
  {
    id: '5',
    name: 'Direct Sponsorships by beehiiv',
    description: 'Selling ads any other way is selling yourself short. Direct Sponsorships provides newsletter creators with a streamlined platform to manage sponsorships, negotiate with advertisers, and maximize revenue from their audience.',
    imageUrl: 'https://picsum.photos/200/200?random=5',
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
      { name: 'Tyler Wilson', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?u=tylerwilson' },
    ],
    metrics: {
      activeUsers: 1200,
    }
  },
]

export const getAppById = (id: string): App | undefined => {
  return MOCK_APPS.find(app => app.id === id)
}

export const getAllApps = (): App[] => {
  return [...MOCK_APPS]
}

export const getTopApps = (limit: number = 5): App[] => {
  return [...MOCK_APPS]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, limit)
} 