import type { ReactNode } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function SiteLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSearchOpen]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === "") return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

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
            <button
              className="search-icon-button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
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

      {isSearchOpen && (
        <div
          className="search-modal-overlay"
          onClick={() => setIsSearchOpen(false)}
        >
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <button
                className="search-submit-button"
                onClick={handleSearchSubmit}
                aria-label="Submit search"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
