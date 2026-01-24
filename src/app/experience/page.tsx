import { Briefcase, Code2, Calendar, Rocket } from "lucide-react";
import { workExperience } from "@/config/experience";
import { skills } from "@/config/skills";
import { personalProjects } from "@/config/projects";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-6 w-6 text-[hsl(var(--terminal-green))]" />
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
              experience.json
            </h1>
          </div>
          <p className="text-sm font-mono text-muted-foreground">
            <span className="text-[hsl(var(--terminal-blue))]">{'// My professional journey in software development'}</span>
          </p>
        </div>

        {/* Work Experience Timeline */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Calendar className="h-5 w-5 text-[hsl(var(--terminal-cyan))]" />
            <h2 className="text-xl font-bold font-mono">work_history/</h2>
          </div>
          <div className="space-y-6">
            {workExperience.map((job, index) => (
              <div key={index} className="code-block border-l-2 border-[hsl(var(--terminal-green))]">
                <div className="space-y-3">
                  {/* Job Header */}
                  <div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-bold font-mono text-foreground">
                        {job.title}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground whitespace-nowrap sm:ml-4">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-[hsl(var(--terminal-blue))]">
                      @ {job.company}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>

                  {/* Technologies */}
                  <div>
                    <div className="text-xs font-mono text-muted-foreground mb-2">
                      {/* Tech Stack */}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded bg-muted border border-border text-xs font-mono text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Projects Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Rocket className="h-5 w-5 text-[hsl(var(--terminal-cyan))]" />
            <h2 className="text-xl font-bold font-mono">personal_projects/</h2>
          </div>
          <div className="space-y-6">
            {personalProjects.map((project, index) => (
              <div key={index} className="code-block border-l-2 border-[hsl(var(--terminal-cyan))]">
                <div className="space-y-3">
                  {/* Project Header */}
                  <div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-bold font-mono text-foreground">
                        {project.name}
                      </h3>
                      {project.downloads && (
                        <span className="text-xs font-mono text-[hsl(var(--terminal-green))] whitespace-nowrap sm:ml-4">
                          {project.downloads} downloads
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Links */}
                  {(project.link || project.playStore || project.appStore) && (
                    <div className="flex flex-wrap gap-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded bg-[hsl(var(--terminal-cyan))]/10 border border-[hsl(var(--terminal-cyan))]/20 text-[hsl(var(--terminal-cyan))] text-xs font-mono hover:bg-[hsl(var(--terminal-cyan))]/20 transition-colors"
                        >
                          View Project
                        </a>
                      )}
                      {project.playStore && (
                        <a
                          href={project.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded bg-[hsl(var(--terminal-cyan))]/10 border border-[hsl(var(--terminal-cyan))]/20 text-[hsl(var(--terminal-cyan))] text-xs font-mono hover:bg-[hsl(var(--terminal-cyan))]/20 transition-colors"
                        >
                          Play Store
                        </a>
                      )}
                      {project.appStore && (
                        <a
                          href={project.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded bg-[hsl(var(--terminal-cyan))]/10 border border-[hsl(var(--terminal-cyan))]/20 text-[hsl(var(--terminal-cyan))] text-xs font-mono hover:bg-[hsl(var(--terminal-cyan))]/20 transition-colors"
                        >
                          App Store
                        </a>
                      )}
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded bg-muted border border-border text-xs font-mono text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Code2 className="h-5 w-5 text-[hsl(var(--terminal-green))]" />
            <h2 className="text-xl font-bold font-mono">skills.json</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Core Technologies */}
            <div className="code-block">
              <div className="text-xs text-muted-foreground mb-3 font-mono">
                {/* Core Technologies */}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.core.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded bg-[hsl(var(--terminal-green))]/10 border border-[hsl(var(--terminal-green))]/20 text-[hsl(var(--terminal-green))] text-xs font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Senior Flutter Skills */}
            <div className="code-block">
              <div className="text-xs text-muted-foreground mb-3 font-mono">
                {/* Senior Flutter Skills */}
              </div>
              <div className="space-y-2">
                {skills.seniorFlutter.map((skill, idx) => (
                  <div key={skill} className="flex items-start gap-2 font-mono text-sm">
                    <span className="text-[hsl(var(--terminal-purple))]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Skills */}
            <div className="code-block md:col-span-2">
              <div className="text-xs text-muted-foreground mb-3 font-mono">
                {/* Additional Skills */}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.additional.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded bg-secondary border border-border text-muted-foreground text-xs font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
