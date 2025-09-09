import type { Route } from "./+types/privacyPolicy";

export default function PrivacyPolicy({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Datenschutz</h1>
      <p>Das ist die Datenschutzerklärung für markusmajoros.com</p>

      <div className="tldr">
        <h2>TLDR – Welche Daten werden verarbeitet?</h2>
        <p>
          Die Privatsphäre meiner Website-Besucher*innen ist mir sehr wichtig.
          Daher sollen Sie zu jeder Zeit wissen, wann welche personenbezogenen
          Daten auf welche Weise verwendet werden.
        </p>
        <p>Als Besucher*in dieser Seite:</p>
        <ul>
          <li>werden keine persönlichen Informationen gespeichert</li>
          <li>
            werden keine Tracking-Informationen, wie z. B. Cookies, im Browser
            gespeichert, außer durch Ihre ausdrückliche Einwilligung über den
            Toggle-Consent für YouTube-Videos
          </li>
          <li>
            werden keine Informationen mit Dritten (außer YouTube als
            Auftragsverarbeiter) geteilt, an diese gesendet oder verkauft
          </li>
          <li>
            werden keine Informationen über persönliche und verhaltensbezogene
            Trends gesammelt und ausgewertet
          </li>
          <li>werden keine Informationen monetarisiert</li>
        </ul>
      </div>

      <h2>Vollständige Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung klärt Sie als Besucher*in dieser Website über
        die Art, den Umfang und die Zwecke der Erhebung und Verwendung
        personenbezogener Daten auf.
      </p>
      <p>
        Die folgenden Informationen gelten für alle Datenverarbeitungen im
        Rahmen dieser Website (https://www.markusmajoros.com/).
      </p>

      <h2>Links</h2>
      <p>
        Auf dieser Website sind zu Informationszwecken Links zu anderen Websites
        gesetzt. Diese Websites stehen nicht unter meiner Kontrolle und fallen
        daher nicht unter die Bestimmungen dieser Datenschutzerklärung. Wird ein
        Link aktiviert, ist es möglich, dass der*die Betreiber*in dieser Website
        Daten über Sie gemäß seiner*ihrer Datenschutzerklärung erhebt und
        verarbeitet.
      </p>

      <h2>Verantwortlich</h2>
      <p>Verantwortlicher gemäß Art 4 Z 7 DSGVO ist:</p>
      <div className="contact-info">
        <p>Markus Majoros</p>
        <p>
          E-Mail:&nbsp;
          <a href="mailto:markus.majoros@protonmail.com">
            markus.majoros@protonmail.com
          </a>
        </p>
      </div>

      <h2>Verarbeitung</h2>
      <h3>Besuch der Webseite</h3>
      <p>
        Beim Besuch meiner Website werden zunächst einige personenbezogene Daten
        erhoben. Nachfolgende Daten werden von Ihrem Browser an meine Server
        übermittelt:
      </p>
      <ul>
        <li>IP-Adresse des*der Nutzer*in</li>
        <li>Datum und Uhrzeit der Anfrage</li>
        <li>Inhalt der Anforderung (konkrete Seite)</li>
        <li>Zugriffsstatus/HTTP-Statuscode</li>
        <li>jeweils übertragene Datenmenge</li>
        <li>Website, von der die Anforderung kommt</li>
        <li>Betriebssystem des*der Nutzer*in</li>
        <li>Sprache und Version der Browsersoftware</li>
      </ul>
      <p>
        Diese Datenerhebung ist zunächst technisch bedingt, damit meine Website
        in Ihrem Browser angezeigt werden kann.
      </p>

      <h3>E-Mail-Kontakt</h3>
      <p>
        Auf meiner Website befinden sich E-Mail-Links (mailto), mit denen Sie
        schnell mit mir Kontakt aufnehmen können. Im Rahmen einer solchen
        Kommunikation könnten von Ihnen mitunter personenbezogene Daten an mich
        übermittelt werden (z.B. wenn Ihr Name aus der E-Mail-Adresse
        hervorgeht). Je nach Ihrer Anfrage werde ich diese Daten zweckgebunden
        verarbeiten. Ich lösche die Anfragen und Sie betreffende Daten, sofern
        diese nicht mehr erforderlich sind und keine gesetzlichen
        Speicherungspflichten bestehen.
      </p>

      <h3>YouTube-Videos</h3>
      <p>
        Auf dieser Website sind YouTube-Videos eingebunden. Ich selbst speichere
        dabei keine personenbezogenen Daten.
      </p>
      <p>
        Folgende Daten werden ggf. an YouTube übermittelt, sobald Sie ein Video
        abspielen:
      </p>
      <ul>
        <li>Ihre IP-Adresse (notwendig für die Videowiedergabe)</li>
        <li>Informationen über Ihren Browser und Ihr Betriebssystem</li>
        <li>Datum und Uhrzeit des Abrufs</li>
        <li>Referrer-URL (welche Seite Sie zu YouTube geführt hat)</li>
        <li>Interaktionen mit dem Video (Abspielen, Pausieren, Bewertung)</li>
        <li>
          Cookies von YouTube zur Analyse und Speicherung von Interaktionen (nur
          bei Zustimmung)
        </li>
      </ul>
      <p>
        Die Rechtsgrundlage für die Verarbeitung ist Ihre &nbsp;
        <strong>Einwilligung</strong>, die Sie durch das Setzen eines Cookies
        via Toggle-Consent erteilen. Solange Sie die Einwilligung nicht
        erteilen, werden keine personenbezogenen Daten an YouTube übermittelt.
      </p>
      <p>
        Sie können Ihre Einwilligung jederzeit über den Toggle-Consent
        widerrufen. Weitere Informationen zur Datenverarbeitung durch YouTube
        finden Sie hier:{" "}
        <a
          href="https://policies.google.com/privacy?hl=de"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/privacy?hl=de
        </a>
        .
      </p>

      <h2>Rechtsgrundlage der Datenverarbeitung</h2>
      <p>
        Ich verarbeite personenbezogene Daten aufgrund berechtigter Interessen
        gemäß Art 6 Abs 1 lit f DSGVO sowie aufgrund Ihrer Einwilligung (Art 6
        Abs. 1 lit a DSGVO), wenn Sie YouTube-Videos abspielen.
      </p>
      <ul>
        <li>
          Die Erhebung Ihrer personenbezogenen Daten beim Aufruf und Verwenden
          meiner Website ist technisch notwendig, um diese Website anzeigen zu
          lassen.
        </li>
        <li>
          Im Zuge einer Kontaktaufnahme per E-Mail werden personenbezogene Daten
          notwendigerweise verarbeitet, damit eine effektive Bearbeitung dieser
          Anfragen gewährleistet werden kann.
        </li>
        <li>
          Bei YouTube-Videos erfolgt die Verarbeitung ausschließlich nach Ihrer
          Einwilligung über den Toggle-Consent.
        </li>
      </ul>

      <h2>Speicherdauer und Löschung von Daten</h2>
      <p>
        Sobald der Zweck für die Speicherung entfällt, werden Ihre
        personenbezogenen Daten unverzüglich gelöscht. Für YouTube-Daten gelten
        die Speicher- und Löschfristen von YouTube.
      </p>

      <h2>Betroffenenrechte</h2>
      <p>
        Soweit personenbezogene Daten von Ihnen verarbeitet werden, sind Sie
        Betroffene*r im Sinne des Art 4 Z 1 DSGVO. Damit stehen Ihnen gegenüber
        mir als Verantwortlichen folgende Rechte zu:
      </p>
      <ul>
        <li>Recht auf Auskunft</li>
        <li>Recht auf Berichtigung</li>
        <li>Recht auf Löschung</li>
        <li>Recht auf Einschränkung der Datenverarbeitung</li>
        <li>Recht auf Datenübertragbarkeit</li>
        <li>Recht auf Widerspruch der Verarbeitung</li>
      </ul>
      <p>
        Diese Rechte können einfach per Mail an{" "}
        <a href="mailto:markus.majoros@protonmail.com">
          markus.majoros@protonmail.com
        </a>{" "}
        geltend gemacht werden.
      </p>
      <p>
        Ich weise Sie darauf hin, dass von mir nach dem Besuch meiner Website
        keine Speicherung von personenbezogenen Daten stattfindet. Daher kann
        ich für diese Fälle keinen Anfragen auf Auskunft, Berichtigung,
        Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit oder
        Widerruf nachkommen.
      </p>
      <p>
        Sollten Sie der Ansicht sein, dass die Verarbeitung der Sie betreffenden
        personenbezogenen Daten gegen die DSGVO oder das DSG verstößt, haben Sie
        unbeschadet eines anderweitigen verwaltungsrechtlichen oder
        gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer
        Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres
        Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen
        Verstoßes.
      </p>
      <p>
        In Österreich ist dies die Datenschutzbehörde (
        <a
          href="https://www.dsb.gv.at/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.dsb.gv.at/
        </a>
        ).
      </p>
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
  return [{ title: "Datenschutz" }, { name: "description", content: "" }];
}
