import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { mockEvents } from "@/data/mock-events";
import { EventDiscovery } from "@/components/event-map/EventDiscovery";
import { PlusIcon } from "@heroicons/react/24/outline";

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
            <PlusIcon aria-hidden="true" className="size-1/2" strokeWidth={2} />
          </ButtonLink>
        </EventDiscovery>
      </main>
    </div>
  );
}
