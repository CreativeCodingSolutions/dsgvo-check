import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — DSGVO-Check",
};

export default function Datenschutz() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            1. Datenschutz auf einen Blick
          </h2>
          <h3 className="font-medium mt-3 mb-1">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit deinen personenbezogenen Daten passiert, wenn du diese Website
            besuchst. Personenbezogene Daten sind alle Daten, mit denen du
            persönlich identifiziert werden kannst. Ausführliche Informationen
            zum Thema Datenschutz entnimmst du der unter diesem Text
            aufgeführten Datenschutzerklärung.
          </p>
          <h3 className="font-medium mt-3 mb-1">
            Datenerfassung auf dieser Website
          </h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung?</strong>
            <br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber. Die Kontaktdaten findest du im Impressum.
          </p>
          <p className="mt-2">
            <strong>Wie erfassen wir deine Daten?</strong>
            <br />
            Deine Daten werden zum einen dadurch erhoben, dass du sie uns
            mitteilst. Hierbei kann es sich um Daten handeln, die du in das
            URL-Eingabefeld eingibst. Diese Daten werden ausschließlich
            serverseitig verarbeitet und nicht gespeichert.
          </p>
          <p className="mt-2">
            <strong>Wofür nutzen wir deine Daten?</strong>
            <br />
            Die eingegebene URL wird ausschließlich zum Zweck der
            DSGVO-Compliance-Prüfung verarbeitet. Es erfolgt keine Speicherung,
            Weitergabe oder Analyse über den einmaligen Scan-Vorgang hinaus.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            2. Hosting (Vercel Inc.)
          </h2>
          <p>
            Diese Website wird bei Vercel Inc., 340 Pine St, 4th Fl, San
            Francisco, CA 94104, USA gehostet. Vercel verarbeitet
            Zugriffsdaten (IP-Adresse, Browserkennung, aufgerufene Seiten) zu
            Zwecken des Betriebs, der Sicherheit und der Optimierung des
            Angebots. Vercel ist unter dem EU-US Data Privacy Framework
            zertifiziert und verarbeitet Daten auf Grundlage der
            Standardvertragsklauseln (SCCs) der EU-Kommission.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            3. Datenverarbeitung auf dieser Website
          </h2>
          <h3 className="font-medium mt-3 mb-1">URL-Scan-Funktion</h3>
          <p>
            Wenn du eine URL in das Eingabefeld eingibst und auf &ldquo;Jetzt
            Prüfen&rdquo; klickst, wird die eingegebene URL an unseren Server
            gesendet und dort verarbeitet. Der Server ruft die angegebene
            Website auf und analysiert den HTML-Code auf DSGVO-relevante
            Elemente.
          </p>
          <p className="mt-2">
            <strong>Wichtig:</strong> Wir speichern weder die eingegebene URL
            noch die Ergebnisse des Scans. Die Verarbeitung erfolgt
            ausschließlich im Arbeitsspeicher und wird nach dem Senden der
            Ergebnisse an deinen Browser verworfen.
          </p>
          <h3 className="font-medium mt-2 mb-1">Cookies</h3>
          <p>
            Diese Website verwendet ausschließlich essentielle Cookies, die für
            den Betrieb der Website technisch notwendig sind. Es werden keine
            Tracking-Cookies, Analyse-Cookies oder Marketing-Cookies gesetzt.
            Du kannst deine Cookie-Einstellungen über den Cookie-Banner
            jederzeit anpassen.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            4. Deine Rechte (DSGVO Art. 15-21)
          </h2>
          <p>Du hast jederzeit das Recht auf:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung deiner Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>
          <p className="mt-2">
            Zur Ausübung deiner Rechte wende dich bitte an die im Impressum
            angegebene E-Mail-Adresse.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            5. Beschwerderecht bei der Aufsichtsbehörde
          </h2>
          <p>
            Du hast das Recht, dich bei der zuständigen
            Datenschutz-Aufsichtsbehörde zu beschweren, wenn du der Ansicht
            bist, dass die Verarbeitung deiner personenbezogenen Daten gegen
            die DSGVO verstößt.
          </p>
        </div>
      </section>
    </div>
  );
}
