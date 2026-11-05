import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { mockEvents } from "@/data/mock-events";
import { EventDiscovery } from "@/components/event-map/EventDiscovery";

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
        <EventDiscovery events={mockEvents}>
          <ButtonLink
            href="/events/new"
            aria-label="Add event"
            className="btn-circle fixed right-4 bottom-[max(2rem,env(safe-area-inset-bottom))] z-[1000] size-[clamp(3rem,8vw,4rem)] shadow-lg sm:right-6"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-1/2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </ButtonLink>
        </EventDiscovery>
      </main>
    </div>
  );
}
