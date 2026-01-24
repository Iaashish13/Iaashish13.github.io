import Link from "next/link";
import { Github, Linkedin, Twitter, Terminal } from "lucide-react";
import { personalInfo } from "@/config/personal";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left: Terminal-style branding */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-sm">
              <Terminal className="h-4 w-4 text-[hsl(var(--terminal-green))]" />
              <span className="text-foreground font-bold">
                {personalInfo.name.toLowerCase().replace(" ", "-")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              {/* Building elegant solutions */}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              {/* One line of code at a time */}
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono text-foreground font-bold">
              quick_links/
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/blog"
                className="text-xs font-mono text-muted-foreground hover:text-[hsl(var(--terminal-green))] transition-colors"
              >
                → blog/
              </Link>
              <Link
                href="/about"
                className="text-xs font-mono text-muted-foreground hover:text-[hsl(var(--terminal-green))] transition-colors"
              >
                → about/
              </Link>
              <Link
                href="/experience"
                className="text-xs font-mono text-muted-foreground hover:text-[hsl(var(--terminal-green))] transition-colors"
              >
                → experience/
              </Link>
            </div>
          </div>

          {/* Right: Social */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono text-foreground font-bold">
              connect/
            </h3>
            <div className="flex gap-3">
              <Link
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary hover:bg-muted border border-border rounded transition-colors"
                title="GitHub"
              >
                <Github className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary hover:bg-muted border border-border rounded transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary hover:bg-muted border border-border rounded transition-colors"
                title="Twitter"
              >
                <Twitter className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright & Tech Stack */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-xs text-muted-foreground font-mono">
                © {currentYear} {personalInfo.name} - All rights reserved
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Built with{" "}
                <span className="text-[hsl(var(--terminal-green))]">
                  Next.js
                </span>{" "}
                +{" "}
                <span className="text-[hsl(var(--terminal-blue))]">
                  TypeScript
                </span>{" "}
                +{" "}
                <span className="text-[hsl(var(--terminal-cyan))]">
                  Tailwind
                </span>
              </p>
            </div>

            {/* ASCII Art or Easter Egg */}
            <div className="text-xs text-muted-foreground font-mono">
              <pre className="text-[hsl(var(--terminal-green))]">
                {`</>with ❤️`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
