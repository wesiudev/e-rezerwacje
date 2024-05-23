"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaArrowRight, FaPlus } from "react-icons/fa";

export default function ImageGridWithPreview({
  caseStudiesList,
  isHomePage,
}: {
  caseStudiesList: any[];
  isHomePage: boolean;
}) {
  const [currentImage, setCurrentImage] = useState(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setCurrentImage(caseStudiesList[index]);
  };
  const [slice, setSlice] = useState(3);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  return (
    <>
      {currentImage && (
        <div
          className="z-[999] fixed left-0 top-0 bg-black h-screen bg-opacity-70 w-full overflow-y-scroll py-24"
          onClick={() => setCurrentImage(undefined)}
        >
          <div className="relative w-full max-w-[90%] mx-auto">
            <Image
              src={currentImage}
              alt="Reklama Grudziądz"
              className="w-full "
              width={1024}
              height={1024}
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {caseStudiesList.slice(0, slice).map((item: any, i: any) => (
          <button
            onClick={() => handleImageClick(i)}
            className="relative duration-500 aspect-square overflow-hidden group rounded-md"
            key={i}
          >
            <div className="absolute w-full h-full left-0 top-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 duration-500 z-10 text-white flex items-center justify-center">
              <BsArrowsFullscreen className="text-5xl group-hover:opacity-100 opacity-0 scale-50 group-hover:scale-100 duration-500" />
            </div>
            <Image
              src={item}
              alt="Reklama Grudziądz"
              width={800}
              height={800}
              className="absolute inset-0 object-cover w-full h-full group-hover:scale-100 scale-110 duration-500"
            />
          </button>
        ))}
        {!imagesLoaded && caseStudiesList.length > 3 && !isHomePage && (
          <button
            onClick={() => {
              setSlice(caseStudiesList.length);
              setImagesLoaded(true);
            }}
            className="rounded-md text-white aspect-square w-full bg-green-400 hover:bg-green-300 hover:text-zinc-800 duration-300 flex items-center justify-center flex-col"
          >
            <FaPlus className="text-5xl" />
            <p className="mt-4  text-sm md:text-lg">Wczytaj wszystkie</p>
          </button>
        )}
        {isHomePage && (
          <Link
            href="/realizacje"
            className="rounded-md hover:text-white aspect-square w-full hover:bg-[#74B901] text-zinc-800 border border-gray-300 duration-300 flex items-center justify-center flex-col text-center"
          >
            <FaArrowRight className="text-5xl" />
            <p className="mt-4  text-sm md:text-lg">Zobacz wszystkie</p>
          </Link>
        )}
      </div>
    </>
  );
}
