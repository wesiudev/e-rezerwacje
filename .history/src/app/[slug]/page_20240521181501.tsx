import { getProductByUrl, getProducts } from "@/firebase";
import { renderMarkdown } from "../../../lib/parseMarkdown";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import ThreeHoverableElements from "@/components/MainPageComponents/ThreeHoverableElements";
import UnderHeaderInfo from "@/components/Header/UnderHeaderInfo";
import ContactInfo from "@/components/Header/ContactInfo";
import GetQuote from "@/components/MainPageComponents/GetQuote";
import ImageGridWithPreview from "@/components/MainPageComponents/CaseStudies/ImageGridWithPreview";
import DraggableProductList from "@/components/DraggableProductList";
import Contact from "@/components/Contact";
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product: any) => ({
    slug: product.url,
  }));
}
export const revalidate = 30;
export default async function Page({ params }: { params: any }) {
  const product: any = await getProductByUrl(params.slug);
  const products: any = await getProducts();
  const otherProducts = products
    .filter((p: any) => p.url !== params.slug && !p.additionalPage)
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  return (
    <>
      <UnderHeaderInfo />
      <ContactInfo />
      <div className="px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 mt-24 lg:mt-44">
        {product?.title && (
          <h1 className="text-5xl font-bold text-left mb-6 lg:hidden drop-shadow-xl shadow-black text-zinc-800 font-cocobold">
            {product?.title}
          </h1>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto">
          <div className="flex flex-col">
            {product?.title && (
              <h1 className="hidden lg:block text-5xl font-bold text-left mb-6 drop-shadow-xl shadow-black text-zinc-800 font-cocobold">
                {product?.title}
              </h1>
            )}
            {product?.shortDesc && (
              <div
                className="bg-[#74B901] px-3 rounded-lg text-white !font-light"
                dangerouslySetInnerHTML={renderMarkdown(product?.shortDesc)}
              />
            )}
            {!product.primaryImage && (
              <div className="bg-gray-300 hover:bg-opacity-80 duration-300 flex items-center justify-center rounded-3xl w-full aspect-square mt-6 lg:hidden text-7xl text-gray-500">
                <FaImage />
              </div>
            )}
            {product?.primaryImage !== "" && (
              <Image
                src={product?.primaryImage}
                width={1024}
                height={1024}
                alt={`Obrazek glowny ${product?.title}`}
                className="w-full h-auto rounded-xl mt-6 lg:hidden"
              />
            )}
            {product?.text1Title && (
              <h2 className="text-2xl font-bold mt-6 drop-shadow-xl shadow-black text-zinc-800 font-cocobold">
                {product?.text1Title}
              </h2>
            )}
            {product?.text1Desc && (
              <div
                className="text-gray-700 font-light"
                dangerouslySetInnerHTML={renderMarkdown(product?.text1Desc)}
              />
            )}
            {product?.text2Title && (
              <h2 className="text-2xl font-bold mt-12 drop-shadow-xl shadow-black text-zinc-800 font-cocobold">
                {product?.text2Title}
              </h2>
            )}
            {product?.text2Desc && (
              <div
                className="text-gray-700 font-light"
                dangerouslySetInnerHTML={renderMarkdown(product?.text2Desc)}
              />
            )}
          </div>
          <div className="flex flex-col">
            {!product.primaryImage && (
              <div className="bg-gray-300 hover:bg-opacity-80 duration-300 items-center justify-center rounded-3xl w-full aspect-square hidden lg:flex text-7xl text-gray-500">
                <FaImage />
              </div>
            )}
            {product?.primaryImage !== "" && (
              <Image
                src={product?.primaryImage}
                width={1024}
                height={1024}
                alt={`Reklamy Grudziądz - ${product?.title}`}
                className="w-full h-auto rounded-xl hidden lg:block"
              />
            )}
            {product?.text3Title && (
              <h2 className="text-2xl font-bold mt-6 drop-shadow-xl shadow-black text-zinc-800 font-cocobold">
                {product?.text3Title}
              </h2>
            )}
            {product?.text3Desc && (
              <div
                className="text-gray-700 font-light"
                dangerouslySetInnerHTML={renderMarkdown(product?.text3Desc)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="sm:mt-[130px] flex flex-wrap lg:grid lg:grid-cols-2 w-full px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
        <div className="w-full lg:max-w-[40rem] py-12 text-zinc-700 font-bold text-6xl sm:text-7xl drop-shadow-xl shadow-black">
          <h1>Skontaktuj się z nami</h1>
          <div className="flex w-max px-12 pt-12">
            <div className="aspect-square left-0 top-0 bg-[#74B901] w-12"></div>
            <div className="aspect-square left-0 top-0 bg-[#009CE7] w-12"></div>
            <div className="aspect-square left-0 top-0 bg-[#B00285] w-12"></div>
            <div className="aspect-square left-0 top-0 bg-[#FEBE00] w-12"></div>
          </div>
          <p className="font-light text-base mt-12 px-12 text-square lg:max-w-[40rem]">
            Dziękujemy za zainteresowanie naszą ofertą reklamową. Aby uzyskać
            szczegółową wycenę dostosowaną do Państwa potrzeb, prosimy o
            wypełnienie poniższego formularza kontaktowego. Nasi specjaliści
            skontaktują się z Państwem w najkrótszym możliwym czasie, aby omówić
            wszelkie szczegóły i zaproponować najbardziej efektywne rozwiązania.
          </p>
        </div>
        <Contact />
      </div>
      <ThreeHoverableElements />
      {product?.secondaryImage !== "" &&
        product?.text4Title !== "" &&
        product?.text4Desc !== "" && (
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 gap-4">
            <div className="relative aspect-square overflow-hidden w-full">
              {!product.secondaryImage && (
                <div className="bg-gray-300 hover:bg-opacity-80 duration-300 items-center justify-center rounded-3xl w-full aspect-square flex text-7xl text-gray-500">
                  <FaImage />
                </div>
              )}
              {product?.secondaryImage !== "" && (
                <Image
                  src={product?.secondaryImage}
                  width={1024}
                  height={1024}
                  alt={`Reklama Grudziądz - ${product?.title}`}
                  className="rounded-xl absolute inset-0 object-cover w-full h-full"
                />
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-3xl text-left font-bold font-cocobold drop-shadow-xl shadow-black text-zinc-800">
                {product?.text4Title}
              </h2>
              <div
                className="text-gray-700 font-light"
                dangerouslySetInnerHTML={renderMarkdown(product?.text4Desc)}
              />
            </div>
          </div>
        )}
      {product.images?.length > 2 && (
        <div className="mt-24 px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
          {product?.imagesHeadingSmallText && (
            <div className="text-base text-zinc-500 drop-shadow-lg shadow-black text-center ">
              {product?.imagesHeadingSmallText}
            </div>
          )}
          {product?.imagesHeadingMainText && (
            <h2 className="text-3xl text-center font-bold text-zinc-800 drop-shadow-lg shadow-black font-cocobold">
              {product?.imagesHeadingMainText}
            </h2>
          )}
          <div className="mt-12" />
          <ImageGridWithPreview
            isHomePage={false}
            caseStudiesList={product?.images
              ?.filter(
                (image: any) =>
                  image.src !== product.primaryImage &&
                  image.src !== product.secondaryImage
              )
              ?.map((image: any, i: any) => image.src)}
          />
        </div>
      )}
      <div className={`${product?.images?.length > 0 && "mt-24"}`}>
        <GetQuote />
      </div>
      <div className="pl-4 md:pl-8 lg:pl-12 xl:pl-20 2xl:pl-32 pb-24 w-full">
        <h2 className="text-3xl font-bold text-left mt-24 mb-12 font-cocobold drop-shadow-xl shadow-black text-zinc-800">
          Zobacz też
        </h2>
        <DraggableProductList products={otherProducts} />
      </div>
    </>
  );
}
