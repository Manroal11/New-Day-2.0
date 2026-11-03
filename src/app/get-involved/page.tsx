import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ContentSection, InfoCard, PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Get Involved | New Day",
  description: "Find ways to explore volunteering, partnership, support, and community participation with New Day.",
};

const opportunities = [
  { id: "volunteer", number: "01", title: "Volunteer", description: "Bring your time, experience, and ideas. New Day’s volunteer roles and participation process will be shared once confirmed." },
  { id: "partner", number: "02", title: "Partner with us", description: "Explore opportunities to work alongside New Day. Partnership criteria and current opportunities are not yet available." },
  { id: "support", number: "03", title: "Support our work", description: "Learn how to support New Day’s work as details are confirmed. No donation mechanism is currently available through this website." },
  { id: "participate", number: "04", title: "Community participation", description: "Community priorities and participation matter. Information about ways to take part will be published when arrangements are confirmed." },
];

export default function GetInvolvedPage() {
  return (
    <PublicPage
      eyebrow="Get involved"
      title="There’s a place for you in what comes next."
      description="Community empowerment grows through people’s ideas, participation, and shared effort. Explore ways to connect with New Day."
    >
      <ContentSection id="opportunities" eyebrow="Ways to connect" title="Start with a conversation." description="Current opportunities are being prepared. Contact New Day to express your interest; the contact form is a preview and does not yet send messages.">
        <div className="public-card-grid public-card-grid--two">
          {opportunities.map((item, index) => (
            <InfoCard key={item.id} eyebrow={item.number} title={item.title} description={item.description} href="/contact#contact-form-title" linkLabel="Express your interest" tone={index === 1 || index === 2 ? "sage" : "default"} />
          ))}
        </div>
      </ContentSection>
      <div className="page-cta">
        <div><p className="eyebrow">Connect with New Day</p><h2>Tell us what you’re interested in.</h2></div>
        <Link className="button button--green" href="/contact">Go to contact page <ArrowIcon /></Link>
      </div>
    </PublicPage>
  );
}
