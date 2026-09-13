"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import ProjectGallery, { type ProjectGalleryHandle } from "./ProjectGallery";

type Project = {
  name: string;
  badge: string;
  description: string;
  tags: string[];
  repoUrl: string;
  images?: string[];
};

export default function ProjectsSection({
  projects,
}: {
  projects: Project[];
}) {
  const galleryRefs = useRef<Record<string, ProjectGalleryHandle | null>>({});

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-32">
      <h2 className="font-display text-4xl text-white sm:text-5xl">
        Projects
      </h2>
      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project) => {
          const hasImages = !!project.images?.length;

          return (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              whileTap={hasImages ? { scale: 0.985 } : undefined}
              role={hasImages ? "button" : undefined}
              tabIndex={hasImages ? 0 : undefined}
              onClick={() => {
                if (hasImages) galleryRefs.current[project.name]?.open();
              }}
              onKeyDown={(e) => {
                if (hasImages && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  galleryRefs.current[project.name]?.open();
                }
              }}
              className={`group rounded-2xl border border-white/10 p-8 transition-colors hover:border-accent/50 ${
                hasImages ? "cursor-pointer" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <h3 className="font-display text-2xl text-white sm:text-3xl">
                  {project.name}
                </h3>
                {hasImages && (
                  <span className="mt-1 shrink-0 rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-widest text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                    View Screenshots
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs uppercase tracking-wide text-accent/80">
                {project.badge}
              </p>
              <p className="mt-4 max-w-2xl text-muted">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-6 inline-block rounded-full border border-accent px-5 py-2 text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-black"
              >
                Code
              </a>

              {hasImages && (
                <ProjectGallery
                  ref={(el) => {
                    galleryRefs.current[project.name] = el;
                  }}
                  projectName={project.name}
                  images={project.images!}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
