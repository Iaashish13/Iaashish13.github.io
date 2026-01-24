import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, User, Code2, Terminal as TerminalIcon } from "lucide-react";
import { personalInfo } from "@/config/personal";
import { CodeBlock } from "@/components/ui/terminal";

export default function AboutPage() {
  const aboutCode = `class AboutMe {
  final String name = "${personalInfo.name}";
  final String role = "${personalInfo.title}";
  final String location = "Nepal 🇳🇵";
  final List<String> interests = [
    "Mobile Development",
    "Clean Architecture",
    "Open Source",
    "Spirituality"
  ];
  final String currentlyLearning = "Advanced Flutter Patterns";
  final String funFact = "I love experimenting with custom ROMs!";
}`;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-6 w-6 text-[hsl(var(--terminal-green))]" />
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
              about.md
            </h1>
          </div>
          <p className="text-sm font-mono text-muted-foreground">
            <span className="text-[hsl(var(--terminal-blue))]">{'// Get to know me better'}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Profile Image & Quick Info */}
          <div className="space-y-6">
            <div className="code-block">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
                <Image
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="code-block space-y-3">
              <div className="text-xs text-muted-foreground mb-3 font-mono">
                {'// Quick Stats'}
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[hsl(var(--terminal-purple))]">final</span>
                  <span className="text-[hsl(var(--terminal-blue))]">name</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-[hsl(var(--terminal-yellow))]">&quot;{personalInfo.name}&quot;</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[hsl(var(--terminal-purple))]">final</span>
                  <span className="text-[hsl(var(--terminal-blue))]">role</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-[hsl(var(--terminal-yellow))]">&quot;{personalInfo.title}&quot;</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[hsl(var(--terminal-purple))]">final</span>
                  <span className="text-[hsl(var(--terminal-blue))]">location</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-[hsl(var(--terminal-yellow))]">&quot;Nepal 🇳🇵&quot;</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="code-block">
              <div className="text-xs text-muted-foreground mb-3 font-mono">
                {/* Connect */}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-muted border border-border rounded text-sm font-mono transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span className="text-muted-foreground">GitHub</span>
                </Link>
                <Link
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-muted border border-border rounded text-sm font-mono transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-muted-foreground">LinkedIn</span>
                </Link>
                <Link
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-muted border border-border rounded text-sm font-mono transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="text-muted-foreground">Twitter</span>
                </Link>
                <Link
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-muted border border-border rounded text-sm font-mono transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-muted-foreground">Email</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: About Content */}
          <div className="space-y-6">
            {/* About Text */}
            <div className="code-block">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-4 w-4 text-[hsl(var(--terminal-green))]" />
                <span className="font-mono text-sm font-bold">README.md</span>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>{personalInfo.about}</p>
              </div>
            </div>

            {/* Code Snippet */}
            <CodeBlock code={aboutCode} language="dart" />

            {/* CTA */}
            <div className="code-block bg-secondary/50 border-[hsl(var(--terminal-green))]/30">
              <div className="flex items-center gap-2 mb-3">
                <TerminalIcon className="h-4 w-4 text-[hsl(var(--terminal-green))]" />
                <span className="font-mono text-sm font-bold">Let&apos;s Connect!</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                I&apos;m always open to discussing new opportunities,
                interesting projects, or just having a chat about technology.
              </p>
              <Link
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--terminal-green))] text-background hover:opacity-90 transition-opacity rounded font-mono text-sm font-medium"
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
