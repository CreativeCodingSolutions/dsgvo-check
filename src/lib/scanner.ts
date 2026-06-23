export interface ScanResult {
  url: string;
  score: number;
  checks: {
    impressum: CheckResult;
    datenschutz: CheckResult;
    cookieBanner: CheckResult;
    kontaktdaten: CheckResult;
    ssl: CheckResult;
    agb: CheckResult;
    widerruf: CheckResult;
  };
  details: string[];
  error?: string;
}

interface CheckResult {
  passed: boolean;
  found: boolean;
  detail: string;
}

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  return url;
}

function extractText(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function extractLinks(html: string): { text: string; href: string }[] {
  const links: { text: string; href: string }[] = [];
  const linkRegex = /<a\s[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    links.push({
      href: match[1].toLowerCase(),
      text: extractText(match[2]).toLowerCase(),
    });
  }
  return links;
}

function hasCookieBanner(html: string, text: string): boolean {
  const cookieKeywords = [
    "cookie", "cookies", "cookie-banner", "cookie banner",
    "einwilligung", "zustimmen", "akzeptieren", "ablehnen",
    "cookie consent", "datenschutzeinstellungen",
    "cookie notice", "cookiehinweis", "cookie-hinweis",
  ];
  const lower = html.toLowerCase();
  const matches = cookieKeywords.filter((k) => lower.includes(k));
  return matches.length >= 2;
}

function hasKontaktdaten(text: string): boolean {
  const patterns = [
    /tel[:. ]/i, /telefon/i, /mobil/i,
    /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/,
    /straße|str\.|weg\s|platz/i,
  ];
  return patterns.some((p) => p.test(text));
}

export async function scanWebsite(inputUrl: string): Promise<ScanResult> {
  const url = normalizeUrl(inputUrl);
  const details: string[] = [];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "DSGVO-Check-Scanner/1.0 (Compliance-Checker)",
        "Accept": "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);

    const html = await response.text();
    const text = extractText(html);
    const links = extractLinks(html);

    const impressumCheck: CheckResult = (() => {
      const foundInLink = links.some(
        (l) =>
          l.href.includes("impressum") ||
          l.text.includes("impressum") ||
          l.text.includes("impressum")
      );
      const foundInText = /impressum/i.test(text);
      const found = foundInLink || foundInText;
      return {
        found,
        passed: found,
        detail: found
          ? "Impressum-Seite gefunden"
          : "Kein Impressum-Link oder -Verweis gefunden",
      };
    })();

    const datenschutzCheck: CheckResult = (() => {
      const foundInLink = links.some(
        (l) =>
          l.href.includes("datenschutz") ||
          l.href.includes("datenschutzerklaerung") ||
          l.href.includes("privacy") ||
          l.text.includes("datenschutz") ||
          l.text.includes("datenschutzerklärung") ||
          l.text.includes("privacy")
      );
      const foundInText = /datenschutz|datenschutzerklärung|privacy/i.test(text);
      const found = foundInLink || foundInText;
      return {
        found,
        passed: found,
        detail: found
          ? "Datenschutzerklärung gefunden"
          : "Keine Datenschutzerklärung gefunden",
      };
    })();

    const cookieBannerCheck: CheckResult = (() => {
      const found = hasCookieBanner(html, text);
      return {
        found,
        passed: found,
        detail: found
          ? "Cookie-Banner / Einwilligungshinweis gefunden"
          : "Kein Cookie-Banner erkannt",
      };
    })();

    const kontaktdatenCheck: CheckResult = (() => {
      const found = hasKontaktdaten(text);
      return {
        found,
        passed: found,
        detail: found
          ? "Kontaktdaten (Telefon/E-Mail/Adresse) gefunden"
          : "Keine eindeutigen Kontaktdaten gefunden",
      };
    })();

    const agbCheck: CheckResult = (() => {
      const foundInLink = links.some(
        (l) =>
          l.href.includes("agb") ||
          l.href.includes("terms") ||
          l.href.includes("allgemeine-geschaeftsbedingungen") ||
          l.text.includes("agb") ||
          l.text.includes("allgemeine geschäftsbedingungen") ||
          l.text.includes("terms")
      );
      const foundInText = /agb|allgemeine geschäftsbedingungen|terms and conditions/i.test(text);
      return {
        found: foundInLink || foundInText,
        passed: foundInLink || foundInText,
        detail: (foundInLink || foundInText)
          ? "AGB-Seite gefunden"
          : "Keine AGB gefunden (optional, nur bei kostenpflichtigen Angeboten)",
      };
    })();

    const widerrufCheck: CheckResult = (() => {
      const foundInLink = links.some(
        (l) =>
          l.href.includes("widerruf") ||
          l.href.includes("widerrufsbelehrung") ||
          l.href.includes("withdrawal") ||
          l.text.includes("widerruf") ||
          l.text.includes("widerrufsbelehrung") ||
          l.text.includes("withdrawal")
      );
      const foundInText = /widerruf|widerrufsbelehrung/i.test(text);
      return {
        found: foundInLink || foundInText,
        passed: foundInLink || foundInText,
        detail: (foundInLink || foundInText)
          ? "Widerrufsbelehrung gefunden"
          : "Keine Widerrufsbelehrung gefunden (optional, nur bei B2C)",
      };
    })();

    const sslCheck: CheckResult = {
      found: url.startsWith("https://"),
      passed: url.startsWith("https://"),
      detail: url.startsWith("https://")
        ? "SSL-Verschlüsselung aktiv (HTTPS)"
        : "Keine SSL-Verschlüsselung (HTTP)",
    };

    const checks = [
      impressumCheck,
      datenschutzCheck,
      cookieBannerCheck,
      kontaktdatenCheck,
      sslCheck,
      agbCheck,
      widerrufCheck,
    ];
    const passedCount = checks.filter((c) => c.passed).length;
    const score = Math.round((passedCount / checks.length) * 100);

    return { url, score, checks: { impressum: impressumCheck, datenschutz: datenschutzCheck, cookieBanner: cookieBannerCheck, kontaktdaten: kontaktdatenCheck, ssl: sslCheck, agb: agbCheck, widerruf: widerrufCheck }, details };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler";
    return {
      url,
      score: 0,
      checks: {
        impressum: { passed: false, found: false, detail: "Nicht geprüft" },
        datenschutz: { passed: false, found: false, detail: "Nicht geprüft" },
        cookieBanner: { passed: false, found: false, detail: "Nicht geprüft" },
        kontaktdaten: { passed: false, found: false, detail: "Nicht geprüft" },
        ssl: { passed: false, found: false, detail: "Nicht geprüft" },
        agb: { passed: false, found: false, detail: "Nicht geprüft" },
        widerruf: { passed: false, found: false, detail: "Nicht geprüft" },
      },
      details: [],
      error: message,
    };
  }
}
