import Contact from "@/components/Contact";
import ContactInfo from "../(dashboard)/components/Header/ContactInfo";
import UnderHeaderInfo from "../(dashboard)/components/Header/UnderHeaderInfo";
import { getProducts } from "@/firebase";
import Header from "../(dashboard)/components/Header";
import Footer from "@/components/Footer";

export default async function Page() {
  const products = await getProducts();
  return (
    <>
      <Header products={products} />
      <UnderHeaderInfo />
      <ContactInfo />
      <div className="sm:mt-[130px] flex flex-wrap lg:grid lg:grid-cols-2 w-full px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
        <div className="w-full lg:max-w-[40rem] py-12 text-zinc-700 font-bold text-6xl px-6 sm:text-7xl drop-shadow-xl shadow-black">
          <h1 className="">Skontaktuj się z nami</h1>

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
          <p className="font-light text-base mt-12 px-12 text-square lg:max-w-[40rem]">
            Dziękujemy za zainteresowanie naszą ofertą. Aby uzyskać szczegółową
            pomoc naszego doradcy dostosowaną do Państwa potrzeb, prosimy o
            wypełnienie poniższego formularza kontaktowego. Nasi specjaliści
            skontaktują się z Państwem w najkrótszym możliwym czasie, aby omówić
            wszelkie szczegóły i zaproponować najbardziej efektywne rozwiązania.
          </p>
        </div>

        <Contact />
      </div>
      <Footer products={products} />
    </>
  );
}
