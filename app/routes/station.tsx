import type { Route } from "./+types/station";

import { getTrip } from "~/sanity/client";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router";
import { urlFor } from "~/sanity/sanityImageUrl";
import { ArrowLeft, ArrowRight } from "lucide-react";

const portableTextComponents = {
  types: {
    horizontalRule: () => (
      <hr style={{ margin: "3rem 0", borderColor: "#ccc" }} />
    ),
    media: ({ value }: any) => {
      if (value.type === "image" && value.image?.asset) {
        const imageUrl = urlFor(value.image).width(1000).auto("format").url();

        const height = value.image.asset.metadata.dimensions.height;
        const width = value.image.asset.metadata.dimensions.width;

        return (
          <figure>
            <img
              src={imageUrl}
              alt={value.alt || "Content Image"}
              loading="lazy"
              style={{
                aspectRatio: `${width} / ${height}`,
                maxWidth: "100%",
                height: "auto",
                display: "block",
                margin: "20px auto",
                marginBottom: "0rem",
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

    youtube: ({ value }: any) => {
      let videoId = "";
      try {
        const url = new URL(value.url);
        if (url.hostname === "youtu.be") {
          videoId = url.pathname.slice(1);
        } else if (url.pathname.startsWith("/embed/")) {
          videoId = url.pathname.split("/embed/")[1];
        } else if (url.pathname.startsWith("/shorts/")) {
          videoId = url.pathname.split("/shorts/")[1];
        } else {
          videoId = url.searchParams.get("v") || "";
        }
      } catch {
        return <p>Ungültiger YouTube-Link</p>;
      }
      videoId = videoId.split("?")[0].split("&")[0];
      if (!videoId) return <p>Ungültiger YouTube-Link</p>;
      return (
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            margin: "2rem 0",
          }}
        >
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
        </div>
      );
    },
  },

  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.slug || !params.stationKey) {
    throw new Response("Not Found", { status: 404 });
  }

  const trip = await getTrip(params.slug);

  if (!trip) {
    throw new Response("Not Found", { status: 404 });
  }

  const stationIndex = trip.stations.findIndex(
    (s: any) => s._key === params.stationKey
  );

  const station = trip.stations[stationIndex];
  const stationPrev =
    stationIndex !== 0 ? trip.stations[stationIndex - 1] : null;
  const stationNext =
    trip.stations.length - 1 !== stationIndex
      ? trip.stations[stationIndex + 1]
      : null;

  if (stationIndex === -1) {
    throw new Response("Station Not Found", { status: 404 });
  }

  return {
    date: new Date(),
    trip,
    station,
    stationPrev,
    stationNext,
  };
}

function formatDateEu(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

export default function SingleStation({ loaderData }: Route.ComponentProps) {
  return (
    <div className="stationContainer">
      <div className="arrows">
        <div className="leftArrow">
          {loaderData.stationPrev && (
            <Link
              to={`/trips/${loaderData.trip.slug.current}/stations/${loaderData.stationPrev._key}`}
            >
              <ArrowLeft />
              {loaderData.stationPrev.title}
            </Link>
          )}
        </div>
        <h1>{loaderData.station.title}</h1>
        <div className="rightArrow">
          {loaderData.stationNext && (
            <Link
              to={`/trips/${loaderData.trip.slug.current}/stations/${loaderData.stationNext._key}`}
            >
              {loaderData.stationNext.title}
              <ArrowRight />
            </Link>
          )}
        </div>
      </div>
      <div className="stationText">
        <p>
          Gehört zur Reise:{" "}
          <Link to={`/trips/${loaderData.trip.slug.current}`}>
            {loaderData.trip.title}
          </Link>
        </p>
        {loaderData.station.image?.asset && (
          <img
            src={urlFor(loaderData.station.image)
              .width(1000)
              .height(630)
              .auto("format")
              .crop("center")
              .fit("crop")
              .url()}
            alt={loaderData.station.title}
            style={{ maxWidth: "100%" }}
            loading="lazy"
          />
        )}
        <p>Von: {formatDateEu(loaderData.station.startDate)}</p>
        <p>Bis: {formatDateEu(loaderData.station.endDate)}</p>
        <hr style={{ margin: "3rem 0" }}></hr>
        <div>
          <PortableText
            value={loaderData.station.content}
            components={portableTextComponents}
          />
        </div>
        <div className="arrows">
          <div className="leftArrow">
            {loaderData.stationPrev && (
              <Link
                to={`/trips/${loaderData.trip.slug.current}/stations/${loaderData.stationPrev._key}`}
              >
                <ArrowLeft />
                {loaderData.stationPrev.title}
              </Link>
            )}
          </div>
          <div className="rightArrow">
            {loaderData.stationNext && (
              <Link
                to={`/trips/${loaderData.trip.slug.current}/stations/${loaderData.stationNext._key}`}
              >
                {loaderData.stationNext.title}
                <ArrowRight />
              </Link>
            )}
          </div>
        </div>
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

export function meta({ data }: Route.MetaArgs) {
  const trip = data?.trip;
  const station = data?.station;

  return [
    {
      title: `${station?.title}`,
    },
    {
      name: "description",
      content: station?.shortText
        ? station.shortText
        : `Station aus der Reise "${trip?.title}".`,
    },
  ];
}
