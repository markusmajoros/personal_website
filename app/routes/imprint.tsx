import type { Route } from "./+types/imprint";

export default function Imprint({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Impressum</h1>
      <p>
        Kontakt:{" "}
        <a href="mailto:markus.majoros@protonmail.com">
          markus.majoros@protonmail.com
        </a>
      </p>
      <p>
        Markus Majoros <br></br>
        Schlachthausgasse 23-29/1/110 <br></br>
        1030 Wien
      </p>
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control": "max-age=3600,s-maxage=7200",
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Impressum" }, { name: "description", content: "" }];
}
