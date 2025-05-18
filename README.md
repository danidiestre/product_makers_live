# Product Makers - Next.js Website

A modern, responsive website for Product Makers built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- Modern, responsive design using Tailwind CSS
- Component-based architecture with React and TypeScript
- Server-side rendering with Next.js App Router
- UI components from shadcn/ui

## Pages

- **Home**: Landing page with hero, features, testimonials, and pricing sections
- **About**: Company information, mission, values, and team
- **Features**: Detailed information about the platform's features
- **Contact**: Contact form and information

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/product-makers.git
cd product-makers
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
product-makers/
├── public/           # Static assets
├── src/
│   ├── app/          # App router pages
│   ├── components/   # React components
│   │   ├── ui/       # shadcn/ui components
│   ├── lib/          # Utility functions
│   └── styles/       # Global styles
├── tailwind.config.js # Tailwind configuration
└── package.json      # Project dependencies
```

## Building for Production

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide Icons](https://lucide.dev/) - SVG icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment & Notifications

### GitHub Notifications
Cada vez que alguien hace push a la rama `main`, se enviará una notificación al canal de Discord `#deploys-site` con información sobre el commit.

### Deploy Hooks
Para iniciar un deploy manualmente, puedes hacer una petición POST a:
```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_M9hHlo0DXn7JdodKhAZoWrUy9B94/yFjoq75xI3
```

También puedes visitar la URL en el navegador para iniciar un deploy. 