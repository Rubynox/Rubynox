import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Rubynox | Software Agency",
  description:
    "Rubynox builds premium websites, apps, automation systems, dashboards, APIs, and practical AI solutions for growing businesses.",
  metadataBase: new URL("https://rubynox.com"),
  openGraph: {
    title: "Rubynox | Software Agency",
    description:
      "Premium software development, automation, and AI support for business teams.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `
    try {
      var theme = localStorage.getItem("rubynox-theme") || "light";
      document.documentElement.dataset.theme = theme;
    } catch (_) {
      document.documentElement.dataset.theme = "light";
    }
  `;

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-midnight">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
