import type { ReactNode } from "react";
import { Link, Outlet } from "react-router";

export default function SiteLayout() {
  return (
    <div className="site-bg-image">
      <div className="main-website-wrapper">
        <header className="header">
          <div className="markus">
            <Link to="/" className="logo">
              <img src="/favicon-32x32.png"></img>
              Markus Majoros
            </Link>
          </div>
          <nav className="nav">
            <Link to="/trips">Reisen</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Kontakt</Link>
          </nav>
        </header>
        <main className="main">
          <Outlet />
        </main>
        <footer className="footer">
          <div className="credentials">
            <p>© {new Date().getFullYear()} Markus Majoros </p>
            <a
              href="https://github.com/markusmajoros/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/github.png" alt="Github"></img>
            </a>
            <a
              href="https://at.linkedin.com/in/markus-majoros-926a242a8/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/linkedin.png" alt="Linkedin"></img>
            </a>
          </div>
          <nav className="nav">
            <Link to="/privacy-policy">Datenschutz</Link>
            <Link to="/imprint">Impressum</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
