import { useEffect, useState } from "react";
import Reveal from "../components/Reveal.jsx";

function ProjectCard({ project, index, featured }) {
  return (
    <Reveal delay={index * 80}>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className={`portfolio-card ${featured ? "portfolio-card-featured" : ""}`}
      >
        <div className="browser-chrome" aria-hidden="true">
          <span />
          <span />
          <span />
          <p>{new URL(project.url).hostname}</p>
        </div>
        <div className="portfolio-preview" style={{ background: project.color }}>
          <iframe
            className="portfolio-preview-frame"
            src={project.url}
            title={`${project.name} live website preview`}
            loading="lazy"
            tabIndex="-1"
          />
        </div>
        <div className="portfolio-caption">
          <div>
            <span className="portfolio-type">{project.type}</span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
          <span className="portfolio-arrow" aria-hidden="true">↗</span>
        </div>
      </a>
    </Reveal>
  );
}

export default function Portfolio() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("/api/portfolio")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Could not load the portfolio right now."));
  }, []);

  return (
    <main className="subpage">
      <p className="eyebrow fade-up">Portfolio · Work</p>
      <h1 className="fade-up delay-1">
        Demo <em>projects</em>
      </h1>

      <section className="skills">
        <Reveal>
          <h2>
            Live <em>demos</em>
          </h2>
          <p className="lede tight">
            Explore these live project demonstrations showcasing various web
            development capabilities.
          </p>
        </Reveal>

        {error && <p className="form-status form-status-error">{error}</p>}
        {!data && !error && <p className="admin-empty">Loading…</p>}

        {data && (
          <div className="portfolio-grid">
            {data.demos.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} featured={i === 0} />
            ))}
          </div>
        )}
      </section>

      {data && data.sideProjects.length > 0 && (
        <>
          <div className="rule">
            <span className="rule-line" />
          </div>

          <section className="skills">
            <Reveal>
              <h2>
                Side <em>projects</em>
              </h2>
              <p className="lede tight">
                Experimental projects exploring new technologies and solving unique
                problems.
              </p>
            </Reveal>

            <div className="portfolio-grid">
              {data.sideProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} featured />
              ))}
            </div>
          </section>
        </>
      )}

      <div className="cta-row">
        <span className="arrows arrows-left" aria-hidden="true">
          → → →
        </span>
        <button
          className="intro-call-button"
          onClick={() => {
            window.location.href = "/#contact";
            setTimeout(() => {
              window.dispatchEvent(new Event("hashchange"));
              if (window.location.hash === "#contact") {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          }}
        >
          <div className="cta-copy">
            <strong>Start your project</strong>
            <small>Let's build something together</small>
          </div>
        </button>
        <span className="arrows arrows-right" aria-hidden="true">
          ← ← ←
        </span>
      </div>
    </main>
  );
}
