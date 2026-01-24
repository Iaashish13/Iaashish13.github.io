import React from "react";
import Image from "next/image";

interface MobileScreenProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileScreen({ children, className = "" }: MobileScreenProps) {
  return (
    <div className={`flex justify-center items-center flex-shrink-0 ${className}`}>
      <div className="relative w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[480px] sm:h-[520px] md:h-[560px] lg:h-[600px]">
        {/* Phone frame - iOS style */}
        <div className="relative h-full w-full rounded-[3rem] bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3 shadow-[0_25px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
          {/* Side buttons */}
          <div className="absolute -left-1.5 top-20 h-10 w-1 rounded-full bg-slate-700" />
          <div className="absolute -left-1.5 top-36 h-14 w-1 rounded-full bg-slate-700" />
          <div className="absolute -right-1.5 top-28 h-16 w-1 rounded-full bg-slate-700" />

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex h-7 w-24 items-center justify-center gap-2 rounded-full bg-black shadow-inner">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500/80" />
            <div className="h-1 w-10 rounded-full bg-gray-900" />
          </div>

          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-black">
            <div className="absolute inset-0 rounded-[2.4rem] ring-1 ring-white/10" />
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex h-12 items-center justify-between px-6 pt-3 text-white/80">
              <span className="text-[10px] font-medium">9:41</span>
              <div className="flex items-center gap-0.5 mr-20">
                {/* Spacer for dynamic island */}
              </div>
              <div className="flex items-center gap-0.5">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <svg className="w-5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="1" y="6" width="17" height="12" rx="2" ry="2" />
                  <path d="M18 12h3v0c0 1.5-1 2-1 2v-4s1-.5 1-2h-3z" />
                </svg>
              </div>
            </div>

            {/* Content - scrollable area with hidden scrollbar */}
            <div className="absolute inset-0 top-12 bottom-6 overflow-y-auto overscroll-contain scrollbar-hide">
              {children}
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

interface MobileAppDisplayProps {
  name: string;
  role: string;
  email: string;
  photo: string;
  github: string;
  linkedin: string;
}

export function MobileAppDisplay({ name, role, email, photo, github, linkedin }: MobileAppDisplayProps) {
  return (
    <MobileScreen>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black px-3 py-4">
        {/* App Header */}
        <div className="text-center mb-4 pt-1">
          <h1 className="text-xs font-bold font-mono text-green-600 dark:text-[hsl(var(--terminal-green))] mb-1">
            Mobile Development
          </h1>
          <p className="text-[9px] font-mono text-gray-600 dark:text-gray-400">
            Making products from 0 to 1
          </p>
          <div className="h-px bg-gray-200 dark:bg-gray-800 w-full mt-2"></div>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-3">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 dark:border-[hsl(var(--terminal-green))] shadow-lg">
            <Image
              src={photo}
              alt={name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        </div>

        {/* Name & Role */}
        <div className="text-center mb-4">
          <h2 className="text-sm font-bold font-mono text-gray-900 dark:text-white mb-0.5">
            {name}
          </h2>
          <p className="text-[10px] font-mono text-blue-600 dark:text-[hsl(var(--terminal-blue))]">
            {role}
          </p>
        </div>

        {/* Skills/Technologies */}
        <div className="mb-4 bg-white dark:bg-gray-800/50 rounded-xl p-2.5 shadow-sm">
          <h3 className="text-[10px] font-mono text-gray-600 dark:text-gray-400 mb-1.5 flex items-center gap-1">
            <span className="text-purple-600 dark:text-[hsl(var(--terminal-purple))]">{'// '}</span>
            Technologies
          </h3>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-2.5 py-1.5">
              <span className="text-green-500 dark:text-[hsl(var(--terminal-green))] text-[10px]">✓</span>
              <span className="text-[10px] font-mono text-gray-900 dark:text-gray-100">Flutter & Dart</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-2.5 py-1.5">
              <span className="text-green-500 dark:text-[hsl(var(--terminal-green))] text-[10px]">✓</span>
              <span className="text-[10px] font-mono text-gray-900 dark:text-gray-100">Swift & iOS</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-2.5 py-1.5">
              <span className="text-green-500 dark:text-[hsl(var(--terminal-green))] text-[10px]">✓</span>
              <span className="text-[10px] font-mono text-gray-900 dark:text-gray-100">Django</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-1.5 pb-4">
          <h3 className="text-[10px] font-mono text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-1.5">
            <span className="text-purple-600 dark:text-[hsl(var(--terminal-purple))]">{'// '}</span>
            Connect
          </h3>
          
          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 bg-white dark:bg-gray-800/50 rounded-xl px-2.5 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-cyan-500 dark:text-[hsl(var(--terminal-cyan))]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-[9px] font-mono text-gray-700 dark:text-gray-300 truncate">
              Email
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white dark:bg-gray-800/50 rounded-xl px-2.5 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-blue-600 dark:text-[hsl(var(--terminal-blue))]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            <span className="text-[9px] font-mono text-gray-700 dark:text-gray-300 truncate">
              LinkedIn
            </span>
          </a>

          {/* GitHub */}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white dark:bg-gray-800/50 rounded-xl px-2.5 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-purple-600 dark:text-[hsl(var(--terminal-purple))]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[9px] font-mono text-gray-700 dark:text-gray-300 truncate">
              GitHub
            </span>
          </a>
        </div>
      </div>
    </MobileScreen>
  );
}
