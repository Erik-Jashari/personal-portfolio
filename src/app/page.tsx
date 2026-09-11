import CinematicHero from "@/components/CinematicHero";
import CoffeeSection from "@/components/CoffeeSection";
import Reveal from "@/components/Reveal";

const PROJECTS = [
  {
    name: "Sports Tournament Management System",
    badge: "Team of 4 · University project · my role: backend & real-time features",
    description:
      "A full-stack platform for running sports tournaments end-to-end — team, player, and venue management, tournament scheduling, and role-based access for admins, organizers, and referees. I led the backend: the PostgreSQL/Prisma data layer, JWT authentication, real-time live match scoring over Socket.IO, automated match-status cron jobs, and the knockout bracket generation and advancement logic.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Socket.IO"],
    repoUrl: "https://github.com/Erik-Jashari/Sistem-per-Menaxhimin-e-Turneut-Sportiv",
  },
  {
    name: "School Management System",
    badge: "Team of 3 · University project · my role: auth, admin tools & backend",
    description:
      "A Moodle-style portal for a middle school — admins manage users, groups, lessons, and assignments, while students track grades, attendance, and submissions from a personal dashboard. I built the authentication, session, and role-management layer, the admin dashboard and assignment/messaging tools, and the relational MySQL schema behind it.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    repoUrl: "https://github.com/Erik-Jashari/School-Managment-System",
  },
];

const SKILLS = [
  { group: "Languages", items: ["PHP", "JavaScript", "Java"] },
  { group: "Frontend", items: ["HTML", "CSS", "React"] },
  { group: "Backend", items: ["Node.js", "Express.js"] },
  { group: "Databases", items: ["MySQL", "PostgreSQL"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code"] },
];

const EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "Bachelor of Computer Science and Engineering",
    org: "University for Business and Technology (UBT), Kosovo",
  },
  {
    period: "2024 — Present",
    role: "Barista & Waiter",
    org: "Local Café, Ferizaj",
  },
  {
    period: "2022 — 2024",
    role: "Full-Stack Development Training (Back-End & Front-End)",
    org: "Shkolla Digjitale",
  },
];

export default function Home() {
  return (
    <>
      <CinematicHero />

      <main className="relative bg-background">
        <Reveal>
          <section id="about" className="mx-auto max-w-5xl px-6 py-32">
            <div className="grid gap-12 sm:grid-cols-[minmax(0,380px)_1fr] sm:items-center sm:gap-16">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                {/* Swap this whole flex block for a portrait <Image fill /> when you have a photo — the surrounding card, border, and stats footer stay as-is. */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                  <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-accent/30">
                    <div className="absolute h-full w-full animate-pulse rounded-full border border-accent/10" />
                    <span className="font-display text-5xl text-white">
                      EJ
                    </span>
                  </div>
                  <div className="text-center text-xs uppercase tracking-[0.3em] text-muted">
                    <p>Backend &amp; full-stack</p>
                    <p className="mt-1 text-accent/80">Ferizaj, Kosovo</p>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 bg-black/30 text-center text-[10px] uppercase tracking-wide text-muted">
                  <div className="px-2 py-3">
                    <p className="text-white/60">Focus</p>
                    <p className="mt-1">Full-stack</p>
                  </div>
                  <div className="px-2 py-3">
                    <p className="text-white/60">Languages</p>
                    <p className="mt-1">AL &middot; EN</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-4xl text-white sm:text-5xl">
                  About
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Hi i'm Erik Jashari, a student of a cumputer science and engineering at the University for Business and Technology (UBT) in Kosovo. I really enjoy bulding things that live on the internet, whether that be websites, applications, or anything in between and i am pretty intersted in trying new technologies and approaches and not staying in my comfort zone. My goal is to become a proficient full-stack developer and contribute to meaningful projects that make a positive impact and make a difference.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-wide text-muted">
                  <a
                    href="https://github.com/Erik-Jashari"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/eriki-jashari-204752354/"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <CoffeeSection />
        </Reveal>

        <Reveal>
          <section id="projects" className="mx-auto max-w-5xl px-6 py-32">
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              Projects
            </h2>
            <div className="mt-12 flex flex-col gap-6">
              {PROJECTS.map((project) => (
                <div
                  key={project.name}
                  className="group rounded-2xl border border-white/10 p-8 transition-colors hover:border-accent/50"
                >
                  <h3 className="font-display text-2xl text-white sm:text-3xl">
                    {project.name}
                  </h3>
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
                    className="mt-6 inline-block rounded-full border border-accent px-5 py-2 text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-black"
                  >
                    Code
                  </a>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="skills" className="mx-auto max-w-5xl px-6 py-32">
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              Skills
            </h2>
            <div className="mt-10 flex flex-col gap-8">
              {SKILLS.map((group) => (
                <div key={group.group}>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent/80">
                    {group.group}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="font-display text-xl text-white/70 transition-colors hover:text-accent sm:text-2xl"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="experience" className="mx-auto max-w-3xl px-6 py-32">
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              Experience
            </h2>
            <ol className="mt-10 flex flex-col gap-8">
              {EXPERIENCE.map((item) => (
                <li
                  key={`${item.role}-${item.period}`}
                  className="flex flex-col gap-1 border-l border-white/10 pl-6 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <p className="text-lg text-white">{item.role}</p>
                    <p className="text-muted">{item.org}</p>
                  </div>
                  <span className="text-sm uppercase tracking-wide text-muted">
                    {item.period}
                  </span>
                </li>
              ))}
            </ol>
            <a
              href="/resume.pdf"
              className="mt-12 inline-block rounded-full border border-accent px-6 py-3 text-sm uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-black"
            >
              Download Resume
            </a>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="contact"
            className="mx-auto max-w-3xl px-6 py-32 text-center"
          >
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              Contact
            </h2>
            <p className="mt-6 text-lg text-muted">
              Open to opportunities &mdash; reach out.
            </p>
            <a
              href="mailto:erikjashari3@gmail.com"
              className="mt-6 inline-block font-display text-2xl text-white transition-colors hover:text-accent sm:text-3xl"
            >
              erikjashari3@gmail.com
            </a>
          </section>
        </Reveal>

        <footer className="border-t border-white/10 px-6 py-8 text-center text-xs uppercase tracking-widest text-muted">
          Built with Next.js, GSAP &amp; Lenis
        </footer>
      </main>
    </>
  );
}
