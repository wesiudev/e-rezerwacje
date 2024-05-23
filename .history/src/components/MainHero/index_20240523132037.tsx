import Image from "next/image";
import Link from "next/link";

export default function MainHero() {
  return (
    <div className="lg:grid grid-cols-2 py-24 pl-4 md:pl-8 lg:pl-12 xl:pl-20 2xl:pl-32 ">
      <div className="flex flex-col">
        <h1 className="text-3xl sm:text-6xl font-bold text-center lg:text-left text-zinc-800 drop-shadow-xl shadow-black">
          SYSTEMY REZERWACJI
        </h1>
        <p className="italic mt-12 font-light text-lg text-gray-600">
          Zainstalujemy przystępny i prosty w obsłudze system rezerwacji na
          każdej stronie. Utwórz i skonfiguruj swoje konto firmowe już dziś.
        </p>
        <Link
          href="/dashboard"
          className="text-white font-light hover:bg-[#72b901a6] mt-12 px-12 py-3 text-lg bg-[#74B901] w-max mx-auto lg:mx-0"
        >
          Dołącz teraz
        </Link>
      </div>
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
