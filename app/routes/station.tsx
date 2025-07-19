import type { Route } from "./+types/home";
import { Welcome } from "../../welcome/welcome";
import { getPages, getTrip } from "~/sanity/client";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.slug || !params.stationKey) {
    throw new Response("Not Found", { status: 404 });
  }

  const trip = await getTrip(params.slug);

  if (!trip) {
    throw new Response("Not Found", { status: 404 });
  }

  const station = trip.stations.find((s: any) => s._key === params.stationKey);

  if (!station) {
    throw new Response("Station Not Found", { status: 404 });
  }

  return {
    date: new Date(),
    trip,
    station,
  };
}

export default function SingleStation({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Station: {loaderData.station.title}</h1>
      <p>
        Gehört zur Reise:{" "}
        <Link to={`/trips/${loaderData.trip.slug.current}`}>
          {loaderData.trip.title}
        </Link>
      </p>
      {loaderData.station.image?.asset?.url && (
        <img
          src={loaderData.station.image.asset.url}
          alt={loaderData.station.title}
          style={{ maxWidth: "400px" }}
        />
      )}
      <p>{loaderData.station.shortText}</p>
      <div>
        <PortableText value={loaderData.station.content} />
      </div>
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control": "max-age: 3600,s-maxage: 7200",
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reise" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
