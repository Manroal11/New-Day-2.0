import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Projects", href: "/projects" },
  { label: "Impact", href: "/impact" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Get involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__main page-shell">
        <div className="site-footer__brand-block">
          <Link className="brand brand--footer" href="/" aria-label="New Day home">
            <Image className="brand__logo" src="/new-day-logo.jpg" alt="New Day official logo" width={1024} height={1024} />
          </Link>
          <p>Empowering Communities.<br />Building Sustainable Futures.</p>
        </div>

        <div className="site-footer__links-block">
          <h2>Explore</h2>
          <nav aria-label="Footer navigation">
            {footerLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>

        <div className="site-footer__contact">
          <h2>Contact</h2>
          <p>Contact details will be added when confirmed.</p>
          <span className="site-footer__contact-placeholder">Email · phone · location to be confirmed</span>
        </div>
      </div>
      <div className="site-footer__bottom page-shell">
        <p>© New Day. All rights reserved.</p>
        <p>Website by <span>Man &amp; Tech</span></p>
      </div>
    </footer>
  );
}
