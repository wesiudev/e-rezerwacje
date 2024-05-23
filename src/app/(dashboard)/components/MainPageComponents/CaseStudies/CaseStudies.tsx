import ImageGridWithPreview from "./ImageGridWithPreview";
export default function CaseStudies({
  products,
  isHomePage,
}: {
  products: any[];
  isHomePage: boolean;
}) {
  const caseStudiesList = products.reduce((acc: any, product: any) => {
    const imagesSources = product.images.map((image: any) => image.src);
    return [...acc, ...imagesSources];
  }, []);

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
      <h2 className=" font-bold text-zinc-800 text-2xl sm:text-3xl lg:text-4xl drop-shadow-xl shadow-black text-center mt-24 mb-4">
        Nasze realizacje reklam
      </h2>
      <div className="flex items-center justify-center space-x-3 w-full mb-8 opacity-50">
        <div className="bg-[#020cb1] h-px w-12"></div>
        <div className="bg-[#020cb1] h-1.5 w-1.5 rounded-full"></div>
        <div className="bg-[#020cb1] h-px w-12"></div>
      </div>
      <ImageGridWithPreview
        caseStudiesList={caseStudiesList}
        isHomePage={isHomePage}
      />
    </div>
  );
}
