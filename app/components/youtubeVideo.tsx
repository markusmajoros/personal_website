import { useEffect, useState } from "react";
import { useCookieConsentContext } from "./cookieProvider";

type YoutubeVideoProps = {
  value: any;
};

export default function YoutubeVideo({ value }: YoutubeVideoProps) {
  const [consentGiven, toggleConsent] = useCookieConsentContext("youtube");
  const [videoId, setVideoId] = useState("youtubeCookie");

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
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "0.5rem",
          }}
        >
          Hier gehts zur Datenschutzerklärung
        </a>
      </div>
    </div>
  );
}
