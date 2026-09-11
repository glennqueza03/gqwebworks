import { useEffect } from "react";
import { Link } from "react-router-dom";
import IntroCallButton from "../components/IntroCallButton.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Web Development",
      subtitle: "Includes web redesign",
      description:
        "Crafting high-impact, fully responsive websites and landing pages, built from scratch or aligned with your brand guidelines. Designed to scale and perform.",
    },
    {
      title: "Web Application Development",
      description:
        "Detailed user flow mapping, wireframing, and UX audits that prioritize clarity, ease of use, and conversion. I help you turn visitors into customers through thoughtful experience design.",
    },
    {
      title: "Automations",
      description:
        "For established businesses that need more than just fixes, I provide strategic, long-term support, including enhancements, feature expansions, and performance improvements.",
    },
  ];

  return (
    <main className="subpage">
      <p className="eyebrow fade-up">Services · What I offer</p>
      <h1 className="fade-up delay-1">
        Services <em>I provide</em>
      </h1>

      <Reveal delay={80}>
        <p className="lede">
          As an independent expert with over a decade of experience, I offer
          tailored web design and development services that align with your
          business goals and deliver long-term value.
        </p>
      </Reveal>

      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 80}>
            <article className="service-card">
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
