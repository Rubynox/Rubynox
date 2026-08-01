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
    default: "Rubynoxx | Websites, Custom Software & AI Solutions",
    template: "%s | Rubynoxx"
  },
  description:
    "Rubynoxx builds websites, custom software, automation systems, and AI solutions that help growing businesses improve operations and credibility.",
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
    title: "Rubynoxx | Websites, Custom Software & AI Solutions",
    description:
      "Rubynoxx builds websites, custom software, automation systems, and AI solutions that help growing businesses improve operations and credibility.",
    url: siteUrl,
    siteName: "Rubynoxx",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubynoxx | Websites, Custom Software & AI Solutions",
    description:
      "Rubynoxx builds websites, custom software, automation systems, and AI solutions that help growing businesses improve operations and credibility."
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
    alternateName: ["rubynox", "rubunix", "rubunoxx"],
    url: "https://rubynoxx.com/",
    logo: "https://rubynoxx.com/logo.png",
    description:
      "Rubynoxx builds websites, custom software, automation systems, and AI solutions that help growing businesses improve operations and credibility.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "",
      contactType: "customer service"
    }
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
