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
              background: "#000",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              padding: "0.5rem",
            }}
          >
            Du musst Cookies akzeptieren, um das Video zu sehen.
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          background: "#f0f0f0",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          fontSize: "0.9rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "16px" }}>
            Cookies für YouTube aktivieren
          </span>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "16px",
            }}
          >
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={toggleConsent}
              style={{ marginRight: "0.5rem", transform: "scale(1.2)" }}
            />
            {consentGiven ? "An" : "Aus"}
          </label>
        </div>

        <div
          style={{
            marginTop: "0.75rem",
            padding: "0.75rem 1rem",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <button
            className={`button ${showInfo ? "hide" : "show"}`}
            onClick={() => setShowInfo((prev) => !prev)}
            style={{
              background: "transparent",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span>
              {showInfo
                ? "Youtube-Cookies: Datenschutz-Infos ausblenden"
                : "Youtube-Cookies: Datenschutz-Infos anzeigen"}
            </span>
          </button>
          {showInfo && (
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "16px",
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
