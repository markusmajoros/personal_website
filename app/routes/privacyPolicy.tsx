import type { Route } from "./+types/privacyPolicy";

export default function PrivacyPolicy({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Datenschutz</h1>
      <p>Hier kommt die Datenschutzerklärung her - sobald ich eine habe</p>
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control": "max-age=3600,s-maxage=7200",
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Datenschutz" }, { name: "description", content: "" }];
}
