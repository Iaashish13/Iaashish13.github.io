# 🚀 Forking Guide - Make This Portfolio Yours!

This guide will help you quickly customize this portfolio template for your own use. Follow these steps to create your personalized portfolio website.

## 📋 Quick Checklist

- [ ] Fork the repository
- [ ] Clone your fork locally
- [ ] Update personal information
- [ ] Add your profile photo
- [ ] Customize work experience
- [ ] Update skills
- [ ] Modify blog categories
- [ ] Add your blog posts
- [ ] Deploy to GitHub Pages

## 🎯 Step-by-Step Instructions

### Step 1: Fork & Clone

1. **Fork the repository**:

   - Go to [https://github.com/Iaashish13/Iaashish13.github.io](https://github.com/Iaashish13/Iaashish13.github.io)
   - Click the "Fork" button in the top right
   - Choose your GitHub account

2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/Iaashish13.github.io.git
   cd Iaashish13.github.io
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

### Step 2: Update Personal Information

Edit `src/config/personal.ts`:

```typescript
export const personalInfo = {
  name: "Your Full Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://x.com/yourhandle",
  about:
    "Write a compelling personal description that showcases your expertise, passion, and what makes you unique. Keep it professional but personal.",
  photo: "/images/profile.jpg", // We'll add this in the next step
};
```

### Step 3: Add Your Profile Photo

1. **Add your photo**:

   ```bash
   # Copy your photo to the public/images directory
   cp /path/to/your/photo.jpg public/images/profile.jpg
   ```

2. **Photo requirements**:
   - **Format**: JPG or PNG
   - **Size**: 400x400 pixels (square)
   - **Quality**: High resolution
   - **Style**: Professional headshot

### Step 4: Customize Work Experience

Edit `src/config/experience.ts`:

```typescript
export const workExperience = [
  {
    title: "Senior Software Engineer",
    company: "Tech Company Inc.",
    period: "2023 - Present",
    description:
      "Led development of scalable web applications using modern technologies. Mentored junior developers and implemented best practices.",
    technologies: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    title: "Full Stack Developer",
    company: "Startup XYZ",
    period: "2021 - 2023",
    description:
      "Built and maintained web applications from concept to deployment. Collaborated with cross-functional teams.",
    technologies: ["JavaScript", "Python", "PostgreSQL", "Docker"],
  },
  {
    title: "Junior Developer",
    company: "Agency ABC",
    period: "2020 - 2021",
    description:
      "Started my development journey, learned best practices, and contributed to client projects.",
    technologies: ["HTML", "CSS", "JavaScript", "Git"],
  },
];
```

### Step 5: Update Skills

Edit `src/config/skills.ts`:

```typescript
export const skills = {
  core: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "PostgreSQL",
  ],
  seniorSkills: [
    "System Architecture",
    "Performance Optimization",
    "Code Review & Mentoring",
    "CI/CD Pipelines",
    "Microservices",
    "Cloud Infrastructure (AWS/GCP)",
    "Testing Strategies",
    "Security Best Practices",
  ],
  additional: [
    "Git & Version Control",
    "Agile/Scrum Methodologies",
    "Technical Documentation",
    "API Design",
    "Database Design",
    "UI/UX Principles",
    "DevOps Practices",
    "Project Management",
  ],
};
```

### Step 6: Customize Blog Categories

Edit `src/config/categories.ts` to match your expertise:

```typescript
export const categories = {
  frontend: {
    label: "Frontend",
    subCategories: ["React", "Vue", "Angular", "Next.js", "TypeScript"],
  },
  backend: {
    label: "Backend",
    subCategories: ["Node.js", "Python", "Java", "Go", "Database"],
  },
  other: {
    label: "Other",
    subCategories: ["Architecture", "DevOps", "Career", "General Tech"],
  },
};
```

### Step 7: Add Your Blog Posts

Create blog posts in `src/content/blogs/[category]/[slug].md`:

````markdown
---
title: "Getting Started with React Hooks"
date: "2024-01-15"
category: "frontend"
subCategory: "react"
tags: ["react", "hooks", "javascript", "frontend"]
readingTime: "8 min read"
description: "Learn how to use React Hooks to build modern functional components with state and side effects."
---

# Getting Started with React Hooks

React Hooks revolutionized how we write React components...

## What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features...

## useState Hook

The most basic hook is `useState`...

```javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
````

## Conclusion

Hooks make React development more intuitive and functional...

````

### Step 8: Test Your Changes

1. **Run development server**:
   ```bash
   npm run dev
````

2. **Check all pages**:

   - Homepage: `http://localhost:3000`
   - Blog: `http://localhost:3000/blog`
   - About: `http://localhost:3000/about`
   - Experience: `http://localhost:3000/experience`

3. **Test features**:
   - Theme toggle (light/dark mode)
   - Blog search and filtering
   - Responsive design (mobile/tablet/desktop)

### Step 9: Deploy to GitHub Pages

1. **Configure Next.js for static export**:
   Create or update `next.config.js`:

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

3. **Configure GitHub Pages**:

   - Go to your repository settings
   - Navigate to "Pages"
   - Set source to "GitHub Actions"

4. **Deploy**:

   ```bash
   git add .
   git commit -m "Customize portfolio for my use"
   git push origin main
   ```

5. **Wait for deployment**:
   - Check the "Actions" tab in your repository
   - Wait for the deployment to complete
   - Your site will be available at `https://yourusername.github.io`

## 🎨 Advanced Customization

### Custom Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add your brand colors here
    },
  },
},
```

### Custom Fonts

1. **Add Google Fonts**:
   Edit `src/app/layout.tsx`:

   ```typescript
   import { Inter, Poppins } from "next/font/google";

   const poppins = Poppins({
     subsets: ["latin"],
     weight: ["400", "500", "600", "700"],
   });
   ```

2. **Update Tailwind config**:
   ```typescript
   fontFamily: {
     sans: ["Poppins", "system-ui", "sans-serif"],
   },
   ```

### Custom Components

- **Header**: `src/components/layout/header.tsx`
- **Footer**: `src/components/layout/footer.tsx`
- **Blog Cards**: `src/components/blog/blog-card.tsx`
- **Navigation**: Customize navigation links

## 🔧 Troubleshooting

### Common Issues

1. **Build errors**:

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules .next
   npm install
   npm run build
   ```

2. **Image not loading**:

   - Check file path in `public/images/`
   - Ensure image format is supported (JPG, PNG, WebP)
   - Verify file permissions

3. **Admin not working**:

   - Ensure you're running in development mode
   - Check browser console for errors
   - Verify API routes are accessible

4. **Deployment issues**:
   - Check GitHub Actions logs
   - Verify `next.config.js` has `output: 'export'`
   - Ensure all dependencies are in `package.json`

### Getting Help

- 📖 **Documentation**: Check the main README.md
- 🐛 **Issues**: Create an issue in the original repository
- 💬 **Discussions**: Use GitHub Discussions
- 📧 **Email**: Contact the original author

## 🎉 Congratulations!

You've successfully customized your portfolio! Your site should now be live at `https://yourusername.github.io` with your personal information, blog posts, and custom styling.

### Next Steps

1. **Add more blog posts** to showcase your expertise
2. **Customize the design** to match your personal brand
3. **Add analytics** to track visitors
4. **Optimize SEO** for better search rankings
5. **Share your portfolio** on social media and professional networks

---

**Happy coding! 🚀**

_This template is designed to be easily forkable and customizable. Feel free to modify it to match your personal brand and style!_
