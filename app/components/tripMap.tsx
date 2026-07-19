import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//@ts-ignore
import "leaflet/dist/leaflet.css";
import GpxLayer from "./GpxLayer";

type Station = {
  _key: string;
  title: string;
  locationType: "marker" | "route";
  geolocation?: {
    lat: number;
    lng: number;
  };
  gpxUrl?: string;
};

export default function TripMap({ stations }: { stations: Station[] }) {
  return (
    <MapContainer
      center={[48.2082, 16.3738]}
      zoom={6}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((station) => (
        <div key={station._key}>
          {station.locationType === "marker" && station.geolocation && (
            <Marker
              position={[station.geolocation.lat, station.geolocation.lng]}
            >
              <Popup>{station.title}</Popup>
            </Marker>
          )}

          {station.locationType === "route" && station.gpxUrl && (
            <GpxLayer url={station.gpxUrl} />
          )}
        </div>
      ))}
    </MapContainer>
  );
}
