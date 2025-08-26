import Link from "next/link";
import { formatDate, truncateText } from "@/lib/utils";
import { BlogMeta } from "@/types/blog";

interface BlogCardProps {
  blog: BlogMeta;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {blog.subCategory}
            </span>
            <span>•</span>
            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
            <span>•</span>
            <span>{blog.readingTime}</span>
          </div>

          <h3 className="text-xl font-light mb-3 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors leading-tight">
            {blog.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {truncateText(blog.description, 120)}
          </p>
        </div>
      </Link>
    </article>
  );
}
