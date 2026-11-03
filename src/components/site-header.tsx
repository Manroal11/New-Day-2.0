"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowIcon } from "@/components/icons";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Projects", href: "/projects" },
  { label: "Impact", href: "/impact" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/" onClick={closeMenu} aria-label="New Day home">
          <Image className="brand__logo" src="/new-day-logo.jpg" alt="New Day — Empowering Communities. Building Sustainable Futures." width={1024} height={1024} priority />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`menu-toggle__icon${menuOpen ? " is-open" : ""}`} aria-hidden="true"><span /><span /></span>
        </button>

        <nav id="primary-navigation" className={`primary-navigation${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <div className="primary-navigation__links">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>
            ))}
          </div>
          <Link className="button button--small button--gold" href="/get-involved" onClick={closeMenu}>
            Get involved <ArrowIcon />
          </Link>
        </nav>
      </div>
    </header>
  );
}
