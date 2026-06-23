import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — DSGVO-Check",
};

export default function Impressum() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Angaben gemäß § 5 TMG
          </h2>
          <p>
            DSGVO-Check
            <br />
            Max Mustermann
            <br />
            Musterstraße 123
            <br />
            12345 Musterstadt
            <br />
            Deutschland
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Kontakt</h2>
          <p>
            E-Mail: kontakt@dsgvo-check.example
            <br />
            Telefon: +49 (0) 123 4567890
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p>
            Max Mustermann
            <br />
            Musterstraße 123
            <br />
            12345 Musterstadt
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Haftungsausschluss</h2>
          <h3 className="font-medium mt-3 mb-1">Haftung für Inhalte</h3>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
            können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind
            wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
            den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
            wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
            gespeicherte fremde Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <h3 className="font-medium mt-3 mb-1">Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich.
          </p>
          <h3 className="font-medium mt-3 mb-1">Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>

        <p className="text-muted-foreground mt-8">
          Stand: {currentYear}
        </p>
      </section>
    </div>
  );
}
