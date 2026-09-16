import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

export default function About() {
  const [activeTab, setActiveTab] = useState("message");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="subpage">
      <p className="eyebrow fade-up">About · Glenn Quezada</p>
      <h1 className="fade-up delay-1">
        The person behind <em>GQWebworks</em>
      </h1>

      <section className="portrait-block">
        <Reveal>
          <figure className="portrait-frame">
            <div className="portrait-plate" />
            <img
              src="/images/portfoliopic.JPG"
              alt="Glenn Quezada, founder of GQWebworks"
            />
            <figcaption>Glenn Quezada</figcaption>
          </figure>
        </Reveal>
        <div className="portrait-copy">
          <Reveal delay={80}>
            <h2>
              Building from the <em>Rio Grande Valley</em>
            </h2>
            <p>
              I'm a Computer Science graduate from UTRGV, based in the Rio
              Grande Valley. GQWebworks is my practice — websites, automations,
              and applied data work for teams that need something sharper than
              a template. I'm local to the RGV, but I work with businesses
              anywhere — every project is handled remotely from first call to
              launch.
            </p>
            <p>
              I hold an IBM certificate in Python for Data Science, AI, and
              development, and I use that stack every day: pipelines, automations,
              and products that actually ship.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <ul className="cred-list">
              <li>
                <strong>B.S. Computer Science</strong>
                <span>UTRGV · University of Texas Rio Grande Valley</span>
              </li>
              <li>
                <strong>IBM Certificate</strong>
                <span>Python for Data Science, AI & Development</span>
              </li>
              <li>
                <strong>Specialization</strong>
                <span>Automations, Data Pipelines, Web Development</span>
              </li>
              <li>
                <strong>Location</strong>
                <span>Rio Grande Valley, Texas</span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={240}>
            <div className="hero-actions">
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
                  <strong>Contact me</strong>
                  <small>Let's build something together</small>
                </div>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="rule">
        <span className="rule-line" />
      </div>

      <section className="skills">
        <Reveal>
          <h2>
            What I bring to <em>every project</em>
          </h2>
        </Reveal>
        <div className="about-grid">
          <Reveal delay={0}>
            <article className="about-card">
              <h3>CS Foundation</h3>
              <p>
                Formal Computer Science education means I write code that's
                maintainable, scalable, and follows best practices — not just
                whatever works.
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="about-card">
              <h3>Data & AI</h3>
              <p>
                IBM-certified in Python for Data Science and AI. I build
                pipelines, automations, and intelligent systems that actually
                run in production.
              </p>
            </article>
          </Reveal>
          <Reveal delay={160}>
            <article className="about-card">
              <h3>Local Roots, Remote Reach</h3>
              <p>
                Based in the Rio Grande Valley, and open to businesses
                anywhere — every project runs remotely, so location is never a
                limit.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

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
            <strong>Contact me</strong>
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
