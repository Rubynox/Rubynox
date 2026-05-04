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
    "Rubynox builds premium websites, apps, automation systems, dashboards, APIs, and AI solutions for growing businesses.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const themeScript = `
    (function () {
      try {
        var theme = localStorage.getItem("rubynox-theme") || "light";
        document.documentElement.setAttribute("data-theme", theme);
      } catch (e) {
        document.documentElement.setAttribute("data-theme", "light");
      }
    })();
  `;

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      {/* ❌ removed bg-midnight */}
      <body className="font-sans antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}