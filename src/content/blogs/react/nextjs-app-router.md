---
title: "Next.js App Router: A Complete Guide"
date: "2024-01-15"
category: "frontend"
subCategory: "react"
tags: ["react", "nextjs", "app-router", "typescript", "web"]
readingTime: "12 min read"
description: "Learn how to use Next.js App Router for building modern React applications with improved performance and developer experience."
---

# Next.js App Router: A Complete Guide

Next.js 13+ introduced the App Router, a new paradigm for building React applications that provides better performance, improved developer experience, and more intuitive routing.

## What is App Router?

The App Router is Next.js's new routing system that uses React Server Components by default. It's built on top of React 18's concurrent features and provides a more intuitive way to organize your application.

### Key Features

- **Server Components by default**: Better performance and SEO
- **Nested layouts**: Share UI between routes
- **Loading and error boundaries**: Built-in loading states
- **Streaming**: Progressive rendering
- **Data fetching**: Simplified data fetching patterns

## Getting Started

Create a new Next.js project with App Router:

```bash
npx create-next-app@latest my-app --app --typescript
```

### Project Structure

```
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── about/
│   └── page.tsx       # About page
├── blog/
│   ├── layout.tsx     # Blog layout
│   ├── page.tsx       # Blog listing
│   └── [slug]/
│       └── page.tsx   # Individual blog post
└── globals.css        # Global styles
```

## Server Components vs Client Components

### Server Components (Default)

Server Components run on the server and are rendered to HTML before being sent to the client. They can't use browser APIs or React hooks.

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <p>This is a server component</p>
    </div>
  );
}
```

### Client Components

Use the `"use client"` directive to create client components that run in the browser:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Layouts

Layouts allow you to share UI between routes. They wrap page components and persist across navigation.

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>Navigation</nav>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

## Data Fetching

App Router provides several ways to fetch data:

### Server Components

```tsx
// app/blog/page.tsx
async function getPosts() {
  const res = await fetch("https://api.example.com/posts");
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Client Components

```tsx
"use client";

import { useEffect, useState } from "react";

export default function ClientBlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

## Route Groups

Route groups allow you to organize routes without affecting the URL structure:

```
app/
├── (marketing)/
│   ├── about/
│   └── contact/
├── (shop)/
│   ├── products/
│   └── cart/
└── layout.tsx
```

## Dynamic Routes

Create dynamic routes using square brackets:

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <article>
      <h1>Blog Post: {params.slug}</h1>
    </article>
  );
}
```

## Loading and Error Boundaries

### Loading UI

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading blog posts...</div>;
}
```

### Error UI

```tsx
// app/blog/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

## Metadata API

The Metadata API allows you to define metadata for your pages:

```tsx
// app/blog/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest blog posts",
};

export default function BlogPage() {
  return <div>Blog content</div>;
}
```

## Best Practices

1. **Use Server Components by default**: Only use Client Components when you need interactivity
2. **Leverage layouts**: Share common UI between routes
3. **Implement loading states**: Provide better UX with loading UI
4. **Handle errors gracefully**: Use error boundaries for better error handling
5. **Optimize images**: Use Next.js Image component for better performance

## Conclusion

The App Router represents a significant evolution in Next.js and React development. It provides better performance, improved developer experience, and more intuitive patterns for building modern web applications.

By understanding Server Components, layouts, and the new data fetching patterns, you can build more efficient and maintainable React applications.
