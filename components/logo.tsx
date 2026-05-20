"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Logo() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    function readTheme() {
      return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    }

    setTheme(readTheme());

    const observer = new MutationObserver(() => {
      setTheme(readTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-14 w-[184px] items-center sm:w-[214px]">
      <Image
        src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt="Rubunoxx"
        width={260}
        height={76}
        priority
        className="h-12 w-auto object-contain sm:h-14"
        sizes="(max-width: 640px) 184px, 214px"
      />
    </div>
  );
}
