import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="subpage">
      <p className="eyebrow fade-up">Legal · Privacy</p>
      <h1 className="fade-up delay-1">
        Privacy <em>Policy</em>
      </h1>

      <section className="skills">
        <div className="legal-content">
          <h2>Information We Collect</h2>
          <p>
            At GQWebworks, we collect information you provide directly to us when you
            contact us through our website, including your name, email address, phone
            number, company name, and any messages you send. We also collect
            information when you schedule a consultation through our booking system.
          </p>
          <p>
            We also use Vercel Web Analytics to understand overall site traffic (pages
            visited, general location, device type). This is a cookieless, privacy-friendly
            analytics tool — it does not use tracking cookies and does not build an
            individual profile of you.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your inquiries, provide
            the services you request, schedule consultations, and communicate with you
            about your projects. We do not sell your personal information to third
            parties.
          </p>

          <h2>Data Storage and Security</h2>
          <p>
            Messages submitted through our contact form are stored in a secured
            database so we can review and respond to inquiries, and are only
            accessible to GQWebworks through a password-protected admin panel. We take
            reasonable measures to protect your personal information from unauthorized
            access, use, or disclosure, including encrypted connections and access
            controls on our systems.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We rely on a small number of service providers to run this site: Vercel
            (hosting and analytics), Resend (sending email), and a managed Redis
            database provider (storing contact form submissions and portfolio content).
            We use Cal.com for appointment scheduling — when you use our booking
            system, your information is processed according to Cal.com's privacy
            policy. Each of these providers processes data on our behalf and is
            subject to its own privacy policy.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information.
            To exercise these rights, please contact us at gqwebworks@gmail.com.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> gqwebworks@gmail.com
            <br />
            <strong>Location:</strong> Rio Grande Valley, Texas
          </p>

          <p className="legal-note">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>
    </main>
  );
}
