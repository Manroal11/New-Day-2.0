import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ContentSection, InfoCard, PlaceholderNotice, PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Programs | New Day",
  description: "Explore New Day’s focus areas in learning, skills, entrepreneurship, livelihoods, and community development.",
};

const programs = [
  { id: "education", number: "01", title: "Education and learning", description: "Learning opportunities can support people to build knowledge, confidence, and choices. Approved program activities and eligibility details will be added when confirmed." },
  { id: "skills", number: "02", title: "Vocational and digital skills", description: "Practical vocational and digital skills can open pathways to participation and work. Specific training offers and schedules are not yet confirmed." },
  { id: "entrepreneurship", number: "03", title: "Entrepreneurship and economic empowerment", description: "Enterprise and economic opportunity can contribute to more resilient livelihoods. New Day’s approved program model will be described here when available." },
  { id: "agriculture", number: "04", title: "Agriculture and sustainable livelihoods", description: "Sustainable livelihoods are shaped by local knowledge, resources, and long-term wellbeing. Details of New Day’s activities are awaiting confirmation." },
  { id: "community-development", number: "05", title: "Community development", description: "Community development starts with people’s priorities and participation. Approved information about current activities will be published here when ready." },
];

export default function ProgramsPage() {
  return (
    <PublicPage
      eyebrow="Programs"
      title="Pathways to learn, contribute, and thrive."
      description="New Day’s areas of focus span learning, practical skills, economic opportunity, sustainable livelihoods, and community development."
    >
      <ContentSection id="program-areas" eyebrow="Areas of focus" title="Opportunities shaped around people." description="These focus areas set out the program information New Day plans to share. Published activities, locations, and participation details will be added after confirmation.">
        <div className="public-card-grid public-card-grid--two">
          {programs.map((program, index) => (
            <InfoCard
              key={program.id}
              eyebrow={program.number}
              title={program.title}
              description={program.description}
              href="/contact#contact-form-title"
              linkLabel="Ask about this focus area"
              tone={index === 1 || index === 3 ? "sage" : "default"}
            />
          ))}
        </div>
      </ContentSection>
      <PlaceholderNotice>Calls to action on this page lead to the contact page. The contact form is a preview and does not yet send messages.</PlaceholderNotice>
      <div className="page-cta">
        <div><p className="eyebrow">Interested in learning more?</p><h2>Start a conversation with New Day.</h2></div>
        <Link className="button button--green" href="/contact">Contact New Day <ArrowIcon /></Link>
      </div>
    </PublicPage>
  );
}
