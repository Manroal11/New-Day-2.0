import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentGallery } from "@/components/content-records";
import { ContentSection, PublicPage } from "@/components/public-page";
import { formatContentDate } from "@/lib/format-content-date";
import { getPublicNewsBySlug } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "News article | New Day",
  description: "News and updates from New Day.",
};

export const instant = false;

type NewsArticlePageProps = { params: Promise<{ slug: string }> };

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = await getPublicNewsBySlug(slug);
  if (!article) notFound();

  const paragraphs = article.mainContent.split(/\n\s*\n/).filter(Boolean);

  return (
    <PublicPage eyebrow="News and updates" title={article.title} description={article.summary}>
      <article className="record-detail news-article">
        <div className="record-detail__meta">
          <time dateTime={article.publicationDate}>{formatContentDate(article.publicationDate)}</time>
          {article.author ? <span>By {article.author}</span> : null}
        </div>
        {article.coverImage ? (
          <div className="record-detail__cover">
            <Image src={article.coverImage.src} alt={article.coverImage.alt} fill unoptimized sizes="(max-width: 760px) 100vw, 1000px" />
          </div>
        ) : null}
        <div className="news-article__content">
          {paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>)}
        </div>
        {article.gallery?.length ? (
          <ContentSection id="article-gallery" eyebrow="Gallery" title="More from this story">
            <ContentGallery images={article.gallery} label="News article photo gallery" />
          </ContentSection>
        ) : null}
        <Link className="text-link" href="/news">Back to all news</Link>
      </article>
    </PublicPage>
  );
}
