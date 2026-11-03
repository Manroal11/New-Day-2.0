import type { Metadata } from "next";
import { ContentSection, InfoCard, PlaceholderNotice, PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "About New Day | New Day",
  description: "Learn about New Day and our community-centered approach to sustainable empowerment.",
};

const values = [
  { title: "Our values are being confirmed", description: "New Day’s approved core values will be published here once the organization has confirmed the wording." },
];

export default function AboutPage() {
  return (
    <PublicPage
      eyebrow="About New Day"
      title="People and communities shaping a sustainable future."
      description="New Day is an NGO with a focus on community empowerment and sustainable development."
    >
      <ContentSection id="who-we-are" eyebrow="Who we are" title="Opportunity grows when people can shape it." description="New Day is building a public home for its story and work. Approved organizational details will be added as they are confirmed.">
        <p className="public-copy">We believe communities hold knowledge, strengths, and aspirations that can help shape a better future. This website will share New Day’s work as information is reviewed and approved.</p>
      </ContentSection>

      <div className="public-card-grid public-card-grid--two">
        <InfoCard eyebrow="Our vision" title="Official vision statement" description="New Day’s formal vision statement has not yet been provided for publication." />
        <InfoCard eyebrow="Our mission" title="Official mission statement" description="New Day’s formal mission statement has not yet been provided for publication." tone="sage" />
      </div>

      <ContentSection id="core-values" eyebrow="Our core values" title="Guided by values we can stand behind.">
        <div className="public-card-grid public-card-grid--one">
          {values.map((value) => <InfoCard key={value.title} title={value.title} description={value.description} />)}
        </div>
      </ContentSection>

      <ContentSection id="sustainable-empowerment" eyebrow="Our approach" title="Sustainable community empowerment takes time." description="We see lasting progress as work shaped with communities and grounded in their priorities.">
        <div className="public-card-grid public-card-grid--three">
          <InfoCard eyebrow="01" title="Listen first" description="Understand the context, experience, and priorities of the people closest to an issue." />
          <InfoCard eyebrow="02" title="Build together" description="Make space for community participation in shaping relevant, practical opportunities." tone="sage" />
          <InfoCard eyebrow="03" title="Think long term" description="Keep sustainability, learning, and local capacity in view as work develops." />
        </div>
        <PlaceholderNotice>These principles describe New Day’s developing public approach; formal statements will be added when approved.</PlaceholderNotice>
      </ContentSection>
    </PublicPage>
  );
}
