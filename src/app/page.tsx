import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { mockEvents } from "@/data/mock-events";
import { EventDiscovery } from "@/components/event-map/EventDiscovery";

export default function Home() {
  return (
    <div className="bg-base-100 flex flex-1 flex-col items-center justify-center font-sans h-dvh">
      <header>
        <Logo />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-base-content max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            Boredom Terminator
          </h1>
          <p className="text-base-content/70 max-w-md text-lg leading-8">
            <ButtonLink href="/events/new">Add event</ButtonLink>
          </p>
        </div>
      </header>
      <main className="bg-base-100 w-full flex-1 relative min-h-0">
        <EventDiscovery events={mockEvents} />
      </main>
    </div>
  );
}
