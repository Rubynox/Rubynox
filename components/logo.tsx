"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Logo() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const getTheme = () => {
      const current = document.documentElement.getAttribute("data-theme");
      return current === "dark" ? "dark" : "light";
    };

    setTheme(getTheme());

    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center h-12">
      <Image
        src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt="Rubynox"
        width={220}
        height={60}
        priority
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}