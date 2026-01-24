# Next.js Portfolio Blog - Implementation Plan

## Project Overview

Migrating from Flutter to Next.js 14+ to create a **blog-first portfolio** that's easily forkable and customizable. The focus is on technical blogging with portfolio sections, featuring a minimalist design and comprehensive category system.

## Key Features

### Core Features

- **Blog-First Design**: Tech blog with portfolio sections
- **Category System**: Frontend/Backend/Other with sub-categories
- **Minimalist UI**: Clean, responsive design with light/dark themes
- **Easy Customization**: All content configurable via simple files
- **File-Based Content**: Simple Markdown workflow for writing blogs
- **Responsive Design**: Mobile-first with tablet and desktop optimizations

### Blog System

- MDX support with syntax highlighting
- Category and sub-category filtering
- Search functionality
- Reading time estimation
- Social sharing buttons
- Related posts suggestions

### Portfolio Sections

- About page with personal information
- Work experience timeline (2021-2024)
- Skills showcase (Flutter, Firebase, Django, Supabase, React)
- Senior Flutter developer skills

## Technology Stack

### Core Technologies

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Content**: MDX with `next-mdx-remote`
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: `next-themes`
- **Deployment**: GitHub Pages

### Key Dependencies

```json
{
  "next-mdx-remote": "^4.4.1",
  "gray-matter": "^4.0.3",
  "date-fns": "^2.30.0",
  "framer-motion": "^10.16.4",
  "lucide-react": "^0.263.1",
  "next-themes": "^0.2.1",
  "@tailwindcss/typography": "^0.5.10"
}
```

## Project Structure

```
portfolio-blog/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── blog/              # Blog routes
│   │   │   ├── [slug]/        # Individual blog posts
│   │   │   └── page.tsx       # Blog listing
│   │   ├── about/             # About page
│   │   │   └── page.tsx
│   │   ├── experience/        # Work experience
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── ui/               # Basic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── blog/             # Blog-specific components
│   │       ├── BlogCard.tsx
│   │       ├── BlogList.tsx
│   │       └── BlogContent.tsx
│   ├── content/               # Blog content (MDX)
│   │   ├── blogs/            # Your migrated blogs
│   │   │   ├── flutter/
│   │   │   ├── react/
│   │   │   └── general/
│   │   └── drafts/           # Draft blogs (dev only)
│   ├── config/               # Configuration files
│   │   ├── personal.ts       # Personal info
│   │   ├── categories.ts     # Category system
│   │   ├── experience.ts     # Work experience
│   │   └── skills.ts         # Skills data
│   ├── lib/                  # Utilities
│   │   ├── mdx.ts           # MDX utilities
│   │   ├── utils.ts         # General utilities
│   │   └── constants.ts     # Constants
│   └── types/                # TypeScript types
│       ├── blog.ts
│       ├── personal.ts
│       └── config.ts
├── public/                   # Static assets
│   ├── images/
│   │   └── profile.jpg      # Profile photo
│   └── icons/
├── README.md                 # Comprehensive documentation
├── .env.example             # Environment variables template
└── package.json
```

## Category System

### Structure

```typescript
// config/categories.ts
export const categories = {
  frontend: {
    label: "Frontend",
    subCategories: ["Flutter", "Mobile", "Web", "React", "Next.js"],
  },
  backend: {
    label: "Backend",
    subCategories: ["Django", "Node.js", "Python", "Database"],
  },
  other: {
    label: "Other",
    subCategories: ["Architecture", "DevOps", "General Tech"],
  },
};
```

### UI Display

- **Hidden**: Main categories (Frontend, Backend, Other)
- **Visible**: Only sub-categories (Flutter, Mobile, Web, etc.)
- **Filtering**: Clicking sub-category shows only those posts
- **Default**: New posts default to "General Tech"

### Blog Migration Mapping

| Original File                  | New Category | Sub-Category |
| ------------------------------ | ------------ | ------------ |
| `test.md`                      | Other        | General Tech |
| `work_manager_flutter.md`      | Frontend     | Flutter      |
| `widgets_stateless_widget.md`  | Frontend     | Flutter      |
| `build_method_state.md`        | Frontend     | Flutter      |
| `stateful_widget_deep_dive.md` | Frontend     | Flutter      |
| `prevent_screen_capture.md`    | Frontend     | Flutter      |

## Configuration System

### Personal Information

```typescript
// config/personal.ts
export const personalInfo = {
  name: "Aashish Regmi",
  title: "Senior Flutter Developer",
  email: "your.email@example.com",
  github: "https://github.com/Iaashish13",
  linkedin: "https://linkedin.com/in/aashish-regmi",
  twitter: "https://x.com/whois_aashish_",
  about: "Namaste!! I am Aashish Regmi...",
  photo: "/images/profile.jpg", // Placeholder for now
};
```

### Work Experience

```typescript
// config/experience.ts
export const workExperience = [
  {
    title: "Senior Flutter Developer",
    company: "Tech Company",
    period: "2023 - 2024",
    description:
      "Led Flutter development team, implemented state management solutions...",
    technologies: ["Flutter", "Firebase", "Bloc"],
  },
  {
    title: "Flutter Developer",
    company: "Startup",
    period: "2022 - 2023",
    description: "Developed cross-platform mobile applications...",
    technologies: ["Flutter", "Dart", "Provider"],
  },
  {
    title: "Junior Flutter Developer",
    company: "Agency",
    period: "2021 - 2022",
    description: "Started Flutter development journey...",
    technologies: ["Flutter", "Dart", "Git"],
  },
];
```

### Skills

```typescript
// config/skills.ts
export const skills = {
  core: ["Flutter", "Firebase", "Django", "Supabase", "React"],
  seniorFlutter: [
    "State Management (Bloc, Provider, Riverpod)",
    "Architecture Patterns (MVVM, Clean Architecture)",
    "Testing (Unit, Widget, Integration)",
    "Performance Optimization",
    "CI/CD for Flutter",
    "Custom Widgets",
    "Platform Channels",
    "Firebase Integration",
  ],
  additional: [
    "Git & Version Control",
    "REST APIs",
    "Database Design",
    "UI/UX Design",
    "Agile/Scrum",
    "Code Review",
    "Technical Documentation",
  ],
};
```

## Implementation Timeline

### Week 1: Foundation & Setup

**Days 1-2: Project Setup**

- Create Next.js project with TypeScript
- Install and configure dependencies
- Set up Tailwind CSS with typography plugin
- Configure ESLint and Prettier
- Set up project structure

**Days 3-4: Theme System**

- Implement light/dark theme with `next-themes`
- Create CSS variables for theming
- Add theme toggle component
- Ensure smooth theme transitions

**Days 5-7: Basic Layout**

- Create responsive header component
- Implement mobile navigation (hamburger menu)
- Build footer component
- Set up root layout with theme provider

### Week 2: Core Pages & Navigation

**Days 1-3: Homepage**

- Create hero section with personal info
- Build recent blog posts grid
- Add skills showcase section
- Implement responsive design

**Days 4-5: Blog System Foundation**

- Set up blog listing page
- Create individual blog post pages
- Implement basic MDX rendering
- Add blog card components

**Days 6-7: Navigation & Routing**

- Complete navigation system
- Add active page indicators
- Implement mobile menu functionality
- Set up proper routing structure

### Week 3: Blog System & Features

**Days 1-3: Advanced Blog Features**

- Implement category filtering system
- Add search functionality
- Create reading time estimation
- Build social sharing buttons

**Days 4-5: MDX Enhancements**

- Add syntax highlighting for code blocks
- Implement responsive images
- Create table of contents
- Add related posts functionality

**Days 6-7: Blog Content Migration**

- Migrate existing Flutter blogs to MDX
- Add proper frontmatter to all posts
- Implement category assignment
- Test all blog features

### Week 4: Content Migration & Polish

**Days 1-3: Content Creation**

- Add work experience data
- Create skills section
- Build about page content
- Add sample blog posts for other categories

**Days 4-5: Responsive Design**

- Optimize for all screen sizes
- Test mobile navigation
- Ensure proper typography scaling
- Fix any responsive issues

**Days 6-7: Performance & SEO**

- Optimize images and assets
- Add meta tags and Open Graph
- Implement proper SEO structure
- Test performance metrics

### Week 5: Content & Documentation

**Days 1-3: Content Organization**

- Organize blog posts by categories
- Add example blog posts
- Create content templates
- Set up content workflow

**Days 4-5: Documentation**

- Write comprehensive README.md
- Create forking guide
- Add configuration documentation
- Include deployment instructions

**Days 6-7: Testing & Polish**

- Test all features thoroughly
- Fix any bugs or issues
- Optimize code quality
- Prepare for deployment

### Week 6: Deployment & Optimization

**Days 1-3: Deployment Setup**

- Set up GitHub Pages deployment
- Configure environment variables
- Set up custom domain (Iaashish13.github.io)
- Test production build

**Days 4-5: CI/CD & Monitoring**

- Set up GitHub Actions for automated deployment
- Add automated testing
- Configure performance monitoring
- Set up error tracking

**Days 6-7: Final Optimization**

- Optimize bundle size
- Add PWA capabilities
- Implement caching strategies
- Final testing and launch

## Design Specifications

### Color Scheme

```css
/* Light Theme */
--primary: #3b82f6;
--secondary: #64748b;
--background: #ffffff;
--foreground: #0f172a;
--muted: #f1f5f9;
--border: #e2e8f0;

/* Dark Theme */
--primary: #60a5fa;
--secondary: #94a3b8;
--background: #0f172a;
--foreground: #f8fafc;
--muted: #1e293b;
--border: #334155;
```

### Typography

- **Headings**: Inter (system font fallback)
- **Body**: Inter (system font fallback)
- **Code**: JetBrains Mono
- **Responsive**: Mobile-first scaling

### Layout

- **Max Width**: 1200px
- **Padding**: 1rem (mobile), 2rem (tablet), 4rem (desktop)
- **Grid**: CSS Grid for layouts
- **Flexbox**: For component layouts

## Content Workflow

### File-Based Blog Creation

- Simple Markdown/MDX file creation
- Category/sub-category organization
- Git-based version control
- Direct file editing in code editor

### Blog Writing Workflow

1. Create new `.mdx` file in `content/drafts/`
2. Add frontmatter with metadata
3. Write content in MDX format
4. Preview in local development
5. Move to `content/blogs/` when ready

### Frontmatter Structure

```yaml
---
title: "Your Blog Title"
date: "2024-01-15"
category: "frontend"
subCategory: "flutter"
tags: ["flutter", "dart", "mobile"]
readingTime: "5 min read"
description: "Brief description of the blog post"
---
```

## Forking & Customization Guide

### Quick Start

1. Fork the repository
2. Update `config/personal.ts` with your information
3. Replace `public/images/profile.jpg` with your photo
4. Update `config/experience.ts` with your work history
5. Modify `config/skills.ts` with your skills
6. Deploy to GitHub Pages

### Customization Points

- **Personal Info**: `config/personal.ts`
- **Work Experience**: `config/experience.ts`
- **Skills**: `config/skills.ts`
- **Categories**: `config/categories.ts`
- **Blog Content**: `content/blogs/`
- **Styling**: `tailwind.config.js`

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## Success Metrics

### Performance Goals

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### User Experience Goals

- **Mobile Responsive**: Perfect on all devices
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Proper meta tags and structured data
- **Performance**: Fast loading times

### Content Goals

- **Blog Posts**: 6+ migrated posts
- **Categories**: 3 main categories with sub-categories
- **Portfolio**: Complete work experience and skills
- **Documentation**: Comprehensive README and guides

## Risk Mitigation

### Technical Risks

- **MDX Compatibility**: Test with various content types
- **Performance**: Monitor bundle size and loading times
- **SEO**: Ensure proper meta tags and structure
- **Mobile**: Test on various devices and browsers

### Content Risks

- **Migration**: Backup original Flutter project
- **Data Loss**: Version control all content
- **Customization**: Clear documentation for forking
- **Deployment**: Test deployment process thoroughly

## Future Enhancements

### Phase 2 Features (Post-Launch)

- Newsletter subscription
- Comments system
- Analytics dashboard
- Advanced search with filters
- Blog series/collections
- Guest posting system

### Phase 3 Features

- Multi-language support
- Content scheduling
- Social media integration
- Advanced analytics
- Performance monitoring

---

**Note**: This plan is designed to be flexible and can be adjusted based on progress and requirements. Each week includes buffer time for unexpected issues and refinements.
