import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-[50vh] w-full px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-12 lg:py-20 bg-billboard bg-cover bg-center md:bg-left relative flex items-center justify-center">
      <div className="absolute left-0 top-0 bg-zinc-800 w-full h-full opacity-70 z-0" />
      <div className="flex flex-col items-center justify-center w-full relative z-10">
        <h2 className=" text-[#74B901] text-2xl sm:text-3xl lg:text-4xl drop-shadow-xl shadow-black text-center mb-4">
          Tworzymy Systemy Rezerwacji
          <span className="">Kim jesteśmy?</span>
        </h2>
        <p className="font-light flex items-center justify-center text-center w-full lg:w-1/2 text-[13px] sm:text-sm lg:mx-auto text-white ">
          E-Rezerwacje to zaawansowany system zarządzania rezerwacjami,
          zaprojektowany z myślą o firmach i instytucjach, które pragną
          zoptymalizować procesy związane z rezerwacjami. Nasze rozwiązanie
          oferuje intuicyjny interfejs, który ułatwia zarządzanie rezerwacjami w
          czasie rzeczywistym, poprawiając efektywność operacyjną i zadowolenie
          klientów.
        </p>
        <p className="font-light mt-4 flex items-center justify-center text-center w-full lg:w-1/2 lg:mx-auto text-[13px] sm:text-sm text-white">
          System rezerwacji jest szczególnie przydatny dla prawników,
          automatyzując procesy rezerwacyjne i ułatwiając komunikację z
          klientami. Dzięki E-Rezerwacjom możesz skupić się na kluczowych
          aspektach swojej pracy, podczas gdy my dbamy o sprawne zarządzanie
          harmonogramem. Nasza technologia wspiera nowoczesne kancelarie prawne,
          umożliwiając im świadczenie usług na najwyższym poziomie.
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
