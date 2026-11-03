import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ArrowIcon } from "@/components/icons";

type PublicPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PublicPage({ eyebrow, title, description, children }: PublicPageProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main className="public-page" id="main-content">
        <section className="public-page__hero" aria-labelledby="page-title">
          <div className="page-shell public-page__hero-inner">
            <p className="eyebrow">{eyebrow}</p>
            <h1 id="page-title">{title}</h1>
            <p className="public-page__intro">{description}</p>
            <p className="public-page__tagline">Empowering Communities. Building Sustainable Futures.</p>
          </div>
        </section>
        <div className="page-shell public-page__content">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}

type ContentSectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function ContentSection({ id, eyebrow, title, description, children }: ContentSectionProps) {
  return (
    <section className="public-section" id={id} aria-labelledby={`${id}-title`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={`${id}-title`}>{title}</h2>
      {description ? <p className="public-section__description">{description}</p> : null}
      {children}
    </section>
  );
}

type InfoCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  tone?: "default" | "sage";
};

export function InfoCard({ eyebrow, title, description, href, linkLabel, tone = "default" }: InfoCardProps) {
  return (
    <article className={`info-card${tone === "sage" ? " info-card--sage" : ""}`}>
      {eyebrow ? <p className="info-card__eyebrow">{eyebrow}</p> : null}
      <h3>{title}</h3>
      <p className="info-card__description">{description}</p>
      {href && linkLabel ? <Link className="text-link" href={href}>{linkLabel}<ArrowIcon /></Link> : null}
    </article>
  );
}

export function PlaceholderNotice({ children }: { children: ReactNode }) {
  return <p className="placeholder-notice">{children}</p>;
}
