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

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your inquiries, provide
            the services you request, schedule consultations, and communicate with you
            about your projects. We do not sell your personal information to third
            parties.
          </p>

          <h2>Data Storage and Security</h2>
          <p>
            We take reasonable measures to protect your personal information from
            unauthorized access, use, or disclosure. Your information is stored securely
            and is only accessible by authorized personnel.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We use Cal.com for appointment scheduling. When you use our booking
            system, your information is processed according to Cal.com's privacy
            policy. We use email communication to respond to your inquiries.
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
