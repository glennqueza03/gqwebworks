import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="subpage">
      <p className="eyebrow fade-up">Legal · Terms</p>
      <h1 className="fade-up delay-1">
        Terms of <em>Service</em>
      </h1>

      <section className="skills">
        <div className="legal-content">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using GQWebworks website, you accept and agree to be bound
            by the terms and provisions of this agreement. If you do not agree to abide
            by these terms, please do not use this service.
          </p>

          <h2>Services</h2>
          <p>
            GQWebworks provides web development, automation, and data science
            services. Specific project scope, timelines, and pricing will be agreed
            upon in writing before work begins. We reserve the right to modify or
            discontinue services at any time.
          </p>

          <h2>Client Responsibilities</h2>
          <p>
            Clients agree to provide accurate information, timely feedback, and
            necessary materials (content, images, assets) required to complete the
            project. Delays in providing materials may extend project timelines.
          </p>

          <h2>Payment Terms</h2>
          <p>
            Payment terms will be outlined in each project agreement. Typically, a
            deposit is required before work begins, with final payment due upon
            project completion. All payments are non-refundable unless otherwise
            specified in writing.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            Upon full payment, clients receive ownership of the final deliverables
            (website code, designs, etc.). GQWebworks retains the right to showcase
            completed work in our portfolio. Any third-party assets (fonts, stock
            images, libraries) remain subject to their respective licenses.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            GQWebworks shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of our services.
            Our total liability is limited to the amount paid for the specific
            services in question.
          </p>

          <h2>Termination</h2>
          <p>
            Either party may terminate the agreement with written notice. If the
            client terminates, payment for work completed up to that point is due.
            If GQWebworks terminates, a refund for uncompleted work will be provided.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of
            our services after changes constitutes acceptance of the new terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact:
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
