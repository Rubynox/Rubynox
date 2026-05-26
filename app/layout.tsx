import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rubynoxx.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rubynoxx | Corporate Web Solutions & Digital Presence",
    template: "%s | Rubynoxx"
  },
  description:
    "Rubynoxx builds corporate web solutions, custom digital platforms, and scalable online presence systems for growing businesses.",
  keywords: [
    "Rubynoxx",
    "Rubynoxx software company",
    "Rubynoxx corporate web solutions",
    "Rubynoxx digital presence",
    "rubynox",
    "rubunix",
    "rubunoxx",
    "custom software agency",
    "web solutions company",
    "business automation agency"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Rubynoxx | Corporate Web Solutions & Digital Presence",
    description:
      "Corporate web solutions, custom digital platforms, and scalable online presence systems for growing businesses.",
    url: siteUrl,
    siteName: "Rubynoxx",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubynoxx | Corporate Web Solutions & Digital Presence",
    description:
      "Rubynoxx builds corporate web solutions and online presence systems that help businesses grow digitally."
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const themeScript = `
    (function () {
      try {
        var stored = localStorage.getItem("rubynoxx-theme");
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
    name: "Rubynoxx",
    legalName: "Rubynoxx",
    alternateName: ["rubynox", "rubunix", "rubunoxx", "Rubynox", "Rubunix", "Rubunoxx"],
    url: siteUrl,
    description:
      "Rubynoxx builds corporate web solutions, custom digital platforms, and scalable online presence systems.",
    email: "hello@rubynoxx.com",
    logo: `${siteUrl}/logo-light.png`,
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
