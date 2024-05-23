import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-[50vh] w-full px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-12 lg:py-20 bg-billboard bg-cover bg-center md:bg-left relative flex items-center justify-center">
      <div className="absolute left-0 top-0 bg-zinc-800 w-full h-full opacity-70 z-0" />
      <div className="flex flex-col items-center justify-center w-full relative z-10">
        <h2 className=" text-[#74B901] text-2xl sm:text-3xl lg:text-4xl drop-shadow-xl shadow-black text-center mb-4">
          Agencja Reklamowa W Grudziądzu -{" "}
          <span className="">Kim jesteśmy?</span>
        </h2>
        <p className="font-light flex items-center justify-center text-center w-full lg:w-1/2 text-[13px] sm:text-sm lg:mx-auto text-white ">
          Od 35 lat jesteśmy solidną firmą, która rozwijała się z pasji i
          zaangażowania. Początki naszej działalności to czasy, gdy technologia
          komputerowa dopiero wkraczała na rynek, a my, jako pionierzy w branży,
          podjęliśmy wyzwanie stając się jedną z pierwszych firm w Polsce, z
          siedzibą w Grudziądzu.
        </p>
        <p className="font-light mt-4 flex items-center justify-center text-center w-full lg:w-1/2 lg:mx-auto text-[13px] sm:text-sm text-white">
          Dziś, korzystając z najnowocześniejszego sprzętu, oferujemy
          kompleksowe usługi w zakresie reklamy wizualnej. Niezależnie od tego,
          czy potrzebujesz małej tabliczki reklamowej czy imponującego totemu
          reklamowego, jesteśmy gotowi sprostać Twoim oczekiwaniom.
        </p>
        <Link
          href="/o-firmie"
          className="font-bold text-white hover:underline group flex items-center mt-8"
        >
          Czytaj dalej
          <FaLongArrowAltRight className="ml-1 translate-x-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 duration-300" />
        </Link>
      </div>
    </div>
  );
}
