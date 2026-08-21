import { Link, Outlet, useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function SiteLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
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
            <button
              className="theme-toggle-button"
              onClick={handleThemeToggle}
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              aria-pressed={theme === "dark"}
              title={theme === "light" ? "Dark mode" : "Light mode"}
            >
              {theme === "light" ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3c0 4.95 4.04 8.99 8.99 8.99.27 0 .54-.01.8-.04z"></path>
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              )}
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
