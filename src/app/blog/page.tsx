import { getAllBlogs } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/blog-card";
import { CategoryFilter } from "@/components/blog/category-filter";
import { Search } from "@/components/blog/search";
import { BlogClientWrapper } from "@/components/blog/blog-client-wrapper";
import { FileText } from "lucide-react";

export default function BlogPage() {
  const allBlogs = getAllBlogs();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-[hsl(var(--terminal-green))]" />
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
              blog_posts/
            </h1>
          </div>
          <p className="text-sm font-mono text-muted-foreground">
            <span className="text-[hsl(var(--terminal-blue))]">{'// Thoughts, tutorials, and insights about Flutter, React, and software development'}</span>
          </p>
          <div className="mt-4 font-mono text-sm text-muted-foreground">
            <span className="text-[hsl(var(--terminal-cyan))]">total:</span> {allBlogs.length} posts
          </div>
        </div>

        {/* Client-side filtering */}
        <BlogClientWrapper blogs={allBlogs} />
      </div>
    </div>
  );
}
