import Image from "next/image";
import Link from "next/link";
import type { ContentImage, EventRecord, EventStatus, NewsArticle } from "@/lib/content-types";
import { formatContentDate, formatContentDateRange } from "@/lib/format-content-date";

const eventStatusLabels: Record<EventStatus, string> = {
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  completed: "Completed",
};

function CoverMedia({ image, label }: { image: ContentImage | null; label: string }) {
  return image ? (
    <div className="record-cover">
      <Image src={image.src} alt={image.alt} fill unoptimized sizes="(max-width: 760px) 100vw, 50vw" />
    </div>
  ) : (
    <div className="record-cover record-cover--empty" role="img" aria-label={`${label} cover image not available`}>
      <span>Cover image not provided</span>
    </div>
  );
}

export function EventStatusBadge({ status }: { status: EventStatus }) {
  return <span className={`record-status record-status--${status}`}>{eventStatusLabels[status]}</span>;
}

export function EventCard({ event }: { event: EventRecord }) {
  return (
    <article className="record-card">
      <Link className="record-card__media-link" href={`/events/${event.slug}`} aria-label={`View event: ${event.title}`}>
        <CoverMedia image={event.coverImage} label="Event" />
      </Link>
      <div className="record-card__body">
        <div className="record-card__meta"><EventStatusBadge status={event.status} /><span>{formatContentDateRange(event.startDate, event.endDate)}</span></div>
        <h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3>
        {event.location ? <p className="record-card__location">{event.location}</p> : null}
        <p>{event.description}</p>
        {event.status === "completed" && event.activitySummary ? <p className="record-card__summary">{event.activitySummary}</p> : null}
        {event.participationInfo ? <p className="record-card__participation">{event.participationInfo}</p> : null}
        <Link className="text-link" href={`/events/${event.slug}`}>Event details <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="record-card">
      <Link className="record-card__media-link" href={`/news/${article.slug}`} aria-label={`Read article: ${article.title}`}>
        <CoverMedia image={article.coverImage} label="Article" />
      </Link>
      <div className="record-card__body">
        <div className="record-card__meta"><span>{formatContentDate(article.publicationDate)}</span>{article.author ? <span>{article.author}</span> : null}</div>
        <h3><Link href={`/news/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.summary}</p>
        <Link className="text-link" href={`/news/${article.slug}`}>Read update <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}

export function ContentGallery({ images, label }: { images: readonly ContentImage[]; label: string }) {
  if (images.length === 0) return null;

  return (
    <div className="content-gallery" role="group" aria-label={label}>
      {images.map((image) => (
        <figure key={`${image.src}-${image.alt}`}>
          <div className="content-gallery__image"><Image src={image.src} alt={image.alt} fill unoptimized sizes="(max-width: 760px) 100vw, 33vw" /></div>
          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}
