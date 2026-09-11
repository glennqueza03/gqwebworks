import { useState } from "react";
import Reveal from "../components/Reveal.jsx";

const pills = [
  { label: "PYTHON FOR DATA SCIENCE", rot: 5, x: 12, y: -6 },
  { label: "AUTOMATIONS", rot: 9, x: -8, y: -12 },
  { label: "WEB DEVELOPMENT", rot: 7, x: 16, y: 18 },
  { label: "DATA PIPELINES", rot: -5, x: -4, y: -18 },
  { label: "AI & DEVELOPMENT", rot: 6, x: 22, y: -10 },
  { label: "WEB APPLICATIONS", rot: -3, x: -12, y: 6 },
  { label: "BOOKING SYSTEMS", rot: 8, x: 18, y: -8 },
];

const services = [
  {
    title: "Web Development",
    subtitle: "Includes web redesign",
    description:
      "I build websites that look great and work perfectly on phones, tablets, and computers. Whether you need a brand new site or want to refresh your current one, I'll create something that helps your business grow.",
  },
  {
    title: "Web Application Development",
    description:
      "Need something more than a basic website? I create custom online tools and apps that solve specific problems for your business. From booking systems to customer portals, I build solutions that make your work easier.",
  },
  {
    title: "Automations",
    description:
      "I set up systems that handle repetitive tasks for you automatically. This saves you time and reduces mistakes, so you can focus on what matters most—running your business.",
  },
];

const columns = ["Speed", "Automation", "Local", "Quality", "No monthly fees"];

const rows = [
  { name: "GQWebworks", featured: true, marks: [true, true, true, true, true] },
  { name: "In-house team", marks: [false, false, true, true, false] },
  { name: "Creative agencies", marks: [false, false, false, true, false] },
  { name: "Generic templates", marks: [true, false, false, false, false] },
  { name: "Offshore freelancers", marks: [true, false, false, false, false] },
];

const faqs = [
  {
    q: "Who is behind GQWebworks?",
    a: "Glenn Quezada — a Computer Science graduate from UTRGV, based in the Rio Grande Valley. I build websites, automations, and data-driven tools for local businesses and teams that want something sharper than a template.",
  },
  {
    q: "What kind of work do you take on?",
    a: "Custom web builds, process automations, and applied data work. Recent live work includes the Cantu Construction site. If it needs to look considered and actually run in production, that’s the brief.",
  },
  {
    q: "Do you have formal training in data and AI?",
    a: "Yes. I hold an IBM certificate covering Python for Data Science, AI, and development, and I apply that stack to real workflows — not just coursework.",
  },
  {
    q: "Are you only taking Rio Grande Valley clients?",
    a: "The RGV is home, and I like building here. Remote work is welcome when the project is a fit.",
  },
  {
    q: "How do we start?",
    a: "Look through the latest project, then reach out from that page. We can talk through scope without a pitch deck or a 40-page proposal.",
  },
];

function Mark({ ok }) {
  return (
    <span className={ok ? "mark mark-yes" : "mark mark-no"} aria-hidden="true">
      {ok ? (
        <svg viewBox="0 0 16 16" width="12" height="12">
          <path
            d="M3.5 8.4 6.4 11.3 12.5 4.7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" width="10" height="10">
          <path
            d="M4 4 12 12M12 4 4 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}

export default function Home() {
  const [open, setOpen] = useState(0);
  const [activeTab, setActiveTab] = useState("message");

  return (
    <main>
      <section className="hero">
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit-ring" />
          <span className="orbit-dot" />
        </div>
        <div className="hero-profile fade-up">
          <img src="/images/portfoliopic.JPG" alt="Glenn Quezada" />
        </div>
        <p className="eyebrow fade-up delay-1">GQWebworks · Glenn Quezada</p>
        <h1 className="hero-title">
          <span className="line fade-up delay-2">Freelance Web Developer</span>
          <span className="line fade-up delay-3">
            <em>for your next project</em>
          </span>
        </h1>
        <p className="lede fade-up delay-4">
          I'm an independent web developer and data scientist working with
          businesses across the Rio Grande Valley and beyond. I build custom
          websites, automations, and data-driven tools: fast, production-ready
          solutions delivered on a fixed fee, with one developer accountable from
          first call to launch.
        </p>
        <div className="hero-actions fade-up delay-5">
          <button
            className="intro-call-button"
            style={{ background: "#fff", color: "var(--ink)" }}
            onClick={() => {
              setActiveTab("schedule");
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="cta-copy">
              <strong>Schedule A Consultation</strong>
              <small>Book a call with me</small>
            </div>
          </button>
          <button
            className="intro-call-button"
            style={{ background: "#fff", color: "var(--ink)" }}
            onClick={() => {
              setActiveTab("message");
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="cta-copy">
              <strong>Get A Quote</strong>
              <small>Send me a message</small>
            </div>
          </button>
        </div>
        <p className="whisper fade-up delay-6">
          First impressions are everything. Let's get yours right.
        </p>
      </section>

      <section className="skills">
        <div className="rule">
          <span className="rule-line" />
        </div>
        <Reveal>
          <h2>
            Building custom <em>web solutions</em> for the Rio Grande Valley
          </h2>
          <p className="lede tight">
            Sites, automations, and data tools — with a CS foundation and
            certificates that actually show up in the build.
          </p>
        </Reveal>
        <p className="section-kicker">What I work with</p>
        <div className="pill-cloud">
          {pills.map((p) => (
            <span
              key={p.label}
              className="skill-pill"
              style={{
                ["--rot"]: `${p.rot}deg`,
                ["--x"]: `${p.x}px`,
                ["--y"]: `${p.y}px`,
              }}
            >
              {p.label}
            </span>
          ))}
        </div>
        <div className="rule">
          <span className="rule-line" />
        </div>
      </section>

      <section className="services-section" id="services">
        <Reveal>
          <h2>
            Services <em>I provide</em>
          </h2>
          <p className="lede tight">
            As an independent expert with over a decade of experience, I offer
            tailored web design and development services that align with your
            business goals and deliver long-term value.
          </p>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 120}>
              <article className="service-card">
                <div className="service-icon" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3>{service.title}</h3>
                {service.subtitle && (
                  <p className="service-subtitle">{service.subtitle}</p>
                )}
                <p>{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="cta-row">
          <span className="arrows arrows-left" aria-hidden="true">
            → → →
          </span>
          <button
            className="intro-call-button"
            onClick={() => {
              setActiveTab("message");
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
      </section>

      <section className="process" id="process">
        <Reveal>
          <h2>
            Simple <em>process</em>, great results
          </h2>
        </Reveal>
        <div className="flow-chart">
          <div className="flow-row">
            <Reveal delay={0}>
              <div className="flow-step">
                <div className="flow-content">
                  <h3>Figure out your needs</h3>
                  <p>We discuss what your business actually needs</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="flow-step">
                <div className="flow-content">
                  <h3>Find your price point</h3>
                  <p>Transparent pricing for your budget</p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="flow-row">
            <Reveal delay={600}>
              <div className="flow-step">
                <div className="flow-content">
                  <h3>Collect your content</h3>
                  <p>Gather materials with my guidance</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={900}>
              <div className="flow-step">
                <div className="flow-content">
                  <h3>I build it</h3>
                  <p>1-2 week turnaround with clean code</p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="flow-row flow-row-center">
            <Reveal delay={1200}>
              <div className="flow-step">
                <div className="flow-content">
                  <h3>Site is live</h3>
                  <p>Your website launches and works for you</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="cta-row">
          <span className="arrows arrows-left" aria-hidden="true">
            → → →
          </span>
          <button
            className="intro-call-button"
            onClick={() => {
              setActiveTab("message");
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
      </section>

      <section className="compare">
        <Reveal>
          <h2>
            GQ vs <em>traditional</em> alternatives
          </h2>
        </Reveal>
        <Reveal>
          <div className="table-shell">
            <div className="table-head">
              <span className="table-spacer" />
              {columns.map((c) => (
                <span key={c} className="col-pill">
                  {c}
                </span>
              ))}
            </div>
            {rows.map((row) => (
              <div
                key={row.name}
                className={`table-row ${row.featured ? "is-featured" : ""}`}
              >
                <strong>{row.name}</strong>
                {row.marks.map((ok, i) => (
                  <Mark key={i} ok={ok} />
                ))}
              </div>
            ))}
          </div>
        </Reveal>
        <div className="cta-row">
          <span className="arrows arrows-left" aria-hidden="true">
            → → →
          </span>
          <button
            className="intro-call-button"
            onClick={() => {
              setActiveTab("message");
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
      </section>

      <section className="faq" id="faq">
        <Reveal>
          <h2>
            The <em>answers</em> to your questions
          </h2>
        </Reveal>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <button
              key={item.q}
              type="button"
              className={`faq-item ${open === i ? "is-open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span className="faq-q">
                {item.q}
                <span className="faq-icon">{open === i ? "–" : "+"}</span>
              </span>
              <span className="faq-a">{item.a}</span>
            </button>
          ))}
        </div>
        <Reveal>
          <div className="book-box">
            <div className="avatar-stack">
              <span className="stack-dot gq">GQ</span>
              <span className="stack-dot" />
              <span className="stack-dot alt" />
            </div>
            <h3>Ready to start your project?</h3>
            <div className="book-actions">
              <a className="book-btn" href="#contact">
                Contact me
              </a>
              <span className="book-note">
                Let's build something together
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="skills" id="contact">
        <Reveal>
          <h2>
            Start a <em>conversation</em>
          </h2>
          <p className="lede tight">
            Whether you're planning a full redesign, a new website build, or
            exploring a long-term partnership, I'd love to hear about your
            project.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="contact-section-wrapper">
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === "message" ? "active" : ""}`}
                onClick={() => setActiveTab("message")}
              >
                Send a Message
              </button>
              <button
                className={`tab-button ${activeTab === "schedule" ? "active" : ""}`}
                onClick={() => setActiveTab("schedule")}
              >
                Schedule a Consultation
              </button>
            </div>

            {activeTab === "message" && (
              <div className="contact-form-wrapper">
                <h3>Get a Quote</h3>
                <p className="form-subtitle">
                  Share your project details and I'll do my best to reply within 24
                  hours
                </p>
                <form
                  className="contact-form"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <div className="form-group">
                    <label htmlFor="project-type">
                      What are you looking to get done?
                    </label>
                    <select id="project-type" name="project-type">
                      <option value="">Select an option</option>
                      <option value="website">Website Development</option>
                      <option value="redesign">Website Redesign</option>
                      <option value="automation">Automation</option>
                      <option value="web-app">Web Application</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input type="text" id="company" name="company" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input type="tel" id="phone" name="phone" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={5} required />
                  </div>
                  <button type="submit" className="cta-dark">
                    Send Message
                  </button>
                </form>
              </div>
            )}

            {activeTab === "schedule" && (
              <div className="calendly-wrapper">
                <iframe
                  src="https://cal.com/glenn-quezada-1lysm3/gqwebworks-booking?embed=true"
                  className="booking-iframe"
                  title="Book a consultation"
                  frameBorder="0"
                  allow="clipboard-write"
                />
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <div className="rule">
        <span className="rule-line" />
      </div>

      <section className="skills">
        <Reveal>
          <h2>
            Or reach out <em>directly</em>
          </h2>
        </Reveal>
        <div className="about-grid">
          <Reveal delay={0}>
            <article className="about-card">
              <h3>Email</h3>
              <p>
                <a href="mailto:gqwebworks@gmail.com" className="contact-link">
                  gqwebworks@gmail.com
                </a>
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="about-card">
              <h3>Location</h3>
              <p>Rio Grande Valley, Texas</p>
            </article>
          </Reveal>
          <Reveal delay={160}>
            <article className="about-card">
              <h3>Response time</h3>
              <p>Within 24 hours</p>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
