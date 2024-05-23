import { Metadata } from "next";
import UnderHeaderInfo from "./(dashboard)/components/Header/UnderHeaderInfo";
import ContactInfo from "./(dashboard)/components/Header/ContactInfo";
import GetQuote from "./(dashboard)/components/MainPageComponents/GetQuote";
import About from "./(dashboard)/components/MainPageComponents/About/About";
import MainHero from "@/components/MainHero";
import Header from "./(dashboard)/components/Header";
import { getProducts } from "@/firebase";

export const metadata: Metadata = {
  title: "E-Rezerwacje - System zarządzania rezerwacjami",
  description:
    "E-Rezerwacje to zaawansowany system zarządzania rezerwacjami, zaprojektowany z myślą o firmach i instytucjach, które pragną zoptymalizować procesy związane z rezerwacjami. Nasze rozwiązanie oferuje intuicyjny interfejs, który ułatwia zarządzanie rezerwacjami w czasie rzeczywistym, poprawiając efektywność operacyjną i zadowolenie klientów.",
  authors: [{ name: "e-rezerwacje.com", url: "https://e-rezerwacje.com" }],
  publisher: "e-rezerwacje.com",
};

export default async function Page() {
  const products = await getProducts();
  return (
    <div className="min-h-screen overflow-x-hidden relative sm:mt-[92px]">
      <Header products={products} />
      <MainHero />
      <UnderHeaderInfo />
      <ContactInfo />
      <GetQuote />
      <About />
    </div>
  );
}
