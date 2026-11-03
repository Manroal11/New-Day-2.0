import type { Metadata } from "next";
import { ContentSection, InfoCard, PlaceholderNotice, PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Our Impact | New Day",
  description: "Learn how New Day plans to approach responsible impact measurement and reporting.",
};

const impactAreas = [
  { title: "Education and learning", description: "Future reporting may include learning access and development, based on an approved measurement framework." },
  { title: "Skills and livelihoods", description: "Future reporting may describe skills development and livelihood pathways when reliable information is available." },
  { title: "Economic opportunity", description: "Future reporting may examine enterprise and economic participation using confirmed, appropriate measures." },
  { title: "Community development", description: "Future reporting may reflect community-defined priorities and participation with permission and care." },
];

export default function ImpactPage() {
  return (
    <PublicPage
      eyebrow="Impact"
      title="Progress deserves to be shared with care."
      description="New Day believes that impact information should be clear, grounded in evidence, and shared responsibly with the people it describes."
    >
      <ContentSection id="measuring-impact" eyebrow="Our approach" title="Measuring what matters, responsibly." description="New Day’s indicators and reporting approach have not yet been formally provided. Future reporting will be added when it can be supported by approved and verified information.">
        <div className="impact-principles">
          <p>We will make a clear distinction between aspirations, activities, and verified outcomes. Stories and data will only be presented when approved for public sharing.</p>
        </div>
      </ContentSection>
      <ContentSection id="impact-categories" eyebrow="Impact categories" title="Areas for future reporting." description="These categories reflect New Day’s stated program focus areas; they do not represent measured results.">
        <div className="public-card-grid public-card-grid--two">
          {impactAreas.map((area, index) => <InfoCard key={area.title} title={area.title} description={area.description} tone={index === 1 || index === 3 ? "sage" : "default"} />)}
        </div>
      </ContentSection>
      <ContentSection id="community-stories" eyebrow="Community stories" title="Stories, shared with consent." description="Personal experiences belong to the people who share them. New Day will only publish stories with appropriate permission and approved context.">
        <PlaceholderNotice>Community stories and testimonials have not been supplied for publication.</PlaceholderNotice>
      </ContentSection>
      <ContentSection id="impact-reports" eyebrow="Reporting" title="Future impact reports." description="Verified reporting will be added here when an approved reporting process and supporting information are available.">
        <PlaceholderNotice>No impact statistics, testimonials, or reports are currently published.</PlaceholderNotice>
      </ContentSection>
    </PublicPage>
  );
}
