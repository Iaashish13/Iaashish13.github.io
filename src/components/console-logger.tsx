"use client";

import { useEffect } from "react";

export function ConsoleLogger() {
  useEffect(() => {
    // Clear console for dramatic effect
    console.clear();

    // ASCII art banner
    const banner = `
   ___              __    _      __  
  / _ | ___ ___ _ / _   (_)_ __/ /  
 / __ |/ _ \`/ _ \`(_-< / _\ (_-/ _ \\ 
/_/ |_|\_,_/\_, /___/_/ |_/___/_//_/ 
           /___/                     
`;

    console.log(
      "%c" + banner,
      "color: #10b981; font-family: monospace; font-weight: bold;"
    );

    console.log(
      "%c👋 Welcome, fellow developer!",
      "color: #10b981; font-size: 16px; font-weight: bold; font-family: monospace;"
    );

    console.log(
      "%c💻 Curious about how this site was built?",
      "color: #06b6d4; font-size: 14px; font-family: monospace;"
    );

    console.log(
      "%c🔍 Check out the source code:",
      "color: #f59e0b; font-size: 14px; font-family: monospace;"
    );

    console.log(
      "%chttps://github.com/Iaashish13/Iaashish13.github.io",
      "color: #3b82f6; font-size: 14px; font-family: monospace; text-decoration: underline;"
    );

    console.log("\n");

    // Developer info object
    const devInfo = {
      name: "Aashish Regmi",
      role: "Senior Flutter Developer",
      tech_stack: [
        "Flutter",
        "React",
        "Next.js",
        "TypeScript",
        "Firebase",
        "Supabase",
      ],
      contact: "https://github.com/Iaashish13",
      message: "Always learning, always building! 🚀",
    };

    console.log(
      "%cconst developer = ",
      "color: #a855f7; font-family: monospace;"
    );
    console.log(devInfo);

    console.log("\n");

    console.log(
      "%c💡 Pro tip: Try pressing Cmd/Ctrl + K for a surprise!",
      "color: #10b981; font-size: 12px; font-style: italic; font-family: monospace;"
    );

    console.log(
      "%c⚡ Built with Next.js 15, TypeScript, and Tailwind CSS",
      "color: #6b7280; font-size: 11px; font-family: monospace;"
    );

    console.log("\n");
  }, []);

  return null;
}
