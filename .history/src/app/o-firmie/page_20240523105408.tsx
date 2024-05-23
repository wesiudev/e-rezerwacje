import Link from "next/link";
import UnderHeaderInfo from "../(dashboard)/components/Header/UnderHeaderInfo";
import ContactInfo from "../(dashboard)/components/Header/ContactInfo";
import { getProducts } from "@/firebase";
import Header from "../(dashboard)/components/Header";
import Hero from "../(dashboard)/components/Hero";

export default async function Page() {
  const products = await getProducts();
  return (
    <>
      <Header products={products} />
      <UnderHeaderInfo />
      <ContactInfo />
      <div className="sm:mt-[130px] w-full relative flex flex-row flex-wrap p-12 space-x-12">
        <h1 className="w-full py-12 text-zinc-700 font-bold text-7xl sm:text-9xl drop-shadow-xl shadow-black">
          Kilka Słów O Firmie
          <div className="flex w-max px-12 pt-12">
            {/* <div className="aspect-square left-0 top-0 bg-[#74B901] w-12"></div>
            <div className="aspect-square left-0 top-0 bg-[#009CE7] w-12"></div>
            <div className="aspect-square left-0 top-0 bg-[#B00285] w-12"></div>
            <div className="aspect-square left-0 top-0 bg-[#FEBE00] w-12"></div> */}
            <div className="aspect-square left-0 top-0 bg-[#AD7BFF] w-12"></div>
            <div className="aspect-square left-0 top-0 bg-[#F81717] w-12"></div>
            <div className="aspect-square left-0 top-0 bg-[#74B901] w-12"></div>
            <div className="aspect-square left-0 top-0 bg-[#36B3F9] w-12"></div>
          </div>
        </h1>

        <p className="text-justify sm:text-left sm:max-w-[40rem] font-light">
          Na naszej stronie można łatwo stworzyć profil firmy, co umożliwia
          klientom rezerwację usług bezpośrednio przez internet. Dzięki temu,
          zarządzanie rezerwacjami staje się prostsze i bardziej efektywne.
        </p>
        <p className="text-justify sm:text-left sm:max-w-[40rem] font-light">
          Korzystanie z naszych usług zapewnia wygodę oraz oszczędność czasu
          dzięki intuicyjnemu systemowi rezerwacji online. Dodatkowo, oferujemy
          wsparcie techniczne oraz regularne aktualizacje, aby sprostać
          dynamicznym wymaganiom rynku.
        </p>
        <div className="w-full">
          <Link
            href="/dashboard"
            className="bg-[#74B901] w-max mt-8 bg-opacity-100 hover:bg-opacity-80 duration-100 text-white px-8 py-4 relative overflow-hidden items-center flex justify-center text-center "
          >
            <Hero />
            DOŁĄCZ DO NAS
          </Link>
        </div>
      </div>
    </>
  );
}
