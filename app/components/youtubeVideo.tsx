import { useEffect, useState } from "react";
import { useCookieConsentContext } from "./cookieProvider";

type YoutubeVideoProps = {
  value: any;
};

export default function YoutubeVideo({ value }: YoutubeVideoProps) {
  const [consentGiven, toggleConsent] = useCookieConsentContext("youtube");
  const [videoId, setVideoId] = useState("youtubeCookie");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    try {
      const url = new URL(value.url);
      let id = "";
      if (url.hostname === "youtu.be") {
        id = url.pathname.slice(1);
      } else if (url.pathname.startsWith("/embed/")) {
        id = url.pathname.split("/embed/")[1];
      } else if (url.pathname.startsWith("/shorts/")) {
        id = url.pathname.split("/shorts/")[1];
      } else {
        id = url.searchParams.get("v") || "";
      }
      id = id.split("?")[0].split("&")[0];
      setVideoId(id);
    } catch {
      console.error("Ungültiger YouTube-Link");
    }
  }, [value]);

  if (!videoId) return <p>Ungültiger YouTube-Link</p>;

  return (
    <div style={{ margin: "2rem 0" }}>
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {consentGiven ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
          />
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#1a1a1a",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              padding: "1rem",
              textAlign: "center",
              fontFamily: "Inter",
            }}
          >
            <div>
              <div style={{ marginBottom: "1rem" }}>🔒 Video gesperrt</div>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                Akzeptiere YouTube-Cookies um das Video zu sehen.
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          padding: "1.25rem",
          background: "#fafafa",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          borderRadius: "6px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#2c3e50",
              fontFamily: "Inter",
              gap: "0.75rem",
            }}
          >
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={toggleConsent}
              style={{
                transform: "scale(1.3)",
                cursor: "pointer",
                accentColor: "#0066cc",
              }}
            />
            YouTube-Cookies {consentGiven ? "aktiviert" : "deaktiviert"}
          </label>
        </div>

        <div
          style={{
            padding: "1rem",
            background: "white",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            borderRadius: "4px",
          }}
        >
          <button
            className={`button ${showInfo ? "hide" : "show"}`}
            onClick={() => setShowInfo((prev) => !prev)}
            style={{
              background: "transparent",
              fontSize: "0.95rem",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter",
              color: "#0066cc",
              padding: 0,
            }}
          >
            <span>
              {showInfo
                ? "Datenschutz-Info ausblenden"
                : "Datenschutz-Info anzeigen"}
            </span>
          </button>
          {showInfo && (
            <div
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                lineHeight: "1.6",
                color: "#4a5568",
              }}
            >
              <p>
                <strong>Verantwortlicher:</strong> Markus Majoros
              </p>
              <p>
                <strong>Zweck der Verarbeitung:</strong> Anzeige von
                eingebetteten YouTube-Videos. Dabei werden Daten (z. B.
                IP-Adresse, Nutzungsdaten) an Google übermittelt.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Einwilligung (Art. 6 Abs. 1
                lit. a DSGVO).
              </p>
              <p>
                <strong>Widerruf:</strong> Die Einwilligung kann jederzeit ohne
                Angabe von Gründen widerrufen werden. Die Rechtmäßigkeit der bis
                zum Widerruf erfolgten Verarbeitung bleibt unberührt.
              </p>
              <p>
                <strong>Wie widerrufen?</strong> Über den Cookie-Schalter oben
                („Cookies für YouTube aktivieren“)
              </p>
              <a href="/privacy-policy">
                Mehr dazu in der Datenschutzerklärung
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
