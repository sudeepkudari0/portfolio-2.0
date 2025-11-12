"use client";

export default function Work() {
  const projects = [
    {
      title: "Project One",
      description: "A revolutionary web application",
      tags: ["React", "Next.js", "TypeScript"],
    },
    {
      title: "Project Two",
      description: "An innovative mobile experience",
      tags: ["React Native", "Node.js", "MongoDB"],
    },
    {
      title: "Project Three",
      description: "A cutting-edge SaaS platform",
      tags: ["Vue.js", "Python", "PostgreSQL"],
    },
    {
      title: "Project Four",
      description: "Automation and infrastructure tooling",
      tags: ["Go", "Docker", "Kubernetes"],
    },
    {
      title: "Project Five",
      description: "Real-time collaboration features",
      tags: ["WebSockets", "Redis", "Postgres"],
    },
  ];

  return (
    <section
      id="work"
      className="py-24 bg-[linear-gradient(180deg,#143975_0%,#070e18_50%,#000000_100%)]"
    >
      <div className="max-w-6xl px-8 mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold">Featured Work</h2>
      </div>
      <div className="mt-10">
        <div className="no-scrollbar overflow-x-auto">
          <div className="flex gap-6 snap-x snap-mandatory px-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="snap-start shrink-0 w-[85vw] sm:w-[65vw] md:w-[50vw] lg:w-[36rem] border border-border rounded-2xl p-6 hover:bg-accent transition-colors cursor-pointer bg-card/50"
              >
                <div className="aspect-video bg-muted rounded-lg mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
