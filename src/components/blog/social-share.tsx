"use client";

import { Twitter, Linkedin, Facebook, Link as LinkIcon } from "lucide-react";
import { BlogMeta } from "@/types/blog";

interface SocialShareProps {
  blog: BlogMeta;
}

export function SocialShare({ blog }: SocialShareProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";
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
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">Share:</span>

      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>

      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>

      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>

      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
