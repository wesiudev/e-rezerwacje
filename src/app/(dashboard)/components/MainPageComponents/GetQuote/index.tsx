import Link from "next/link";
import { FaArrowRight, FaPhoneVolume } from "react-icons/fa";
import Hero from "../../../components/Hero";
export default function GetQuote() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center bg-[#009CE5] w-full h-[30vh] px-24 py-12 lg:py-0 relative">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Hero />
      </div>
      <FaArrowRight className="absolute left-6 top-3 text-white text-2xl rotate-[26deg] animate-pulse duration-500" />
      <FaArrowRight className="absolute right-6 bottom-3 text-white text-2xl rotate-[-155deg] opacity-50" />
      <div className="text-white text-xl xl:text-3xl font-normal text-center flex items-center justify-center w-max  relative z-50">
        Utwórz swój własny system rezerwacji!
      </div>
      <Link
        href="/dashboard"
        className="group text-zinc-800 font-bold drop-shadow-sm shadow-black rounded-3xl py-2 px-6 bg-white text-sm lg:text-lg w-max h-max my-auto mx-4 duration-300 relative z-50"
      >
        <div className="px-4 rounded-3xl bg-white w-max">DOŁĄCZ DO NAS</div>
      </Link>
    </div>
  );
}
