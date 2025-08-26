import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { personalInfo } from "@/config/personal";
import { skills } from "@/config/skills";
import { getAllBlogs } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/blog-card";

export default function HomePage() {
  const recentBlogs = getAllBlogs().slice(0, 3);

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I&apos;m{" "}
              <span className="text-primary">{personalInfo.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              {personalInfo.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {personalInfo.about}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-8">
              <Link
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href={`mailto:${personalInfo.email}`}
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>

            <div className="flex gap-4">
              <Link
                href="/blog"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Read My Blog
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-muted transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full bg-muted flex items-center justify-center">
              <Image
                src={personalInfo.photo}
                alt={personalInfo.name}
                width={256}
                height={256}
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-background">
            <h3 className="text-xl font-semibold mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.core.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-background">
            <h3 className="text-xl font-semibold mb-4">Senior Flutter</h3>
            <div className="space-y-2">
              {skills.seniorFlutter.slice(0, 4).map((skill) => (
                <div key={skill} className="text-sm text-muted-foreground">
                  • {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-background">
            <h3 className="text-xl font-semibold mb-4">Additional</h3>
            <div className="flex flex-wrap gap-2">
              {skills.additional.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Recent Blog Posts</h2>
          <Link href="/blog" className="text-primary hover:underline">
            View all posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
