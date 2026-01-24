import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowRight, Terminal as TerminalIcon, Code2, Cpu } from "lucide-react";
import { personalInfo } from "@/config/personal";
import { skills } from "@/config/skills";
import { getAllBlogs } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/blog-card";
import { Terminal, CodeBlock } from "@/components/ui/terminal";
import { MobileAppDisplay } from "@/components/ui/mobile-mockup";

export default function HomePage() {
  const recentBlogs = getAllBlogs().slice(0, 3);

  const terminalCommands = [
    {
      input: "$ whoami",
      output: personalInfo.name,
    },
    {
      input: "$ cat role.txt",
      output: personalInfo.title,
    },
    {
      input: "$ ls skills/",
      output: skills.core.slice(0, 4),
    },
  ];

  const codeSnippet = `class MobileDeveloperProfile {
  final String title = "Mobile Development";
  final String subtitle = "Making products from 0 to 1";
  final String name = "${personalInfo.name}";
  final String role = "${personalInfo.title}";
  final String photo = "${personalInfo.photo}";
  
  final List<String> technologies = [
    "Flutter & Dart",
    "Swift & iOS",
    "Django"
  ];
  
  final Map<String, String> socialLinks = {
    "email": "${personalInfo.email}",
    "linkedin": "${personalInfo.linkedin}",
    "github": "${personalInfo.github}"
  };
  
  Widget buildProfile() {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            ProfileHeader(title, subtitle),
            CircleAvatar(backgroundImage: AssetImage(photo)),
            Text(name, style: TextStyle(fontWeight: FontWeight.bold)),
            Text(role, style: TextStyle(color: Colors.blue)),
            TechnologiesSection(technologies),
            SocialLinksSection(socialLinks),
          ],
        ),
      ),
    );
  }
}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section - Terminal Style */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Left Column: Terminal + Buttons */}
            <div className="flex flex-col gap-6">
              <Terminal commands={terminalCommands} />
              
              {/* CTAs below terminal - aligned with terminal width */}
              <div className="flex gap-3">
                <Link
                  href="/blog"
                  className="group flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[hsl(var(--terminal-green))] text-background hover:opacity-90 transition-opacity rounded font-mono text-sm font-medium"
                >
                  <Code2 className="h-4 w-4" />
                  Read Blog
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary hover:bg-muted border border-border rounded font-mono text-sm transition-colors"
                >
                  About Me
                </Link>
              </div>
            </div>

            {/* Right Column: Profile & Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold font-mono text-foreground mb-2">
                  {personalInfo.name}
                </h1>
                <p className="text-[hsl(var(--terminal-green))] font-mono text-sm">
                  {personalInfo.title}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-[hsl(var(--terminal-blue))] font-mono text-sm">{">"}</span>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {personalInfo.about}
                  </p>
                </div>
              </div>

              {/* Social Links - Terminal Style */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground mb-2">
                  <span>Connect with me</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary hover:bg-muted border border-border rounded text-sm font-mono transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-muted-foreground">GitHub</span>
                  </Link>
                  <Link
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary hover:bg-muted border border-border rounded text-sm font-mono transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-muted-foreground">LinkedIn</span>
                  </Link>
                  <Link
                    href={personalInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary hover:bg-muted border border-border rounded text-sm font-mono transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="text-muted-foreground">Twitter</span>
                  </Link>
                  <Link
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary hover:bg-muted border border-border rounded text-sm font-mono transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-muted-foreground">Email</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Code to UI Display */}
          <div className="mt-16 border-t border-border pt-16">
            <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
              {/* Left: Dart Code */}
              <div className="w-full lg:w-1/2 lg:flex-shrink-0">
                <CodeBlock
                  code={codeSnippet}
                  language="dart"
                  className="max-h-[50vh] lg:max-h-[600px] overflow-y-auto"
                />
              </div>

              {/* Right: Mobile Screen showing the rendered app */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <MobileAppDisplay
                  name={personalInfo.name}
                  role={personalInfo.title}
                  email={personalInfo.email}
                  photo={personalInfo.photo}
                  github={personalInfo.github}
                  linkedin={personalInfo.linkedin}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Developer Style */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Cpu className="h-6 w-6 text-[hsl(var(--terminal-green))]" />
            <h2 className="text-2xl font-bold font-mono text-foreground">
              skills.json
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Core Skills */}
            <div className="code-block">
              <div className="text-xs text-muted-foreground mb-3 font-mono">
                {/* Core Technologies */}
              </div>
              <div className="space-y-2">
                {skills.core.map((skill, idx) => (
                  <div
                    key={skill}
                    className="flex items-start gap-2 font-mono text-sm"
                  >
                    <span className="text-[hsl(var(--terminal-blue))]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Senior Flutter */}
            <div className="code-block">
              <div className="text-xs text-muted-foreground mb-3 font-mono">
                {/* Senior Flutter Skills */}
              </div>
              <div className="space-y-2">
                {skills.seniorFlutter.slice(0, 6).map((skill, idx) => (
                  <div
                    key={skill}
                    className="flex items-start gap-2 font-mono text-sm"
                  >
                    <span className="text-[hsl(var(--terminal-purple))]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional */}
            <div className="code-block">
              <div className="text-xs text-muted-foreground mb-3 font-mono">
                {/* Additional Skills */}
              </div>
              <div className="space-y-2">
                {skills.additional.slice(0, 6).map((skill, idx) => (
                  <div
                    key={skill}
                    className="flex items-start gap-2 font-mono text-sm"
                  >
                    <span className="text-[hsl(var(--terminal-cyan))]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <TerminalIcon className="h-6 w-6 text-[hsl(var(--terminal-green))]" />
              <h2 className="text-2xl font-bold font-mono text-foreground">
                recent_posts/
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-[hsl(var(--terminal-green))] transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Console Message */}
      <section className="py-8 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="code-block bg-background">
            <div className="flex items-start gap-2">
              <span className="text-[hsl(var(--terminal-green))] font-mono text-sm">
                console.log(
              </span>
              <span className="text-[hsl(var(--terminal-yellow))] font-mono text-sm">
                &quot;Thanks for visiting! Feel free to reach out 🚀&quot;
              </span>
              <span className="text-[hsl(var(--terminal-green))] font-mono text-sm">
                );
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
