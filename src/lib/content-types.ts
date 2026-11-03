export type ContentPublicationStatus = "draft" | "published" | "archived";
export type ContentManagementAction = "create" | "edit" | "publish" | "unpublish" | "archive";

export type ContentImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type EventStatus = "upcoming" | "ongoing" | "completed";

export type EventRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
  status: EventStatus;
  publicationStatus: ContentPublicationStatus;
  coverImage: ContentImage | null;
  gallery: readonly ContentImage[];
  participationInfo: string | null;
  registrationUrl: string | null;
  activitySummary: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  publicationDate: string;
  summary: string;
  mainContent: string;
  coverImage: ContentImage | null;
  gallery?: readonly ContentImage[];
  author: string | null;
  publicationStatus: ContentPublicationStatus;
  createdAt: string;
  updatedAt: string;
};
