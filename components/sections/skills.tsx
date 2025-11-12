"use client";

export default function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
    },
    {
      category: "Tools",
      skills: ["Git", "Docker", "Figma", "VS Code", "Vercel"],
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-5xl px-8">
        <h2 className="text-5xl md:text-7xl font-bold mb-12">Skills & Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold mb-6">
                {category.category}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
