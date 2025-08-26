import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { personalInfo } from "@/config/personal";

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-muted-foreground">Get to know me better</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="relative w-64 h-64 rounded-full bg-muted mx-auto lg:mx-0 mb-8 flex items-center justify-center">
              <Image
                src={personalInfo.photo}
                alt={personalInfo.name}
                width={256}
                height={256}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{personalInfo.name}</h2>
            <h3 className="text-xl text-muted-foreground mb-6">
              {personalInfo.title}
            </h3>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed">
                {personalInfo.about}
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <Link
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
              <Link
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
              <Link
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Link>
              <Link
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email
              </Link>
            </div>

            <div className="p-6 rounded-lg border bg-background">
              <h4 className="font-semibold mb-2">Let&apos;s Connect!</h4>
              <p className="text-sm text-muted-foreground mb-4">
                I&apos;m always open to discussing new opportunities,
                interesting projects, or just having a chat about technology.
              </p>
              <Link
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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
