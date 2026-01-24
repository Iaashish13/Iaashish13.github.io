import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { formatDate, truncateText } from "@/lib/utils";
import { BlogMeta } from "@/types/blog";

interface BlogCardProps {
  blog: BlogMeta;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${blog.slug}`} className="block h-full">
        <div className="h-full border border-border bg-secondary/30 hover:bg-secondary hover:border-[hsl(var(--terminal-green))]/50 transition-all rounded-lg p-5 flex flex-col">
          {/* Header with category badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono text-muted-foreground">
              {blog.subCategory}
            </span>
            <span className="text-[hsl(var(--terminal-green))] text-xs font-mono">
              .md
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold font-mono mb-3 text-foreground group-hover:text-[hsl(var(--terminal-green))] transition-colors leading-tight">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
            {truncateText(blog.description, 120)}
          </p>

          {/* Footer with metadata */}
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-3 border-t border-border">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={blog.date}>{formatDate(blog.date)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{blog.readingTime}</span>
            </div>
          </div>

          {/* Tags preview */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {blog.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-[hsl(var(--terminal-blue))]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
