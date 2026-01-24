import { getAllBlogs } from "@/lib/mdx";
import { BlogMeta } from "@/types/blog";
import { BlogCard } from "./blog-card";

interface RelatedPostsProps {
  currentBlog: BlogMeta;
  maxPosts?: number;
}

export function RelatedPosts({ currentBlog, maxPosts = 3 }: RelatedPostsProps) {
  const allBlogs = getAllBlogs();

  // Find related posts based on category and tags
  const relatedPosts = allBlogs
    .filter((blog) => blog.slug !== currentBlog.slug) // Exclude current post
    .filter(
      (blog) =>
        blog.category === currentBlog.category ||
        blog.subCategory === currentBlog.subCategory ||
        blog.tags.some((tag) => currentBlog.tags.includes(tag))
    )
    .slice(0, maxPosts);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl sm:text-2xl font-bold font-mono mb-6 text-foreground">
        <span className="text-[hsl(var(--terminal-blue))]">{`// `}</span>
        related_posts/
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
