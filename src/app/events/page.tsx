import type { Metadata } from "next";
import { ContentSection, PublicPage } from "@/components/public-page";
import { EventCard } from "@/components/content-records";
import { getPublicEvents } from "@/lib/public-content";
import type { EventStatus } from "@/lib/content-types";

export const metadata: Metadata = {
  title: "Events | New Day",
  description: "See upcoming, ongoing, and completed New Day events as approved information becomes available.",
};

const eventCategories: readonly { status: EventStatus; title: string; description: string }[] = [
  { status: "upcoming", title: "Upcoming events", description: "Confirmed opportunities to gather and take part." },
  { status: "ongoing", title: "Ongoing events", description: "Events currently underway." },
  { status: "completed", title: "Completed events", description: "Activity summaries and galleries from completed events." },
];

export default async function EventsPage() {
  const events = await getPublicEvents();

  return (
    <PublicPage
      eyebrow="Events"
      title="Come together, learn, and take part."
      description="Find event details, participation information, and updates from New Day. Only approved and published events appear here."
    >
      {eventCategories.map((category) => {
        const categoryEvents = events.filter((event) => event.status === category.status);
        return (
          <ContentSection key={category.status} id={`${category.status}-events`} eyebrow={category.status} title={category.title} description={category.description}>
            {categoryEvents.length > 0 ? (
              <div className="record-grid">
                {categoryEvents.map((event) => <EventCard key={event.id} event={event} />)}
              </div>
            ) : (
              <div className="record-empty-state" role="status">
                <h3>No published {category.status} events</h3>
                <p>There are no approved {category.status} events to display right now. Confirmed event information will appear here when available.</p>
              </div>
            )}
          </ContentSection>
        );
      })}
    </PublicPage>
  );
}
