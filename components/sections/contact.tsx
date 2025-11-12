"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="max-w-3xl px-8 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-8">Get In Touch</h2>
        <p className="text-xl text-muted-foreground mb-12">
          Have a project in mind? Let&apos;s work together to create something
          amazing.
        </p>
        <div className="space-y-4">
          <a
            href="mailto:your.email@example.com"
            className="block text-2xl md:text-3xl font-medium hover:text-primary transition-colors"
          >
            your.email@example.com
          </a>
          <div className="flex gap-6 justify-center pt-8">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
