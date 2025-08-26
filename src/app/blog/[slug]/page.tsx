import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogs } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { SocialShare } from "@/components/blog/social-share";
import { RelatedPosts } from "@/components/blog/related-posts";
import { createBlogMetadata } from "@/lib/metadata";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return createBlogMetadata({
    title: blog.title,
    description: blog.description,
    slug: blog.slug,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Blog Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
              {blog.subCategory}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={blog.date}>{formatDate(blog.date)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readingTime}</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          {blog.description && (
            <p className="text-xl text-muted-foreground mb-6">
              {blog.description}
            </p>
          )}

          {blog.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded bg-muted text-muted-foreground text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Sharing */}
          <div className="border-t pt-6">
            <SocialShare blog={blog} />
          </div>
        </header>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <MDXRemote source={blog.content} />
        </article>

        {/* Related Posts */}
        <RelatedPosts currentBlog={blog} />
      </div>
    </div>
  );
}
