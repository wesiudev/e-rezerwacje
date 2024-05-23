import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-[50vh] w-full px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-12 lg:py-20 bg-billboard bg-cover bg-center md:bg-left relative flex items-center justify-center overflow-hidden">
      <div className="absolute left-0 top-0 bg-[#74B901] w-full h-full opacity-70 z-0" />
      <div className="group flex flex-col items-center justify-center w-full relative z-10">
        <Image
          src="https://wesiudev.netlify.app/_next/image?url=%2Fimages%2Fprojects%2Fmanicuregrudziadz%2Frezerwacje.webp&w=1920&q=75"
          width={1024}
          height={1024}
          alt=""
          className="z-0 absolute inset-0 object-cover w-full h-full scale-150 rotate-[30deg]"
        />
        <h2 className=" text-[#009CE5] text-2xl sm:text-3xl lg:text-4xl drop-shadow-xl shadow-black text-center mb-4 z-50 relative">
          Wdrażamy Systemy Rezerwacji w kilka minut!
        </h2>
        <p className="font-light flex items-center justify-center text-center w-full lg:w-1/2 text-[13px] sm:text-sm lg:mx-auto text-white  z-50 relative">
          E-Rezerwacje to zaawansowany system zarządzania rezerwacjami,
          zaprojektowany z myślą o firmach i instytucjach, które pragną
          zoptymalizować procesy związane z rezerwacjami. Nasze rozwiązanie
          oferuje intuicyjny interfejs, który ułatwia zarządzanie rezerwacjami w
          czasie rzeczywistym, poprawiając efektywność operacyjną i zadowolenie
          klientów.
        </p>
        <p className="font-light mt-4 flex items-center justify-center text-center w-full lg:w-1/2 lg:mx-auto text-[13px] sm:text-sm text-white z-50 relative">
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
