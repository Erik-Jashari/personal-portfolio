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
  "PHP",
  "JavaScript",
  "Java",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Express.js",
  "MySQL",
  "PostgreSQL",
  "Git",
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
          <section id="about" className="mx-auto max-w-3xl px-6 py-32">
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              About
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Placeholder bio. A few sentences on who you are, what you build,
              and what you care about &mdash; swap this in for real copy and a
              portrait image.
            </p>
          </section>
        </Reveal>

        <CoffeeSection />

        <Reveal>
          <section id="work" className="mx-auto max-w-5xl px-6 py-32">
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
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="font-display text-xl text-white/70 transition-colors hover:text-accent sm:text-2xl"
                >
                  {skill}
                </span>
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
