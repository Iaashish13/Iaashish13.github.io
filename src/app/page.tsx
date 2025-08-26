import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { personalInfo } from "@/config/personal";
import { skills } from "@/config/skills";
import { getAllBlogs } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/blog-card";

export default function HomePage() {
  const recentBlogs = getAllBlogs().slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Minimal & Clean */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <Image
                src={personalInfo.photo}
                alt={personalInfo.name}
                width={128}
                height={128}
                className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                priority
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-tight">
              {personalInfo.name}
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-light">
              {personalInfo.title}
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
              {personalInfo.about}
            </p>

            {/* Minimal Social Links */}
            <div className="flex items-center justify-center gap-6 mb-12">
              <Link
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href={`mailto:${personalInfo.email}`}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8">
              <Link
                href="/blog"
                className="group flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Read My Blog
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Minimal */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-16 text-gray-800 dark:text-gray-200">
            Skills & Technologies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Core Skills */}
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 text-gray-800 dark:text-gray-200">
                Core Skills
              </h3>
              <div className="space-y-3">
                {skills.core.map((skill) => (
                  <div
                    key={skill}
                    className="text-gray-600 dark:text-gray-400 text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Senior Flutter */}
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 text-gray-800 dark:text-gray-200">
                Senior Flutter
              </h3>
              <div className="space-y-3">
                {skills.seniorFlutter.slice(0, 4).map((skill) => (
                  <div
                    key={skill}
                    className="text-gray-600 dark:text-gray-400 text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional */}
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 text-gray-800 dark:text-gray-200">
                Additional
              </h3>
              <div className="space-y-3">
                {skills.additional.slice(0, 6).map((skill) => (
                  <div
                    key={skill}
                    className="text-gray-600 dark:text-gray-400 text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts - Minimal */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4 text-gray-800 dark:text-gray-200">
              Recent Blog Posts
            </h2>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              View all posts
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
