import type { EventRecord, NewsArticle } from "@/lib/content-types";

// Swap this empty in-memory source for Supabase or an admin-managed repository later.
const eventRecords: readonly EventRecord[] = [];
const newsRecords: readonly NewsArticle[] = [];

export async function getPublicEvents(): Promise<readonly EventRecord[]> {
  return eventRecords.filter((event) => event.publicationStatus === "published");
}

export async function getPublicEventBySlug(slug: string): Promise<EventRecord | null> {
  const events = await getPublicEvents();
  return events.find((event) => event.slug === slug) ?? null;
}

export async function getPublicNews(): Promise<readonly NewsArticle[]> {
  return newsRecords.filter((article) => article.publicationStatus === "published");
}

export async function getPublicNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const articles = await getPublicNews();
  return articles.find((article) => article.slug === slug) ?? null;
}
