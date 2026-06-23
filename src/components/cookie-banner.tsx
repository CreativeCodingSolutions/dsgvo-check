"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("dsgvo-check-cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem("dsgvo-check-cookie-consent", "all");
    setVisible(false);
  }

  function acceptEssential() {
    localStorage.setItem("dsgvo-check-cookie-consent", "essential");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg">
      <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Diese Website verwendet nur essentielle Cookies, die für den Betrieb
          erforderlich sind. Es werden keine Tracking-Cookies gesetzt.
          Weitere Informationen in unserer{" "}
          <a href="/datenschutz" className="underline hover:text-foreground">
            Datenschutzerklärung
          </a>.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={acceptEssential}>
            Nur Essentielle
          </Button>
          <Button size="sm" onClick={acceptAll}>
            Alle Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
