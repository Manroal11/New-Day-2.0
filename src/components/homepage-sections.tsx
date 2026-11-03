import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ProgramCard } from "@/components/program-card";
import { SectionHeading } from "@/components/section-heading";

const programs = [
  {
    number: "01",
    title: "Education",
    description: "Learning opportunities and education initiatives. Program details to be confirmed.",
    icon: "learning" as const,
  },
  {
    number: "02",
    title: "Skills development",
    description: "Skills pathways and practical learning. Program details to be confirmed.",
    icon: "skills" as const,
  },
  {
    number: "03",
    title: "Entrepreneurship",
    description: "Ideas, enterprise, and opportunity. Program details to be confirmed.",
    icon: "enterprise" as const,
  },
  {
    number: "04",
    title: "Sustainable livelihoods",
    description: "Long-term wellbeing and livelihoods. Program details to be confirmed.",
    icon: "livelihoods" as const,
  },
];

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__inner page-shell">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow"><span className="eyebrow__spark" /> A brighter future starts together</p>
          <h1 id="hero-title">Empowering Communities.<br /><span>Building Sustainable Futures.</span></h1>
          <p className="hero__description">We believe the strongest futures are shaped when people have room to learn, lead, and create opportunity in their communities.</p>
          <div className="hero__actions">
            <Link className="button button--green" href="#programs">Explore our focus <ArrowIcon /></Link>
            <Link className="button button--outline" href="#about">Meet New Day</Link>
          </div>
          <p className="hero__note">A community-centered NGO · More about our work is coming soon</p>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art__glow" />
          <svg className="hero-art__illustration" viewBox="0 0 600 540" fill="none" role="presentation">
            <defs>
              <linearGradient id="sunrise-gradient" x1="300" y1="70" x2="300" y2="340" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ead8b3" />
                <stop offset="1" stopColor="#D7AD60" />
              </linearGradient>
              <linearGradient id="hill-gradient" x1="293" y1="275" x2="307" y2="520" gradientUnits="userSpaceOnUse">
                <stop stopColor="#84967A" />
                <stop offset="1" stopColor="#10283E" />
              </linearGradient>
              <filter id="soft-shadow" x="40" y="35" width="520" height="490" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="18" />
              </filter>
            </defs>
            <circle cx="315" cy="237" r="184" fill="#e9e2d3" fillOpacity=".62" />
            <circle cx="316" cy="215" r="118" fill="url(#sunrise-gradient)" />
            <circle cx="316" cy="215" r="145" stroke="#10283E" strokeOpacity=".15" />
            <circle cx="316" cy="215" r="169" stroke="#10283E" strokeOpacity=".11" strokeDasharray="2 9" />
            <path d="M65 352c63-69 125-103 187-103 47 0 84 17 119 54 32 34 72 52 121 52 19 0 36-2 51-7v160H65V352Z" fill="#dce2d5" />
            <path d="M49 397c68-77 136-115 204-115 56 0 101 23 140 68 37 43 81 65 131 65 10 0 20-.6 29-1.8V510H49V397Z" fill="url(#hill-gradient)" />
            <path d="M151 510c16-61 39-93 70-93 26 0 39 23 55 23s30-33 61-33c25 0 40 32 52 103H151Z" fill="#10283E" fillOpacity=".52" />
            <path d="M95 381c42-31 81-47 119-49m271 56c-42 3-75-7-101-27" stroke="white" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
            <circle cx="195" cy="345" r="19" fill="#10283E" />
            <path d="M160 411c5-33 18-50 37-50 20 0 33 17 39 50" fill="#F8F5EC" />
            <circle cx="278" cy="331" r="22" fill="#F8F5EC" />
            <path d="M238 413c5-38 18-57 40-57 23 0 36 19 41 57" fill="#d7ad60" />
            <circle cx="365" cy="344" r="18" fill="#10283E" />
            <path d="M331 410c5-32 16-48 34-48 19 0 30 16 35 48" fill="#dce2d5" />
            <path d="M127 448c15-8 31-11 48-8m215 21c24 9 47 12 72 8" stroke="#D7AD60" strokeWidth="3" strokeLinecap="round" strokeOpacity=".85" />
            <circle cx="448" cy="144" r="4" fill="#84967A" fillOpacity=".8" />
            <circle cx="183" cy="170" r="5" fill="#D7AD60" />
          </svg>
          <div className="hero-art__caption"><span className="hero-art__caption-mark">✳</span><span>People at the heart<br />of a brighter future</span></div>
          <span className="hero-art__side-note">HOPE · OPPORTUNITY · COMMUNITY</span>
        </div>
      </div>
      <div className="hero__bottom page-shell" aria-hidden="true"><span>01</span><span className="hero__bottom-rule" /><span>A new day begins here</span></div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="about-section section-pad" id="about" aria-labelledby="about-title">
      <div className="about-section__inner page-shell">
        <div className="about-section__stamp" aria-hidden="true"><span>ND</span><i /></div>
        <div className="about-section__copy">
          <SectionHeading id="about-title" eyebrow="A little about us" title="A future with more room to grow." />
          <p className="about-section__text">New Day is an NGO grounded in a simple belief: people should have the opportunity to shape a future they can be proud of.</p>
          <p className="about-section__placeholder">Our story, mission, and approach will be shared here when approved content is ready.</p>
          <Link className="text-link" href="#get-involved">Be part of what comes next <ArrowIcon /></Link>
        </div>
      </div>
    </section>
  );
}

export function ProgramsSection() {
  return (
    <section className="programs-section section-pad" id="programs" aria-labelledby="programs-title">
      <div className="page-shell">
        <div className="programs-section__heading">
          <SectionHeading
            id="programs-title"
            eyebrow="Pathways to possibility"
            title="Room to learn. Space to thrive."
            description="These are the areas New Day will introduce here. Program descriptions and current activities are being prepared for publication."
          />
          <span className="content-status"><span /> Program details to be confirmed</span>
        </div>
        <div className="program-grid">
          {programs.map((program) => <ProgramCard key={program.number} {...program} />)}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section className="projects-section section-pad" id="projects" aria-labelledby="projects-title">
      <div className="page-shell">
        <div className="projects-section__heading">
          <SectionHeading id="projects-title" eyebrow="Work in focus" title="Projects, rooted in possibility." description="Every community has its own strengths and aspirations. Approved project stories will have a home here." />
        </div>
        <div className="project-placeholder">
          <div className="project-placeholder__art" aria-hidden="true">
            <div className="project-placeholder__sun" />
            <div className="project-placeholder__horizon" />
            <div className="project-placeholder__stem project-placeholder__stem--one" />
            <div className="project-placeholder__stem project-placeholder__stem--two" />
            <div className="project-placeholder__leaf project-placeholder__leaf--one" />
            <div className="project-placeholder__leaf project-placeholder__leaf--two" />
            <div className="project-placeholder__leaf project-placeholder__leaf--three" />
            <div className="project-placeholder__leaf project-placeholder__leaf--four" />
            <span className="project-placeholder__art-label">A place for stories<br />of possibility</span>
          </div>
          <div className="project-placeholder__copy">
            <span className="content-status"><span /> Featured project</span>
            <h3>Stories of change are coming.</h3>
            <p>Project profiles, locations, and outcomes will be added when the information is confirmed and approved to share.</p>
            <span className="project-placeholder__note">Project information to be confirmed</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImpactSection() {
  return (
    <section className="impact-section section-pad" id="impact" aria-labelledby="impact-title">
      <div className="impact-section__inner page-shell">
        <div className="impact-section__orbit" aria-hidden="true">
          <span className="impact-section__orbit-ring impact-section__orbit-ring--outer" />
          <span className="impact-section__orbit-ring impact-section__orbit-ring--inner" />
          <span className="impact-section__orbit-sun" />
          <span className="impact-section__orbit-label">People<br />first</span>
          <span className="impact-section__orbit-dot" />
        </div>
        <div className="impact-section__copy">
          <SectionHeading id="impact-title" eyebrow="Impact, with intention" title="Progress deserves to be shared with care." />
          <p>We believe meaningful impact should be grounded in people’s experiences and supported by clear evidence.</p>
          <p className="impact-section__placeholder">Verified stories, outcomes, and reporting will appear here when they are ready to share. No figures are published until they are confirmed.</p>
          <Link className="text-link text-link--light" href="#contact">Ask us about our work <ArrowIcon /></Link>
        </div>
      </div>
    </section>
  );
}

export function EventsSection() {
  return (
    <section className="events-section section-pad" id="events" aria-labelledby="events-title">
      <div className="page-shell">
        <div className="events-section__heading">
          <SectionHeading id="events-title" eyebrow="Come together" title="Upcoming events" description="Gatherings and opportunities to connect will be listed here." />
          <span className="events-section__calendar" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><rect x="6.5" y="9.5" width="27" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M13 6.5v6m14-6v6M7 16h26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="m15.5 24 3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        </div>
        <div className="event-placeholder">
          <span className="event-placeholder__date" aria-hidden="true"><span>—</span><small>DATE</small></span>
          <div className="event-placeholder__copy">
            <span className="event-placeholder__label">No confirmed event listing yet</span>
            <h3>New gatherings will be announced here.</h3>
            <p>Event dates and details will appear once they have been confirmed.</p>
          </div>
          <Link className="event-placeholder__link" href="/events" aria-label="See all New Day events"><ArrowIcon /></Link>
        </div>
        <p className="events-section__updates-link">See <Link href="/events">all events</Link> or read <Link href="/news">news and updates</Link>.</p>
      </div>
    </section>
  );
}

export function GetInvolvedSection() {
  return (
    <section className="involved-section" id="get-involved" aria-labelledby="involved-title">
      <div className="involved-section__inner page-shell">
        <div className="involved-section__intro">
          <p className="eyebrow">Together, we can make room for more</p>
          <h2 id="involved-title">There’s a place for you in what comes next.</h2>
          <p>Volunteer and partnership opportunities will be shared here as they are confirmed. For now, you can let us know you’re interested.</p>
        </div>
        <div className="involved-actions">
          <Link className="involved-card" href="#contact">
            <span className="involved-card__index">01 / VOLUNTEER</span>
            <span className="involved-card__title">Bring your time and ideas</span>
            <span className="involved-card__arrow"><ArrowIcon /></span>
          </Link>
          <Link className="involved-card" href="#contact">
            <span className="involved-card__index">02 / PARTNER</span>
            <span className="involved-card__title">Build something meaningful</span>
            <span className="involved-card__arrow"><ArrowIcon /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
