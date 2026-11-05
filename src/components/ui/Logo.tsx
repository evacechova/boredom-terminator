import Image from "next/image";

export function Logo() {
  return (
    <Image
      className="h-20 w-20"
      src="/boredom-terminator-logo-full.png"
      alt="Boredom Terminator robot cat"
      width={100}
      height={100}
      priority
    />
  );
}
