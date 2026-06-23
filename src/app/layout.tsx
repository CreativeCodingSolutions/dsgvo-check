import type { Metadata } from "next";
import "./globals.css";
import { CookieBanner } from "@/components/cookie-banner";

export const metadata: Metadata = {
  title: "DSGVO-Check — DSGVO-Compliance-Scanner für deutsche Websites",
  description:
    "Prüfe kostenlos, ob deine Website DSGVO-konform ist. Scanner für Impressum, Datenschutzerklärung, Cookie-Banner und mehr. Für Kleinunternehmen und Mittelstand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        <header className="border-b bg-white">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-2">
            <span className="text-xl font-bold text-check-600">
              DSGVO-Check
            </span>
            <span className="text-sm text-muted-foreground ml-auto">
              Compliance-Scanner für deutsche Websites
            </span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t py-8 mt-12 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                DSGVO-Check
              </h3>
              <p>
                Kostenloser DSGVO-Compliance-Scanner für deutsche Websites.
                Einfach URL eingeben und prüfen lassen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Rechtliches
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="/impressum"
                    className="hover:text-foreground underline underline-offset-2"
                  >
                    Impressum
                  </a>
                </li>
                <li>
                  <a
                    href="/datenschutz"
                    className="hover:text-foreground underline underline-offset-2"
                  >
                    Datenschutzerklärung
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Hinweis</h3>
              <p>
                Die Prüfung ersetzt keine professionelle rechtliche Beratung.
                Bei Unsicherheiten konsultiere bitte einen Rechtsanwalt.
              </p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DSGVO-Check. Alle Rechte
            vorbehalten.
          </div>
        </footer>
        <CookieBanner />
      </body>
    </html>
  );
}
