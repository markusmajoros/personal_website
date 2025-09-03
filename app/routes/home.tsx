import type { Route } from "./+types/home";
import { getPages } from "~/sanity/client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "~/sanity/sanityImageUrl";

const portableTextComponents = {
  types: {
    media: ({ value }: any) => {
      if (value.type === "image" && value.image?.asset) {
        const imageUrl = urlFor(value.image).width(1000).auto("format").url();
        return (
          <figure>
            <img
              src={imageUrl}
              alt={value.alt || "Content Image"}
              loading="lazy"
              style={{
                maxWidth: "100%",
                height: "auto",
                display: "block",
                margin: "20px auto",
              }}
            />
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        );
      }

      if (value.type === "video" && value.video?.asset) {
        return (
          <figure>
            <video
              controls
              preload="metadata"
              style={{ maxWidth: "100%", height: "auto", display: "block" }}
            >
              <source
                src={value.video.asset.url}
                type={value.video.asset.mimeType || "video/mp4"}
              />
              Dein Browser unterstützt das Video-Tag nicht.
            </video>
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        );
      }

      // Fallback für unbekannte Medientypen
      return (
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            margin: "20px 0",
          }}
        >
          <p>Unbekannter Medientyp: {value.type}</p>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </div>
      );
    },
  },
};

export async function loader() {
  const pages = await getPages();
  return {
    date: new Date(),
    pages,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="homepage">
        <img
          src="/homepage.jpg"
          loading="lazy"
          style={{
            width: "auto",
            height: 630,
            display: "block",
            margin: "20px auto",
          }}
        ></img>
        <div className="tripText">
          <p>
            Hallo! Mein Name ist Markus Majoros, ich bin studierter Jurist und
            angehender Web Developer. Ich liebe es neue Sachen zu lernen und
            meinen Horizont zu erweitern.
          </p>
          <a href="/about">Hier findest du mehr Infos über mich</a>
        </div>
      </div>
      <div>
        {loaderData.pages.map((page) => (
          <div key={page._id}>
            <h2>{page.title}</h2>
            <div>
              <PortableText
                value={page.content}
                components={portableTextComponents}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control":
      "max-age=3600,s-maxage=7200,stale-while-revalidate=2592000",
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Markus Majoros" }, { name: "description", content: "" }];
}
