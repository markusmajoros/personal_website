import type { Route } from "./+types/trips";
import { getTrips } from "~/sanity/client";
import { Link } from "react-router";
import { urlFor } from "~/sanity/sanityImageUrl";

export async function loader() {
  const trips = await getTrips();
  return {
    date: new Date(),
    trips,
  };
}

function formatDateEu(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

export default function SingleTrip({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Meine Reisen</h1>
      <p className="tripText">Hier findest du eine Übersicht meiner Reisen.</p>
      {loaderData.trips.map((trip) => (
        <div key={trip._id} className="trip">
          <Link to={`/trips/${trip.slug.current}`}>
            <h2>{trip.title}</h2>
          </Link>
          {trip.image?.asset && (
            <img
              src={urlFor(trip.image)
                .width(1000)
                .height(630)
                .auto("format")
                .crop("focalpoint")
                .fit("crop")
                .url()}
              alt={trip.title}
              style={{ maxWidth: "100%" }}
              loading="lazy"
            />
          )}
          <div className="tripText">
            <p>{trip.shortText}</p>
            <p>
              <p>
                {formatDateEu(trip.startDate)} - {formatDateEu(trip.endDate)}
              </p>
            </p>
          </div>
        </div>
      ))}
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
  return [
    { title: "Meine Reisen" },
    {
      name: "description",
      content:
        "Eine Übersicht über meine Reisen durch verschiedene Länder und Regionen.",
    },
  ];
}
