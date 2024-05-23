import Image from "next/image";
import Link from "next/link";

export default function MainHero() {
  return (
    <div className="lg:grid grid-cols-2 py-24">
      <div className="flex"></div>
      <div className="flex w-full xl:justify-center justify-center lg:justify-end relative">
        <div className="w-max relative">
          <div className="absolute w-[160px] h-[30px] z-[99] bg-black rounded-full opacity-10 -bottom-[50px] translate-x-2/3 animate-left-to-right"></div>
          <Image
            src="/calendar.png"
            width={500}
            height={500}
            alt="E-rezerwacje systemy rezerwacji online"
            className="w-[320px] animate-left-to-right"
          />
        </div>
      </div>
    </div>
  );
}
