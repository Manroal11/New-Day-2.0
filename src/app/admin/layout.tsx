import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Staff Administration | New Day",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="admin-shell">{children}</div>;
}
