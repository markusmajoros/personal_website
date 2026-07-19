import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-gpx";

export default function GpxLayer({ url }: { url: string }) {
  const map = useMap();

  useEffect(() => {
    const gpx = new (L as any).GPX(url, {
      async: true,
    });

    gpx.addTo(map);

    gpx.on("loaded", (e: any) => {
      map.fitBounds(e.target.getBounds());
    });

    return () => {
      map.removeLayer(gpx);
    };
  }, [url, map]);

  return null;
}
