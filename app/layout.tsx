import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rubunoxx.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rubunoxx | Websites, Apps, AI Tools, and Custom Software",
    template: "%s | Rubunoxx"
  },
  description:
    "Rubunoxx builds websites, apps, AI tools, dashboards, CRM systems, automation, and custom software for growing businesses.",
  keywords: [
    "Rubunoxx",
    "Rubunoxx software company",
    "Rubunoxx AI agency",
    "Rubunoxx web development",
    "custom software agency",
    "business automation agency"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Rubunoxx | Software Company for Websites, Apps, AI, and Automation",
    description:
      "Simple, reliable software for businesses: websites, apps, AI tools, dashboards, CRM systems, and automation.",
    url: siteUrl,
    siteName: "Rubunoxx",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubunoxx | Websites, Apps, AI Tools, and Custom Software",
    description:
      "Rubunoxx builds clean software and automation systems that help businesses work better."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const themeScript = `
    (function () {
      try {
        var stored = localStorage.getItem("rubunoxx-theme");
        var theme = stored === "dark" || stored === "light" ? stored : "light";
        document.documentElement.setAttribute("data-theme", theme);
      } catch (e) {
        document.documentElement.setAttribute("data-theme", "light");
      }
    })();
  `;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rubunoxx",
    url: siteUrl,
    description:
      "Rubunoxx builds websites, apps, AI tools, dashboards, CRM systems, automation, and custom software.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8779636850",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"]
    },
    sameAs: []
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans bg-midnight text-ink antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
