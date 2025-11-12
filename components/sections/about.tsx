"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function About() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="max-w-4xl px-8">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 ">About Me</h2>

        <div className="space-y-6 text-lg md:text-xl ">
          {/* Introduction */}
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-semibold ">
              Hello, I&apos;m Sudeep Kudari
            </p>
            <p className="text-xl md:text-2xl text-zinc-700">
              Full Stack Engineer
            </p>
          </div>

          {/* Main content */}
          <p className="leading-relaxed">
            I specialize in building scalable solutions with{" "}
            <span className=" font-medium">Java</span>,{" "}
            <span className=" font-medium">TypeScript</span>, and modern web
            technologies. My passion lies in transforming complex challenges
            into elegant, user-friendly applications that make a real impact.
          </p>

          <p className="leading-relaxed">
            As an <span className=" font-medium">ISE&apos;23</span> graduate,
            I&apos;m constantly pushing the boundaries of what&apos;s possible
            with technology. Currently, I&apos;m exploring{" "}
            <span className=" font-medium">Kubernetes</span>,{" "}
            <span className=" font-medium">Go</span>, and{" "}
            <span className=" font-medium">GraphQL</span> to expand my skill set
            and stay at the forefront of modern development practices.
          </p>

          <p className="leading-relaxed hidden md:block">
            My journey in tech has been driven by curiosity, a love for
            problem-solving, and a commitment to writing clean, maintainable
            code that stands the test of time.
          </p>

          {/* Social links */}
          <div className="pt-6">
            <p className="text-base text-zinc-400 mb-4">Let&apos;s connect:</p>
            <div className="flex gap-4 items-center flex-wrap">
              <a
                href="https://github.com/sudeepkudari0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2  hover: transition-colors group"
              >
                <Github className="w-5 h-5" />
                <span className="text-base group-hover:underline">GitHub</span>
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="https://www.linkedin.com/in/sudeep-kudari-1916aa27a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2  hover: transition-colors group"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-base group-hover:underline">
                  LinkedIn
                </span>
              </a>
              <span className="text-zinc-700">•</span>
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2  hover: transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span className="text-base group-hover:underline">Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
