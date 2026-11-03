import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventStatusBadge, ContentGallery } from "@/components/content-records";
import { ContentSection, PublicPage } from "@/components/public-page";
import { formatContentDateRange } from "@/lib/format-content-date";
import { getPublicEventBySlug } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Event details | New Day",
  description: "Event information from New Day.",
};

export const instant = false;

type EventDetailPageProps = { params: Promise<{ slug: string }> };

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getPublicEventBySlug(slug);
  if (!event) notFound();

  return (
    <PublicPage eyebrow="Event details" title={event.title} description={event.description}>
      <article className="record-detail">
        <div className="record-detail__meta">
          <EventStatusBadge status={event.status} />
          <span>{formatContentDateRange(event.startDate, event.endDate)}</span>
          {event.location ? <span>{event.location}</span> : null}
        </div>
        {event.coverImage ? <div className="record-detail__cover"><Image src={event.coverImage.src} alt={event.coverImage.alt} fill unoptimized sizes="(max-width: 760px) 100vw, 1000px" /></div> : null}

        {event.status === "completed" && event.activitySummary ? (
          <ContentSection id="event-summary" eyebrow="Activity summary" title="A look back">
            <p className="record-detail__text">{event.activitySummary}</p>
          </ContentSection>
        ) : null}

        {event.participationInfo || event.registrationUrl ? (
          <ContentSection id="participation" eyebrow="Participation" title="Taking part">
            {event.participationInfo ? <p className="record-detail__text">{event.participationInfo}</p> : null}
            {event.registrationUrl ? <a className="button button--green record-detail__action" href={event.registrationUrl}>Registration information</a> : null}
          </ContentSection>
        ) : null}

        {event.status === "completed" ? (
          <ContentSection id="event-gallery" eyebrow="Gallery" title="Event gallery">
            {event.gallery.length > 0 ? <ContentGallery images={event.gallery} label="Completed event photo gallery" /> : <p className="record-detail__text">An approved photo gallery is not available for this event.</p>}
          </ContentSection>
        ) : event.gallery.length > 0 ? (
          <ContentSection id="event-gallery" eyebrow="Gallery" title="Event gallery"><ContentGallery images={event.gallery} label="Event photo gallery" /></ContentSection>
        ) : null}

        <Link className="text-link" href="/events">Back to all events</Link>
      </article>
    </PublicPage>
  );
}
