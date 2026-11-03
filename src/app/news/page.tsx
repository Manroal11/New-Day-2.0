import type { Metadata } from "next";
import { NewsCard } from "@/components/content-records";
import { ContentSection, PublicPage } from "@/components/public-page";
import { getPublicNews } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "News and Updates | New Day",
  description: "Read published news and updates from New Day.",
};

export default async function NewsPage() {
  const articles = await getPublicNews();

  return (
    <PublicPage
      eyebrow="News and updates"
      title="News from New Day."
      description="Read updates and stories as they are approved for publication. Draft and unpublished content is not shown publicly."
    >
      <ContentSection id="published-news" eyebrow="Latest updates" title="Stories and announcements." description="Only published articles are displayed here.">
        {articles.length > 0 ? (
          <div className="record-grid">
            {articles.map((article) => <NewsCard key={article.id} article={article} />)}
          </div>
        ) : (
          <div className="record-empty-state" role="status">
            <h3>No published updates yet</h3>
            <p>Approved news and updates will appear here when available. No draft or unpublished content is shown.</p>
          </div>
        )}
      </ContentSection>
    </PublicPage>
  );
}
