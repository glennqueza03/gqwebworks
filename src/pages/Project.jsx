import IntroCallButton from "../components/IntroCallButton.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Project() {
  return (
    <main className="subpage project-page">
      <Reveal>
        <div className="project-intro">
          <p className="eyebrow">Work · Latest</p>
          <h1>
            Visit my <em>latest project</em>
          </h1>
          <p className="lede">
            Cantu Construction is live. A client site built through GQWebworks —
            the current example of how I treat type, structure, and production
            polish for a Valley business.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <a
          className="project-stage"
          href="https://cantuconstruction.com"
          target="_blank"
          rel="noreferrer"
        >
          <div className="browser-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>cantuconstruction.com</p>
          </div>
          <iframe
            className="project-preview-frame"
            src="https://cantuconstruction.com"
            title="Cantu Construction live website preview"
            loading="eager"
            tabIndex="-1"
          />
          <div className="project-stage-status">
            <span className="status-dot" /> Live site
            <span>Open in a new tab ↗</span>
          </div>
          <div className="project-stage-inner">
            <p className="project-kicker">Featured project</p>
            <h2>cantuconstruction.com</h2>
            <p>Production website for a long-standing Rio Grande Valley builder.</p>
          </div>
        </a>
      </Reveal>

      <div className="project-meta">
        <article>
          <h3>Client</h3>
          <p>Cantu Construction · McAllen, TX</p>
        </article>
        <article>
          <h3>What shipped</h3>
          <p>A production website for a long-standing RGV builder.</p>
        </article>
        <article>
          <h3>Role</h3>
          <p>GQWebworks — Glenn Quezada</p>
        </article>
      </div>

      <div className="cta-row">
        <span className="arrows arrows-left" aria-hidden="true">
          → → →
        </span>
        <IntroCallButton
          to="/#contact"
          title="Contact me"
          subtitle="Let's build something together"
        />
        <span className="arrows arrows-right" aria-hidden="true">
          ← ← ←
        </span>
      </div>
    </main>
  );
}
