"use client";

import type { MapEvent } from "@/domain/events/types";
import { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [event.id]);

  return (
    <section className="fixed inset-0 z-[1000] overflow-y-auto bg-base-100 p-4 text-base-content shadow-lg sm:absolute sm:inset-auto sm:right-4 sm:bottom-4 sm:max-h-[calc(100%-2rem)] sm:w-80 sm:rounded-box">
      <button
        type="button"
        className="btn btn-ghost btn-circle absolute top-2 right-2"
        aria-label="Zavřít"
        onClick={onClose}
      >
        <XMarkIcon aria-hidden="true" className="size-5" strokeWidth={2} />
      </button>
      <h2 className="pr-12" ref={headingRef} tabIndex={-1}>
        {event.title}
      </h2>
    </section>
  );
};
