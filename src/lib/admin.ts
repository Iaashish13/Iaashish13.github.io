import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

export interface BlogFormData {
  title: string;
  description: string;
  category: string;
  subCategory: string;
  tags: string;
  content: string;
  date: string;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function createBlogFile(formData: BlogFormData): boolean {
  if (typeof window !== "undefined") {
    return false;
  }

  try {
    const slug = generateSlug(formData.title);
    const categoryDir = formData.category;
    const filePath = path.join(blogsDirectory, categoryDir, `${slug}.md`);

    // Create category directory if it doesn't exist
    const categoryPath = path.join(blogsDirectory, categoryDir);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    // Create frontmatter
    const frontmatter = `---
title: "${formData.title}"
date: "${formData.date}"
category: "${formData.category}"
subCategory: "${formData.subCategory}"
tags: [${formData.tags
      .split(",")
      .map((tag) => `"${tag.trim()}"`)
      .join(", ")}]
readingTime: "5 min read"
description: "${formData.description}"
---

${formData.content}
`;

    // Write file
    fs.writeFileSync(filePath, frontmatter);
    return true;
  } catch (error) {
    console.error("Error creating blog file:", error);
    return false;
  }
}

export function updateBlogFile(slug: string, formData: BlogFormData): boolean {
  if (typeof window !== "undefined") {
    return false;
  }

  try {
    // Find the existing file
    const allDirs = fs.readdirSync(blogsDirectory);
    let existingFilePath = "";

    for (const dir of allDirs) {
      const dirPath = path.join(blogsDirectory, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath);
        const file = files.find((f) => f.replace(/\.mdx?$/, "") === slug);
        if (file) {
          existingFilePath = path.join(dirPath, file);
          break;
        }
      }
    }

    if (!existingFilePath) {
      throw new Error("Blog file not found");
    }

    // Create new frontmatter
    const frontmatter = `---
title: "${formData.title}"
date: "${formData.date}"
category: "${formData.category}"
subCategory: "${formData.subCategory}"
tags: [${formData.tags
      .split(",")
      .map((tag) => `"${tag.trim()}"`)
      .join(", ")}]
readingTime: "5 min read"
description: "${formData.description}"
---

${formData.content}
`;

    // Write updated file
    fs.writeFileSync(existingFilePath, frontmatter);
    return true;
  } catch (error) {
    console.error("Error updating blog file:", error);
    return false;
  }
}

export function deleteBlogFile(slug: string): boolean {
  if (typeof window !== "undefined") {
    return false;
  }

  try {
    // Find the existing file
    const allDirs = fs.readdirSync(blogsDirectory);

    for (const dir of allDirs) {
      const dirPath = path.join(blogsDirectory, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath);
        const file = files.find((f) => f.replace(/\.mdx?$/, "") === slug);

        if (file) {
          const filePath = path.join(dirPath, file);
          fs.unlinkSync(filePath);
          return true;
        }
      }
    }

    throw new Error("Blog file not found");
  } catch (error) {
    console.error("Error deleting blog file:", error);
    return false;
  }
}

export function getBlogContent(slug: string): string | null {
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
          const filePath = path.join(dirPath, file);
          const fileContents = fs.readFileSync(filePath, "utf8");
          const { content } = matter(fileContents);
          return content;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error reading blog content:", error);
    return null;
  }
}
