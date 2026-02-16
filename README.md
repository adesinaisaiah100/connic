# Connic AI 🚀✨

An intelligent AI-powered social media content generator that creates platform-optimized marketing copy for Twitter/X, LinkedIn, Instagram, and TikTok.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)

## 🌟 Features

### 🎯 Multi-Platform Support
- **Twitter/X**: Generate engaging tweets (280 characters)
- **LinkedIn**: Create professional posts (3,000 characters)
- **Instagram**: Craft visual captions (2,200 characters)
- **TikTok**: Write compelling video scripts (2,200 characters)

### 🎨 Customization Options
- **Target Audience Selection**: General Public, University Students, Busy Parents, Corporate Professionals, Small Business Owners, Tech Enthusiasts
- **Tone of Voice**: Professional & Trustworthy, Casual & Friendly, Witty & Humorous, Urgent (FOMO), Empathetic & Understanding
- **Advanced Controls**:
  - Trend Injection toggle
  - Emoji usage toggle
  - Real-time character counting with visual feedback

### 🔥 Smart Features
- **Live Preview**: Platform-specific preview components for each social media
- **Content Refinement**: Instantly shorten, expand, or completely rewrite generated content
- **Generation History**: Track your last 10 generations with timestamp and settings
- **Export Options**: Copy to clipboard or download as text file
- **Word Count & Reading Time**: Automatic content analytics

### 🎭 Modern UI/UX
- Beautiful glassmorphism design with backdrop blur effects
- Smooth animations powered by Framer Motion
- Dark mode optimized interface
- Responsive layout for all screen sizes
- Custom scrollbar styling

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) with Google AI
- **Backend**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adesinaisaiah100/connic.git
   cd connic
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Google AI API Key
   GOOGLE_AI_API_KEY=your_google_ai_api_key

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)
   live website at [https://connicai.vercel.app](https://connicai.vercel.app)

## 📁 Project Structure

```
connic/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard page
├── components/            # React components
│   ├── previews/          # Platform-specific preview components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
├── middleware.ts          # Next.js middleware
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎮 Usage

1. **Enter Your Promotion**: Describe what you're promoting in the text area
2. **Select Target Audience**: Choose your audience demographic
3. **Choose Platform**: Select the social media platform
4. **Set Tone of Voice**: Pick the appropriate tone for your message
5. **Toggle Options**: Enable/disable trend injection and emojis
6. **Generate**: Click "Generate Copy" to create AI-powered content
7. **Refine**: Use the Shorten, Expand, or Rewrite buttons to refine the output
8. **Export**: Copy to clipboard or download the generated content

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## 🎨 Key Components

- **TwitterPreview**: Twitter/X post preview with profile avatar and formatting
- **LinkedInPreview**: LinkedIn post preview with professional styling
- **InstagramPreview**: Instagram caption preview with hashtag support
- **TikTokPreview**: TikTok script preview with engagement markers

## 🌐 API Routes

- `/api/generate`: Main AI generation endpoint that processes user inputs and returns optimized content

## 📦 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/adesinaisaiah100/connic)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy!

### Deploy to Other Platforms

The application can be deployed to any platform that supports Next.js applications (Netlify, Railway, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Isaiah Adesina**
- GitHub: [@adesinaisaiah100](https://github.com/adesinaisaiah100)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [Vercel AI SDK](https://sdk.vercel.ai/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

⭐️ If you find this project useful, please consider giving it a star on GitHub!
