import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogMeta } from "@/types/blog";

const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

export function getBlogSlugs(): string[] {
  if (typeof window !== "undefined") {
    return [];
  }

  const allDirs = fs.readdirSync(blogsDirectory);
  const slugs: string[] = [];

  allDirs.forEach((dir) => {
    const dirPath = path.join(blogsDirectory, dir);
    if (fs.statSync(dirPath).isDirectory()) {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        if (file.endsWith(".md") || file.endsWith(".mdx")) {
          slugs.push(file.replace(/\.mdx?$/, ""));
        }
      });
    }
  });

  return slugs;
}

export function getBlogBySlug(slug: string): BlogPost | null {
  if (typeof window !== "undefined") {
    return null;
  }

  try {
    const allDirs = fs.readdirSync(blogsDirectory);

    for (const dir of allDirs) {
      const dirPath = path.join(blogsDirectory, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath);
        const file = files.find((f) => f.replace(/\.mdx?$/, "") === slug);

        if (file) {
          const fullPath = path.join(dirPath, file);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          return {
            slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString(),
            category: data.category || "other",
            subCategory: data.subCategory || "general",
            tags: data.tags || [],
            readingTime: data.readingTime || "5 min read",
            description: data.description || "",
            content,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error reading blog:", error);
    return null;
  }
}

export function getAllBlogs(): BlogMeta[] {
  if (typeof window !== "undefined") {
    return [];
  }

  const slugs = getBlogSlugs();
  const blogs = slugs
    .map((slug) => {
      const blog = getBlogBySlug(slug);
      if (!blog) return null;

      return {
        slug: blog.slug,
        title: blog.title,
        date: blog.date,
        category: blog.category,
        subCategory: blog.subCategory,
        tags: blog.tags,
        readingTime: blog.readingTime,
        description: blog.description,
      };
    })
    .filter(Boolean) as BlogMeta[];

  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogsByCategory(category: string): BlogMeta[] {
  return getAllBlogs().filter((blog) => blog.category === category);
}

export function getBlogsBySubCategory(subCategory: string): BlogMeta[] {
  return getAllBlogs().filter((blog) => blog.subCategory === subCategory);
}
