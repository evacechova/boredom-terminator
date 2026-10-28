import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-base-100 flex flex-1 flex-col items-center justify-center font-sans">
      <main className="bg-base-100 flex w-full max-w-3xl flex-1 flex-col items-center justify-between px-16 py-32 sm:items-start">
        <Image
          className="h-20 w-20"
          src="/boredom-terminator-logo.svg"
          alt="Boredom Terminator robot cat"
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-base-content max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            Boredom Terminator
          </h1>
          <p className="text-base-content/70 max-w-md text-lg leading-8">
            <Link href="/events/new" className="btn btn-primary">
              Add event
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
