import { capitalizeFirstLetter } from "../../../lib/capitalizeFirstLetter";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";

export default function Footer({ products }: { products: any[] }) {
  const footerProductsUrls = products.map((product: any) => ({
    url: product.url,
    urlLabel: product.urlLabel,
    additionalPage: product.additionalPage || false,
  }));

  return (
    <div className="w-full pt-12 pb-48 px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 min-h-[300px] bg-white">
      {/* image & info */}
      <div className="p-3 flex flex-col text-center sm:text-left sm:items-start sm:justify-start lg:col-span-1">
        <Image
          src="/logo.png"
          width={200}
          height={150}
          alt="Agencja Reklamowa W Grudziądzu Grudziądz"
          className="max-w-[300px] mx-auto"
        />
        <p className="text-zinc-800 text-base mt-12 text-square font-light">
          Nasza firma skupia zespół doświadczonych specjalistów, których misją
          jest dostarczanie innowacyjnych rozwiązań z zakresu systemów
          rezerwacji. Niezależnie od tego, czy prowadzisz salon kosmetyczny,
          restaurację, gabinet medyczny czy jakikolwiek inny biznes, nasze
          rozwiązania są dla Ciebie. Nasza praca opiera się na zrozumieniu
          unikalnych potrzeb każdego klienta i dostarczeniu mu narzędzia, które
          nie tylko ułatwią codzienną pracę, ale także pomogą zwiększyć
          zadowolenie klientów i efektywność działania.
        </p>
      </div>

      {/* products */}
      <div className="p-3 flex flex-col text-center sm:text-left sm:items-start sm:justify-start lg:col-span-2">
        <h2 className="border-b-2 border-[#020CB1] py-3 w-full text-center text-zinc-800 ">
          Produkty
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 w-full py-6 text-zinc-800 text-sm ml-1 font-light">
          {...footerProductsUrls
            .sort((a, b) =>
              a.urlLabel.localeCompare(b.urlLabel, undefined, {
                sensitivity: "base",
              })
            )
            .map((product: any, i: any) => (
              <Link
                key={i}
                title={`Zobacz produkt ${product.urlLabel}`}
                href={product.url}
                className="hover:bg-[#020CB1] py-2 w-full text-center hover:bg-opacity-20 duration-500"
              >
                {capitalizeFirstLetter(product.urlLabel)}
              </Link>
            ))}
        </div>
      </div>
      {/* contact */}
      <div className="p-3 flex flex-col text-center sm:text-left sm:items-start sm:justify-center lg:justify-start col-span-1 w-full text-zinc-800">
        <h2 className="border-b-2 border-[#020CB1] py-3 w-full text-center text-zinc-800 ">
          Kontakt
        </h2>
        <div className="flex flex-col py-6 pl-0 font-light">
          <h3 className="text-2xl font-bold my-2">Biuro</h3>
          <Link
            href="mailto:biuro@e-rezerwacje.com.pl"
            className="icon-link hover:bg-[#040BB0] py-2 px-3 hover:bg-opacity-20 duration-500 w-max"
          >
            <FaEnvelope />{" "}
            <div className="text-sm ml-1">biuro@e-rezerwacje.com.pl</div>
          </Link>{" "}
          <h3 className="text-2xl font-bold my-2">Paweł</h3>
          <Link
            href="mailto:marcin@e-rezerwacje.com.pl"
            className="icon-link hover:bg-[#040BB0] py-2 w-max px-3 hover:bg-opacity-20 duration-500"
          >
            <FaEnvelope />{" "}
            <div className="text-sm ml-1">pawel@e-rezerwacje.com.pl</div>
          </Link>{" "}
          <Link
            href="tel:+48721417154"
            className="icon-link hover:bg-[#040BB0] py-2 w-max px-3 hover:bg-opacity-20 duration-500"
          >
            <FaPhone /> <div className="text-sm ml-1">721 417 154</div>
          </Link>
          <h3 className="text-2xl font-bold my-2">Marcin</h3>
          <Link
            href="mailto:wioletta@e-rezerwacje.com.pl"
            className="icon-link hover:bg-[#040BB0] py-2 px-3 hover:bg-opacity-20 duration-500 w-max"
          >
            <FaEnvelope />{" "}
            <div className="text-sm ml-1">marcin@e-rezerwacje.com.pl</div>
          </Link>
          <Link
            href="tel:+48606136200"
            className="icon-link hover:bg-[#040BB0] py-2 w-max px-3 hover:bg-opacity-20 duration-500"
          >
            <FaPhone /> <div className="text-sm ml-1">333 333 333</div>
          </Link>
          <Link
            href="tel:+48606136400"
            className="icon-link hover:bg-[#040BB0] py-2 w-max px-3 hover:bg-opacity-20 duration-500"
          >
            <FaPhone /> <div className="text-sm ml-1">333 333 333</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
