import type { Route } from "./+types/home";
import { getPages } from "~/sanity/client";
import { PortableText } from "@portabletext/react";

const portableTextComponents = {
  types: {
    media: ({ value }: any) => {
      if (value.type === "image" && value.image?.asset?.url) {
        const imageUrl = value.image.asset.url;
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

      if (value.type === "video" && value.video?.asset?.url) {
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
  );
}

export function headers() {
  return {
    "Cache-Control": "max-age: 3600,s-maxage: 7200",
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Markus Majoros" }, { name: "description", content: "" }];
}
