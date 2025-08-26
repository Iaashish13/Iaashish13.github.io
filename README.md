# Aashish Regmi - Portfolio & Blog

A modern, responsive portfolio website built with Next.js 14+, TypeScript, and Tailwind CSS. Features a blog-first design with technical content management and easy customization.

![Portfolio Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Portfolio+Preview)

## ✨ Features

- **📝 Blog-First Design**: Technical blog with portfolio sections
- **🎨 Modern UI**: Clean, minimalist design with light/dark themes
- **📱 Responsive**: Mobile-first design that works on all devices
- **🔍 SEO Optimized**: Built-in SEO with meta tags, sitemap, and structured data
- **⚡ Fast Performance**: Static generation with optimized loading
- **🛠️ Easy Customization**: All content configurable via simple files
- **📊 Admin Interface**: Local development admin for blog management
- **🎯 Category System**: Organized blog categories and sub-categories

## 🚀 Quick Start (Forking Guide)

### 1. Fork & Clone

```bash
# Fork this repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/Iaashish13.github.io.git
cd Iaashish13.github.io
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Customize Your Information

Update the configuration files with your information:

#### Personal Information (`src/config/personal.ts`)

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://x.com/yourhandle",
  about: "Your personal description...",
  photo: "/images/profile.jpg", // Add your photo to public/images/
};
```

#### Work Experience (`src/config/experience.ts`)

```typescript
export const workExperience = [
  {
    title: "Your Job Title",
    company: "Company Name",
    period: "2023 - 2024",
    description: "Your job description...",
    technologies: ["Tech1", "Tech2", "Tech3"],
  },
  // Add more experiences...
];
```

#### Skills (`src/config/skills.ts`)

```typescript
export const skills = {
  core: ["Your", "Core", "Skills"],
  seniorSkills: ["Advanced", "Skills", "Here"],
  additional: ["Other", "Skills"],
};
```

### 4. Add Your Profile Photo

```bash
# Replace the placeholder image
cp your-photo.jpg public/images/profile.jpg
```

### 5. Customize Blog Categories

Edit `src/config/categories.ts` to match your expertise:

```typescript
export const categories = {
  frontend: {
    label: "Frontend",
    subCategories: ["React", "Vue", "Angular", "Next.js"],
  },
  backend: {
    label: "Backend",
    subCategories: ["Node.js", "Python", "Java", "Go"],
  },
  other: {
    label: "Other",
    subCategories: ["DevOps", "Architecture", "General Tech"],
  },
};
```

### 6. Add Your Blog Posts

Create new blog posts in `src/content/blogs/`:

```bash
# Example structure
src/content/blogs/
├── frontend/
│   ├── my-react-post.md
│   └── nextjs-tutorial.md
├── backend/
│   └── nodejs-api.md
└── other/
    └── clean-architecture.md
```

### 7. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

### 8. Deploy to GitHub Pages

```bash
# Build the project
npm run build

# Deploy (see deployment section below)
```

## 📁 Project Structure

```
portfolio-blog/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin interface (dev only)
│   │   ├── blog/              # Blog routes
│   │   ├── about/             # About page
│   │   ├── experience/        # Work experience
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # Basic UI components
│   │   ├── layout/           # Layout components
│   │   └── blog/             # Blog-specific components
│   ├── content/               # Blog content (MDX)
│   │   └── blogs/            # Your blog posts
│   ├── config/               # Configuration files
│   │   ├── personal.ts       # Personal info
│   │   ├── categories.ts     # Category system
│   │   ├── experience.ts     # Work experience
│   │   └── skills.ts         # Skills data
│   ├── lib/                  # Utilities
│   │   ├── mdx.ts           # MDX utilities
│   │   ├── admin.ts         # Admin utilities
│   │   └── utils.ts         # General utilities
│   └── types/                # TypeScript types
├── public/                   # Static assets
│   └── images/
├── README.md                 # This file
└── package.json
```

## 📝 Blog Writing Guide

### Creating New Blog Posts

1. **Using Admin Interface** (Recommended):

   ```bash
   npm run dev
   # Visit http://localhost:3000/admin/new
   ```

2. **Manual Creation**:
   Create a new `.md` file in `src/content/blogs/[category]/[slug].md`:

   ````markdown
   ---
   title: "Your Blog Title"
   date: "2024-01-15"
   category: "frontend"
   subCategory: "react"
   tags: ["react", "javascript", "web"]
   readingTime: "5 min read"
   description: "Brief description of your blog post"
   ---

   # Your Blog Content

   Write your content in Markdown/MDX format.

   ## Code Example

   ```javascript
   function hello() {
     console.log("Hello, World!");
   }
   ```
   ````

   ## Conclusion

   Your conclusion here...

   ```

   ```

### Blog Frontmatter

| Field         | Type   | Description            | Example                        |
| ------------- | ------ | ---------------------- | ------------------------------ |
| `title`       | string | Blog post title        | `"Getting Started with React"` |
| `date`        | string | Publication date       | `"2024-01-15"`                 |
| `category`    | string | Main category          | `"frontend"`                   |
| `subCategory` | string | Sub-category           | `"react"`                      |
| `tags`        | array  | Searchable tags        | `["react", "javascript"]`      |
| `readingTime` | string | Estimated reading time | `"5 min read"`                 |
| `description` | string | Brief description      | `"Learn React basics..."`      |

### Supported Categories

- **Frontend**: React, Vue, Angular, Next.js, etc.
- **Backend**: Node.js, Python, Java, Go, etc.
- **Other**: DevOps, Architecture, General Tech, etc.

## 🛠️ Admin Interface

The admin interface is available at `/admin` during development:

- **Dashboard**: View blog statistics
- **Blog Management**: Edit, delete, and preview posts
- **New Post Creation**: Create new blog posts with live preview
- **Category Management**: Organize posts by categories

### Admin Features

- ✅ **Create New Posts**: Full form with live preview
- ✅ **Edit Existing Posts**: Modify metadata and content
- ✅ **Delete Posts**: With confirmation popup
- ✅ **Preview Posts**: See how posts will look
- ✅ **Category Assignment**: Easy category selection

## 🎨 Customization

### Colors & Theme

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add your custom colors...
    },
  },
},
```

### Styling

- **Global Styles**: `src/app/globals.css`
- **Component Styles**: Tailwind classes in components
- **Theme Variables**: CSS custom properties for theming

### Layout

- **Header**: `src/components/layout/header.tsx`
- **Footer**: `src/components/layout/footer.tsx`
- **Navigation**: Customize navigation links

## 🚀 Deployment

### GitHub Pages Deployment

1. **Configure Repository**:

   - Go to your repository settings
   - Enable GitHub Pages
   - Set source to "GitHub Actions"

2. **Create GitHub Action**:
   Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

3. **Update next.config.js**:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: "export",
     trailingSlash: true,
     images: {
       unoptimized: true,
     },
   };

   module.exports = nextConfig;
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

### Other Deployment Options

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `out` folder
- **AWS S3**: Upload static files to S3 bucket

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Export static files
npm run export

# Lint code
npm run lint

# Type check
npm run type-check
```

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [MDX](https://mdxjs.com/) - Markdown with JSX
- [Lucide React](https://lucide.dev/) - Icons
- [Framer Motion](https://www.framer.com/motion/) - Animations

## 📞 Support

If you have any questions or need help:

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/Iaashish13.github.io/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/Iaashish13.github.io/discussions)

---

**Made with ❤️ by [Your Name]**

_This template is designed to be easily forkable and customizable. Feel free to modify it to match your personal brand and style!_
