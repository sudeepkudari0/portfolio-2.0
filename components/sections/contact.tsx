"use client";

import Link from "next/link";

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
          <Link
            href="mailto:sudeepkudari0@gmail.com"
            className="block text-2xl md:text-3xl font-medium hover:text-primary transition-colors"
          >
            sudeepkudari0@gmail.com
          </Link>
          <div className="flex gap-6 justify-center pt-8">
            <Link
              href="https://github.com/sudeepkudari0"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/sudeep-kudari"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
