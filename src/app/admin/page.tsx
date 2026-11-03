import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import { getPasswordFlowAccess } from "@/lib/supabase/password-flow";
import { getStaffAccess } from "@/lib/supabase/staff";

export const metadata: Metadata = {
  title: "Dashboard | New Day",
  description: "New Day staff administration dashboard.",
};

const modules = [
  { title: "Events", description: "Create, publish, and record community events." },
  { title: "News", description: "Manage organizational news and updates." },
  { title: "Projects", description: "Maintain project and program information." },
];

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <AdminDashboardContent />
    </Suspense>
  );
}

async function AdminDashboardContent() {
  const access = await getStaffAccess();

  if (access.status === "anonymous") {
    redirect("/admin/login");
  }

  if (access.status === "unauthorized") {
    redirect("/admin/login?error=unauthorized");
  }

  if (access.status === "setup-required") {
    const passwordFlow = await getPasswordFlowAccess();
    redirect(passwordFlow ? "/admin/reset-password" : "/admin/forgot-password");
  }

  if (access.status === "unavailable") {
    redirect("/admin/login?error=unavailable");
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard__header">
        <Link className="admin-dashboard__brand" href="/" aria-label="New Day public website">
          <Image src="/new-day-logo.jpg" width={58} height={58} alt="" priority />
          <small>STAFF PORTAL</small>
        </Link>
        <form action={signOut}>
          <button className="admin-signout" type="submit">Sign out</button>
        </form>
      </header>

      <section className="admin-dashboard__content" aria-labelledby="dashboard-title">
        <p className="admin-eyebrow">Administration</p>
        <h1 id="dashboard-title">Welcome to your workspace.</h1>
        <p className="admin-dashboard__lead">Signed in as <strong>{access.email}</strong></p>

        <div className="admin-role" aria-label={`Your role is ${access.role}`}>
          <span>Staff role</span><strong>{access.role === "admin" ? "Administrator" : "Staff"}</strong>
        </div>

        <h2 className="admin-modules-title">Content management</h2>
        <ul className="admin-module-grid">
          {modules.map((module) => (
            <li className="admin-module" key={module.title}>
              <span className="admin-module__status">Coming in a later phase</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <span className="admin-module__placeholder" aria-disabled="true">Not available yet</span>
            </li>
          ))}
        </ul>
      </section>
      <footer className="admin-dashboard__footer">New Day · Empowering Communities. Building Sustainable Futures.</footer>
    </main>
  );
}

function DashboardFallback() {
  return (
    <main className="admin-dashboard" aria-busy="true">
      <header className="admin-dashboard__header">New Day · Staff Portal</header>
      <section className="admin-dashboard__content">
        <p className="admin-eyebrow">Administration</p>
        <h1>Verifying staff access…</h1>
      </section>
    </main>
  );
}
