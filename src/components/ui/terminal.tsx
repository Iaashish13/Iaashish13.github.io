"use client";

import { useState, useEffect } from "react";

interface TerminalProps {
  commands?: Array<{
    input: string;
    output: string | string[];
  }>;
  className?: string;
  animated?: boolean;
}

export function Terminal({
  commands = [],
  className = "",
  animated = false,
}: TerminalProps) {
  // Initialize visibleCommands based on animated prop to avoid SSR mismatch
  const [visibleCommands, setVisibleCommands] = useState<number>(() =>
    animated ? 0 : commands.length,
  );
  const [isTypingCommand, setIsTypingCommand] = useState(false);

  useEffect(() => {
    if (!animated) {
      // Ensure commands are visible even if commands array changes
      setVisibleCommands(commands.length);
      return;
    }

    if (visibleCommands < commands.length) {
      // Delay before showing next command (simulating thinking/processing time)
      const delay = visibleCommands === 0 ? 800 : 1500;
      const timeout = setTimeout(() => {
        setIsTypingCommand(true);
        // After command is "typed", show output
        setTimeout(() => {
          setIsTypingCommand(false);
          setVisibleCommands((prev) => prev + 1);
        }, 400);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [visibleCommands, commands.length, animated]);

  // For non-animated mode, render all commands directly (SSR-friendly)
  const commandsToShow = animated
    ? commands.slice(0, visibleCommands)
    : commands;

  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="text-xs text-muted-foreground ml-2">terminal</span>
      </div>
      <div className="terminal-body space-y-3">
        {commandsToShow.map((cmd, idx) => (
          <AnimatedCommand
            key={idx}
            command={cmd}
            animated={animated}
            delay={idx * 200}
          />
        ))}
        {isTypingCommand && visibleCommands < commands.length && (
          <div className="terminal-prompt">
            <span className="text-[hsl(var(--terminal-green))]">
              aashish@portfolio
            </span>
            <span className="text-muted-foreground">:</span>
            <span className="text-[hsl(var(--terminal-blue))]">~</span>
            <span className="text-foreground">
              {commands[visibleCommands].input}
            </span>
            <span className="inline-block w-2 h-4 bg-[hsl(var(--terminal-green))] ml-1 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

interface AnimatedCommandProps {
  command: {
    input: string;
    output: string | string[];
  };
  animated: boolean;
  delay: number;
}

function AnimatedCommand({ command, animated, delay }: AnimatedCommandProps) {
  const [showOutput, setShowOutput] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const timeout = setTimeout(() => {
        setShowOutput(true);
      }, delay + 1000);
      return () => clearTimeout(timeout);
    }
  }, [animated, delay]);

  return (
    <div className="space-y-1">
      <div className="terminal-prompt">
        <span className="text-[hsl(var(--terminal-green))]">
          aashish@portfolio
        </span>
        <span className="text-muted-foreground">:</span>
        <span className="text-[hsl(var(--terminal-blue))]">~</span>
        <span className="text-foreground">{command.input}</span>
      </div>
      {showOutput && (
        <>
          {Array.isArray(command.output) ? (
            command.output.map((line, i) => (
              <div
                key={i}
                className="text-muted-foreground pl-0 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {line}
              </div>
            ))
          ) : (
            <div className="text-muted-foreground animate-fade-in">
              {command.output}
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  delay = 50,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="inline-block w-2 h-5 bg-[hsl(var(--terminal-green))] ml-1 animate-pulse" />
      )}
    </span>
  );
}

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="code-block">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-border">
          <span className="text-[10px] font-mono text-[hsl(var(--terminal-cyan))]">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
          >
            {copied ? "✓ copied" : "copy"}
          </button>
        </div>
        <pre className="text-foreground overflow-x-auto">
          <code className="text-xs leading-relaxed">{code}</code>
        </pre>
      </div>
    </div>
  );
}
