/**
 * OG Image Generator for Blog Posts
 * 
 * To use this, you can either:
 * 1. Generate static OG images for each blog post
 * 2. Use a service like Vercel OG or Cloudinary
 * 3. Create images manually and place them in public/og-images/
 * 
 * For now, we'll provide instructions for manual creation.
 * 
 * Recommended OG Image specs:
 * - Size: 1200x630px
 * - Format: JPG or PNG
 * - File size: < 300KB
 * - Name format: {slug}.jpg (e.g., stateful-widget-deep-dive.jpg)
 * 
 * Place images in: public/og-images/
 * 
 * You can use tools like:
 * - Canva (canva.com)
 * - Figma (figma.com)
 * - OG Image Playground (og-playground.vercel.app)
 */

export function getOgImageUrl(slug: string): string {
  // Check if custom OG image exists, otherwise use default
  return `/og-images/${slug}.jpg`;
}

export function getDefaultOgImage(): string {
  return "/images/profile.jpg";
}

/**
 * Instructions for creating OG images:
 * 
 * 1. Go to Canva.com
 * 2. Create custom size: 1200x630px
 * 3. Use your brand colors (terminal green, cyan, etc.)
 * 4. Include:
 *    - Blog post title (large, bold)
 *    - Your name/brand
 *    - Category badge
 *    - Your profile picture (small)
 * 5. Export as JPG (optimized)
 * 6. Save to public/og-images/{slug}.jpg
 * 
 * Template idea:
 * ┌─────────────────────────────────────┐
 * │  [Your Photo]  Aashish Regmi       │
 * │                                     │
 * │  BLOG POST TITLE HERE               │
 * │  Goes on multiple lines             │
 * │                                     │
 * │  [Flutter] [Mobile Dev]   📱 💻    │
 * └─────────────────────────────────────┘
 */
