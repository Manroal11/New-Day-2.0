# New Day 2.0 — Development Phases

This document is the initial delivery sequence. Each phase should be reviewed before moving into the next phase.

## Phase 0 — Project initialization

- Initialize Next.js App Router, TypeScript, Tailwind CSS, and ESLint with npm.
- Establish the `src/` structure and `@/*` import alias.
- Add the New Day brand foundation and responsive under-development homepage.
- Document product scope, planned architecture, and the delivery phases.
- Verify lint, TypeScript, production build, and development-server startup.

## Phase 1 — Product and experience foundation

- Confirm sitemap, content model, user roles, and priority workflows.
- Define the public-site visual system and shared navigation, footer, and page layouts.
- Define the dashboard information architecture and permission matrix.
- Prepare accessible page patterns and content authoring requirements.

## Phase 2 — Backend foundation

- Create the approved Supabase project and environment configuration.
- Design and migrate schemas for content, events, programs, projects, people, and reporting.
- Add authentication, staff roles, server-side authorization, and row-level security.
- Configure storage policies for approved media and event galleries.

## Phase 3 — Public website

- Build the homepage and About, Programs, Projects, Events, News, Impact, Get Involved, and Contact pages.
- Connect public pages to approved published content.
- Add metadata, accessibility checks, responsive refinements, and content states.

## Phase 4 — Private dashboard

- Deliver authentication and staff permission management.
- Build event drafts, upcoming publication, published edits, completed event records, and gallery uploads.
- Add news and content management, programs and projects, volunteers, beneficiaries, donations, partnerships, and impact reporting.
- Apply authorization checks to every read and mutation.

## Phase 5 — Readiness and launch

- Review content, accessibility, security, and operational requirements.
- Configure production environment variables and Vercel project settings.
- Run agreed release checks, deploy only after approval, and verify the live site.

**Phase gate:** Do not begin Phase 1 until the Phase 0 result has been reviewed and approved.
