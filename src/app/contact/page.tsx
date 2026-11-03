import type { Metadata } from "next";
import { ContentSection, InfoCard, PlaceholderNotice, PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Contact New Day | New Day",
  description: "Contact New Day. Contact details and message processing will be added when confirmed.",
};

export default function ContactPage() {
  return (
    <PublicPage
      eyebrow="Contact"
      title="We’d be glad to hear from you."
      description="New Day’s contact channels are being prepared. No contact details are published here until they have been confirmed."
    >
      <div className="contact-layout">
        <div>
          <ContentSection id="contact-details" eyebrow="Contact information" title="Details to be confirmed." description="Official contact information will be added here after it is approved for publication.">
            <div className="public-card-grid public-card-grid--one">
              <InfoCard title="Email" description="Official email address to be confirmed." />
              <InfoCard title="Phone" description="Official phone number to be confirmed." tone="sage" />
              <InfoCard title="Office" description="Office location and visiting information to be confirmed." />
            </div>
          </ContentSection>
          <ContentSection id="social-media" eyebrow="Social media" title="Find New Day online." description="Official social media links will be added once confirmed.">
            <PlaceholderNotice>Social media channels and profile links to be confirmed.</PlaceholderNotice>
          </ContentSection>
        </div>
        <section className="contact-form-card" aria-labelledby="contact-form-title">
          <p className="eyebrow">Send a message</p>
          <h2 id="contact-form-title">Contact form preview</h2>
          <form>
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" autoComplete="name" placeholder="Name" />

            <label htmlFor="contact-email">Email address</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="name@example.com" />

            <label htmlFor="contact-interest">What would you like to discuss?</label>
            <select id="contact-interest" name="interest" defaultValue="">
              <option value="" disabled>Select a topic</option>
              <option value="programs">Programs</option>
              <option value="volunteering">Volunteering</option>
              <option value="partnership">Partnership</option>
              <option value="other">Something else</option>
            </select>

            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows={5} placeholder="Your message" />

            <button className="button button--green" type="button" disabled>Message sending is not available yet</button>
            <p className="contact-form-card__note" role="status">This form is a preview. It does not send or store messages.</p>
          </form>
        </section>
      </div>
    </PublicPage>
  );
}
