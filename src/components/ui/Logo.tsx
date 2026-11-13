import Image from "next/image";

export function Logo() {
  return (
    <Image
      className="size-[clamp(2.5rem,8vw,5rem)] shrink-0"
      src="/boredom-terminator-logo-full.png"
      alt="Boredom Terminator robot cat"
      width={100}
      height={100}
      priority
    />
  );
}
