import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  AboutSection,
  EventsSection,
  GetInvolvedSection,
  HeroSection,
  ImpactSection,
  ProgramsSection,
  ProjectsSection,
} from "@/components/homepage-sections";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <ProjectsSection />
        <ImpactSection />
        <EventsSection />
        <GetInvolvedSection />
      </main>
      <SiteFooter />
    </>
  );
}
