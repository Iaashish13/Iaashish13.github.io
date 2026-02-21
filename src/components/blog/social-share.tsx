"use client";

import { useState, useEffect } from "react";
import { Twitter, Linkedin, Facebook, Link as LinkIcon } from "lucide-react";
import { BlogMeta } from "@/types/blog";

interface SocialShareProps {
  blog: BlogMeta;
}

export function SocialShare({ blog }: SocialShareProps) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const text = `${blog.title} - ${blog.description}`;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="code-block">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground">
          <span className="text-[hsl(var(--terminal-blue))]">{`// `}</span>share:
        </span>

        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded bg-secondary hover:bg-muted border border-border hover:border-[hsl(var(--terminal-cyan))] transition-colors text-xs font-mono flex items-center gap-2"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-3 w-3" />
          <span className="text-muted-foreground">twitter</span>
        </a>

        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded bg-secondary hover:bg-muted border border-border hover:border-[hsl(var(--terminal-blue))] transition-colors text-xs font-mono flex items-center gap-2"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-3 w-3" />
          <span className="text-muted-foreground">linkedin</span>
        </a>

        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded bg-secondary hover:bg-muted border border-border hover:border-[hsl(var(--terminal-purple))] transition-colors text-xs font-mono flex items-center gap-2"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-3 w-3" />
          <span className="text-muted-foreground">facebook</span>
        </a>

        <button
          onClick={copyToClipboard}
          className="px-3 py-1.5 rounded bg-secondary hover:bg-muted border border-border hover:border-[hsl(var(--terminal-green))] transition-colors text-xs font-mono flex items-center gap-2"
          aria-label="Copy link"
        >
          <LinkIcon className="h-3 w-3" />
          <span className="text-muted-foreground">copy</span>
        </button>
      </div>
    </div>
  );
}
