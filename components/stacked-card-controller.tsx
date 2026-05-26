"use client";

import { useEffect } from "react";

export function StackedCardController() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".stacked-section"));

    if (!cards.length) {
      return;
    }

    function updateStackOffsets() {
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const viewportHeight = window.innerHeight;
      const mobileHeaderOffset = 86;
      const bottomBreathingRoom = 12;

      cards.forEach((card) => {
        if (!isMobile) {
          card.style.removeProperty("--stack-sticky-top");
          return;
        }

        const cardHeight = card.offsetHeight;
        const top = Math.min(mobileHeaderOffset, viewportHeight - cardHeight - bottomBreathingRoom);
        card.style.setProperty("--stack-sticky-top", `${Math.round(top)}px`);
      });
    }

    updateStackOffsets();

    const resizeObserver = new ResizeObserver(updateStackOffsets);
    cards.forEach((card) => resizeObserver.observe(card));

    window.addEventListener("resize", updateStackOffsets);
    window.addEventListener("orientationchange", updateStackOffsets);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateStackOffsets);
      window.removeEventListener("orientationchange", updateStackOffsets);
    };
  }, []);

  return null;
}
