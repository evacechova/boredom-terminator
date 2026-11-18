import { Logo } from "@/components/ui/Logo";
import { mockEvents } from "@/data/mock-events";
import { EventMapContainer } from "@/components/event-map-container/EventMapContainer";

export default function Home() {
  return (
    <div className="bg-base-100 flex flex-1 flex-col items-center justify-center font-sans h-dvh">
      <header className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:gap-5 sm:py-4">
        <Logo />
        <h1 className="text-base-content text-right text-[clamp(1.125rem,4vw,2.25rem)] font-semibold leading-tight tracking-tight">
          Boredom Terminator
        </h1>
      </header>
      <main className="bg-base-100 w-full flex-1 relative min-h-0">
        <EventMapContainer events={mockEvents} />
      </main>
    </div>
  );
}
