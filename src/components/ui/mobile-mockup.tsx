import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

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
            <FaLinkedin className="w-3.5 h-3.5 text-blue-600 dark:text-[hsl(var(--terminal-blue))]" />
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
            <FaGithub className="w-3.5 h-3.5 text-purple-600 dark:text-[hsl(var(--terminal-purple))]" />
            <span className="text-[9px] font-mono text-gray-700 dark:text-gray-300 truncate">
              GitHub
            </span>
          </a>
        </div>
      </div>
    </MobileScreen>
  );
}
