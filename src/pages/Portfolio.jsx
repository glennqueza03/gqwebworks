import { useEffect } from "react";
import Reveal from "../components/Reveal.jsx";

const demos = [
  {
    name: "JCBM",
    url: "https://jcbm-b9re.vercel.app/",
    description: "Professional business website",
    type: "Business presence",
    color: "#214845",
  },
  {
    name: "Law Firm Website",
    url: "https://law-firm-web-site.vercel.app/",
    description: "Legal practice website",
    type: "Professional services",
    color: "#33425b",
  },
  {
    name: "Law Firm Template",
    url: "https://lawfirmtemplatetest.vercel.app/",
    description: "Law firm template design",
    type: "Editorial template",
    color: "#74453b",
  },
  {
    name: "Coffee Shop",
    url: "https://coffeeshop-phi-black.vercel.app/",
    description: "Coffee business website",
    type: "Hospitality",
    color: "#a57945",
  },
  {
    name: "Construction Web",
    url: "https://construction-web-plum.vercel.app/",
    description: "Construction company site",
    type: "Trade services",
    color: "#3d4b42",
  },
];

const sideProjects = [
  {
    name: "Malware AI Detection",
    url: "https://malware-ai-detection.vercel.app/",
    description: "Malware identifier using machine learning algorithms to determine whether a link being entered is malicious or not",
    type: "Machine learning",
    color: "#e6e0d3",
  },
];

export default function Portfolio() {
  useEffect(() => {
    window.scrollTo(0, 0);
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

        <div className="portfolio-grid">
          {demos.map((demo, i) => (
            <Reveal key={demo.url} delay={i * 80}>
              <a
                href={demo.url}
                target="_blank"
                rel="noreferrer"
                className={`portfolio-card ${i === 0 ? "portfolio-card-featured" : ""}`}
              >
                <div className="browser-chrome" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <p>{new URL(demo.url).hostname}</p>
                </div>
                <div
                  className="portfolio-preview"
                  style={{ background: demo.color }}
                >
                  <iframe
                    className="portfolio-preview-frame"
                    src={demo.url}
                    title={`${demo.name} live website preview`}
                    loading="lazy"
                    tabIndex="-1"
                  />
                </div>
                <div className="portfolio-caption">
                  <div>
                    <span className="portfolio-type">{demo.type}</span>
                    <h3>{demo.name}</h3>
                    <p>{demo.description}</p>
                  </div>
                  <span className="portfolio-arrow" aria-hidden="true">↗</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

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
          {sideProjects.map((project, i) => (
            <Reveal key={project.url} delay={i * 80}>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="portfolio-card portfolio-card-featured"
              >
                <div className="browser-chrome" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <p>{new URL(project.url).hostname}</p>
                </div>
                <div
                  className="portfolio-preview"
                  style={{ background: project.color }}
                >
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
          ))}
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
