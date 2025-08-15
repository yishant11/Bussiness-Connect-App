# BizConnect - Professional Business Networking Platform

A modern business networking platform that connects professionals and facilitates business relationships, built with Next.js 14, React 19, and Tailwind CSS.

## Features

- 🏢 Professional profile creation with business details
- 🔍 Smart business matching algorithm
- 💬 Real-time messaging system
- 📊 Business analytics and insights
- 🤝 Professional networking tools
- 📱 Responsive design for all devices

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui components
- **Icons:** Lucide React
- **Forms:** React Hook Form with Zod validation
- **Charts:** Recharts
- **Animations:** Tailwind CSS Animate

## Prerequisites

Before running this project, make sure you have:

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm** package manager

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <https://github.com/yishant11/Bussiness-Connect-App.git>
   cd bizconnect
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm (recommended)
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── chat/              # Chat functionality
│   ├── discover/          # Business discovery
│   ├── login/             # Authentication
│   ├── matches/           # Business matches
│   ├── profile/           # User profiles
│   └── signup/            # User registration
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
\`\`\`

## Key Dependencies

### Core Framework
- `next@14.2.25` - React framework
- `react@19` - UI library
- `typescript@5` - Type safety

### UI Components
- `@radix-ui/*` - Headless UI components
- `lucide-react` - Icon library
- `tailwindcss@4.1.9` - Utility-first CSS

### Forms & Validation
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@hookform/resolvers` - Form validation integration

### Additional Features
- `recharts` - Charts and analytics
- `date-fns` - Date manipulation
- `sonner` - Toast notifications
- `next-themes` - Theme switching

## Development

### Adding New Components

This project uses shadcn/ui components. To add new components:

\`\`\`bash
npx shadcn@latest add [component-name]
\`\`\`

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the existing color scheme (blue/professional theme)
- Maintain responsive design patterns
- Use shadcn/ui components for consistency

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

1. Build the project:
   \`\`\`bash
   npm run build
   \`\`\`

2. Start the production server:
   \`\`\`bash
   npm run start
   \`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
