import Link from "next/link";
import { formatDate, truncateText } from "@/lib/utils";
import { BlogMeta } from "@/types/blog";

interface BlogCardProps {
  blog: BlogMeta;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group relative rounded-lg border bg-background p-4 sm:p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {blog.subCategory}
        </span>
        <span className="hidden sm:inline">•</span>
        <time dateTime={blog.date} className="text-xs sm:text-sm">
          {formatDate(blog.date)}
        </time>
        <span className="hidden sm:inline">•</span>
        <span className="text-xs sm:text-sm">{blog.readingTime}</span>
      </div>

      <Link href={`/blog/${blog.slug}`} className="block">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm sm:text-base">
          {truncateText(blog.description, 120)}
        </p>
      </Link>

      <div className="flex flex-wrap gap-1 sm:gap-2">
        {blog.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
