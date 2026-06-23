"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScanResult } from "@/lib/scanner";

const checkLabels: Record<string, string> = {
  impressum: "Impressum (§5 TMG)",
  datenschutz: "Datenschutzerklärung (DSGVO)",
  cookieBanner: "Cookie-Banner (TTDSG)",
  kontaktdaten: "Kontaktdaten / Adresse",
  ssl: "SSL-Verschlüsselung (HTTPS)",
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Fehler beim Scannen");
      } else {
        setResult(data);
      }
    } catch {
      setError("Netzwerkfehler — bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  function scoreColor(score: number): string {
    if (score >= 80) return "text-check-600";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  }

  function scoreBg(score: number): string {
    if (score >= 80) return "bg-check-50 border-check-200";
    if (score >= 50) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Ist deine Website DSGVO-konform?
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Gib eine URL ein und unser Scanner prüft kostenlos, ob Impressum,
          Datenschutzerklärung, Cookie-Banner und mehr vorhanden sind.
        </p>
      </section>

      <form onSubmit={handleScan} className="flex gap-3 max-w-xl mx-auto mb-12">
        <Input
          type="url"
          placeholder="z.B. example.de"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1 h-12 text-base"
        />
        <Button type="submit" disabled={loading} className="h-12 px-6">
          {loading ? "Prüfe..." : "Jetzt Prüfen"}
        </Button>
      </form>

      {error && (
        <div className="max-w-xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div
            className={`max-w-xl mx-auto p-6 rounded-lg border ${scoreBg(result.score)}`}
          >
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                DSGVO-Compliance-Score für
              </p>
              <p className="font-mono text-sm mb-4 break-all">{result.url}</p>
              <p className={`text-5xl font-bold ${scoreColor(result.score)}`}>
                {result.score}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.score >= 80
                  ? "Gut aufgestellt — die wichtigsten DSGVO-Anforderungen sind erfüllt."
                  : result.score >= 50
                    ? "Verbesserungswürdig — einige Pflichtangaben fehlen."
                    : "Dringender Handlungsbedarf — wichtige DSGVO-Pflichten nicht erfüllt."}
              </p>
            </div>
          </div>

          {result.error && (
            <div className="max-w-xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <strong>Fehler:</strong> {result.error}
            </div>
          )}

          <div className="max-w-xl mx-auto space-y-3">
            {Object.entries(result.checks).map(([key, check]) => (
              <div
                key={key}
                className={`p-4 rounded-lg border ${
                  check.passed
                    ? "bg-check-50 border-check-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">
                    {check.passed ? "✓" : "✗"}
                  </span>
                  <div>
                    <p className="font-medium text-sm">
                      {checkLabels[key] || key}
                    </p>
                    <p
                      className={`text-sm ${
                        check.passed
                          ? "text-check-700"
                          : "text-red-700"
                      }`}
                    >
                      {check.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => {
                setResult(null);
                setUrl("");
              }}
            >
              Neue Prüfung
            </Button>
          </div>
        </div>
      )}

      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">1. URL eingeben</h3>
          <p className="text-sm text-muted-foreground">
            Gib die URL deiner Website ein. Der Scanner analysiert die
            Startseite auf DSGVO-relevante Elemente.
          </p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">2. Automatische Prüfung</h3>
          <p className="text-sm text-muted-foreground">
            Unser Scanner durchsucht die Seite nach Impressum,
            Datenschutzerklärung, Cookie-Banner und Kontaktdaten.
          </p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">3. Ergebnis erhalten</h3>
          <p className="text-sm text-muted-foreground">
            Du erhältst einen detaillierten Bericht mit Bestehen/Nichtbestehen
            für jede Prüfkategorie.
          </p>
        </div>
      </section>

      <section className="mt-16 p-6 rounded-lg border bg-muted/30">
        <h2 className="text-xl font-semibold mb-4">
          Warum DSGVO-Compliance?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Abmahngefahr vermeiden
            </h4>
            <p>
              Fehlendes Impressum oder Datenschutzerklärung sind häufige
              Abmahnfallen. Ein DSGVO-Verstoß kann schnell teuer werden.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Vertrauen aufbauen
            </h4>
            <p>
              Deutsche Nutzer achten auf Datenschutz. Eine DSGVO-konforme
              Website signalisiert Seriosität und Professionalität.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Rechtliche Pflicht
            </h4>
            <p>
              Seit der DSGVO 2018 sind Impressum und Datenschutzerklärung für
              geschäftliche Websites in Deutschland Pflicht.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">
              SEO-Vorteil
            </h4>
            <p>
              Rechtstexte wie Impressum und Datenschutz werden von Google als
              Vertrauenssignal gewertet und können das Ranking verbessern.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
