import { workExperience } from "@/config/experience";
import { skills } from "@/config/skills";

export default function ExperiencePage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Work Experience</h1>
          <p className="text-lg text-muted-foreground">
            My professional journey in software development
          </p>
        </div>

        {/* Work Experience Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Professional Experience</h2>
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="sticky top-24">
                      <h3 className="text-xl font-semibold mb-2">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground mb-1">
                        {job.company}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.period}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="p-6 rounded-lg border bg-background">
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Core Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.core.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Senior Flutter Skills
              </h3>
              <div className="space-y-2">
                {skills.seniorFlutter.map((skill) => (
                  <div key={skill} className="text-sm text-muted-foreground">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Additional Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.additional.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded bg-muted text-muted-foreground text-sm"
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
