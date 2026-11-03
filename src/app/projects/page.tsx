import type { Metadata } from "next";
import { ContentSection, PlaceholderNotice, PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Projects | New Day",
  description: "Explore New Day projects as approved project information becomes available.",
};

type ProjectRecord = {
  id: string;
  title: string;
  status: "planned" | "active" | "completed";
  location: string;
  description: string;
};

// Structured for future CMS records. No project records have been supplied for publication.
const projects: ProjectRecord[] = [];

function ProjectCard({ project }: { project: ProjectRecord }) {
  const statusLabel = { planned: "Planned", active: "In progress", completed: "Completed" }[project.status];
  return (
    <article className="project-record-card">
      <div className="project-record-card__meta"><span>{statusLabel}</span><span>{project.location}</span></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <PublicPage
      eyebrow="Projects"
      title="Community priorities, brought into focus."
      description="This is where New Day will share project profiles and updates once the information is confirmed and approved for publication."
    >
      <ContentSection id="featured-projects" eyebrow="Featured projects" title="Project stories will appear here." description="Each project record is designed to show its name, status, location, and description.">
        {projects.length > 0 ? (
          <div className="public-card-grid public-card-grid--two">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        ) : (
          <div className="project-empty-state" role="status">
            <span className="project-empty-state__symbol" aria-hidden="true">✳</span>
            <h3>No approved project profiles yet</h3>
            <p>Project titles, status, locations, and descriptions will be added here when confirmed. No project records are being presented as current work.</p>
          </div>
        )}
      </ContentSection>
      <PlaceholderNotice>Project listings are prepared to receive future CMS-managed records. There are no project records or achievements on this page yet.</PlaceholderNotice>
    </PublicPage>
  );
}
