import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <Image
          className="h-20 w-20"
          src="/boredom-terminator-logo.svg"
          alt="Boredom Terminator robot cat"
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            Boredom Terminator
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">
            <Link href="/events/new" className="font-medium text-zinc-950">
              Add event
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
