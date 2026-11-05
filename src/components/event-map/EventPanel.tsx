"use client";

import type { MapEvent } from "@/domain/events/types";
import { useEffect } from "react";

type EventPanelProps = {
  event: MapEvent;
  onClose: () => void;
};

export const EventPanel = ({ event, onClose }: EventPanelProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <section className="absolute right-4 bottom-4 left-4 z-[1000] rounded-box bg-base-100 p-4 text-base-content shadow-lg">
      <button className="hover:underline" onClick={onClose}>
        Zavřít
      </button>
      <h2>{event.title}</h2>
    </section>
  );
};
