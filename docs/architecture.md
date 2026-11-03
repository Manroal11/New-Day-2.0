# New Day 2.0 — Planned Architecture

## Application foundation

The application uses the Next.js App Router. Public routes and future dashboard routes live under `src/app/`; reusable UI, data access, and domain logic can be organized in feature-oriented modules as those needs arrive. The `@/*` alias maps to `src/*`. Keep server-side credentials and privileged data operations out of browser code.

## Public website

The public site will provide these information areas:

- Homepage
- About
- Programs
- Projects
- Events
- News
- Impact
- Get Involved
- Contact

Published pages should be accessible, responsive, and search-friendly. Content pages should use shared layouts and reusable presentation components where that keeps the experience consistent.

## Private dashboard

The private management area is planned to include:

- Authentication and staff permissions
- Events publishing and past event records
- News and content management
- Projects and programs
- Volunteers
- Beneficiaries
- Donations and partnerships
- Impact reporting

Access must be permission-based. Authorization must be enforced by the server and data layer, not only by hiding dashboard controls in the interface.

## Events lifecycle

Administrators will be able to create and save drafts, publish upcoming events, edit information on published events, record completed events, and upload event galleries. The event record should support a clear status and lifecycle history so an event can move from draft to upcoming to completed without losing its public record. Image upload storage, allowed formats, file limits, and access policy will be defined alongside the later backend integration.

## Data and services

Supabase is the planned backend for authentication, relational data, and media storage. It is intentionally not configured in Phase 0. Before integration, define schemas, migrations, row-level security policies, staff roles, and environment variables. Never commit secrets. The public site should read only content that is intentionally published; dashboard mutations must validate user permissions on the server and in database policies.

## Deployment

Vercel is the planned hosting platform. Deployment, production environment variables, preview environments, and domain configuration are future work. No deployment has been made as part of project initialization.
