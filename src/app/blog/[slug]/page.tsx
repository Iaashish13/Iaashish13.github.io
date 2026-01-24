import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogs } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { SocialShare } from "@/components/blog/social-share";
import { RelatedPosts } from "@/components/blog/related-posts";
import { createBlogMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import rehypePrism from "rehype-prism-plus";
import "prismjs/themes/prism-tomorrow.css";
import { StructuredData } from "@/components/seo/structured-data";

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
    tags: blog.tags,
    category: blog.category,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <StructuredData
        type="BlogPosting"
        blogData={{
          title: blog.title,
          description: blog.description,
          slug: blog.slug,
          date: blog.date,
          tags: blog.tags,
          category: blog.category,
        }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Terminal-style Back Navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[hsl(var(--terminal-green))] transition-colors mb-8 code-block w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-[hsl(var(--terminal-cyan))]">$</span> cd ../blog_posts/
        </Link>

        {/* Blog Header - Terminal Style */}
        <header className="mb-8">
          {/* File name style title */}
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold font-mono text-foreground break-words">
              {blog.slug}
              <span className="text-[hsl(var(--terminal-green))]">.md</span>
            </h1>
          </div>

          {/* Metadata in code-block style */}
          <div className="code-block mb-6">
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[hsl(var(--terminal-purple))]">category:</span>
                <span className="px-2 py-1 rounded bg-muted border border-border text-foreground">
                  {blog.subCategory}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[hsl(var(--terminal-cyan))]" />
                <time dateTime={blog.date} className="text-muted-foreground">
                  {formatDate(blog.date)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[hsl(var(--terminal-yellow))]" />
                <span className="text-muted-foreground">{blog.readingTime}</span>
              </div>
            </div>
          </div>

          {/* Description as comment */}
          {blog.description && (
            <div className="code-block mb-6">
              <p className="text-sm sm:text-base font-mono text-muted-foreground leading-relaxed">
                <span className="text-[hsl(var(--terminal-blue))]">{`// `}</span>
                {blog.description}
              </p>
            </div>
          )}

          {/* Tags with hashtag style */}
          {blog.tags.length > 0 && (
            <div className="code-block mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-muted-foreground">tags:</span>
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs sm:text-sm font-mono text-[hsl(var(--terminal-blue))]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Sharing - Terminal Style */}
          <SocialShare blog={blog} />
        </header>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-mono prose-code:font-mono prose-pre:code-block">
          <MDXRemote 
            source={blog.content}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypePrism],
              },
            }}
          />
        </article>

        {/* Related Posts */}
        <RelatedPosts currentBlog={blog} />
      </div>
    </div>
  );
}
