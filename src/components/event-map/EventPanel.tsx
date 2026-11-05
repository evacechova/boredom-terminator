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
    <section className="fixed inset-0 z-[1000] overflow-y-auto bg-base-100 p-4 text-base-content shadow-lg sm:absolute sm:inset-auto sm:right-4 sm:bottom-4 sm:max-h-[calc(100%-2rem)] sm:w-80 sm:rounded-box">
      <button
        type="button"
        className="btn btn-ghost btn-circle absolute top-2 right-2"
        aria-label="Zavřít"
        onClick={onClose}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="m6 6 12 12M6 18 18 6" strokeLinecap="round" />
        </svg>
      </button>
      <h2 className="pr-12">{event.title}</h2>
    </section>
  );
};
