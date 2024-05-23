"use client";
import Image from "next/image";
import { useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";

export default function ImagePreview({ images }: { images: any[] }) {
  const [currentImage, setCurrentImage] = useState(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setCurrentImage(images[index]);
  };

  return (
    <>
      {currentImage && (
        <div
          className="z-[999] fixed top-0 bg-black h-screen bg-opacity-70 w-full overflow-y-scroll py-24"
          onClick={() => setCurrentImage(undefined)}
        >
          <div className="relative w-full max-w-[90%] mx-auto">
            <Image
              src={currentImage}
              alt="Reklama Grudziądz"
              className="w-full "
              width={1920}
              height={1080}
            />
          </div>
        </div>
      )}
      {images.map((item: any, i: any) => (
        <button
          onClick={() => handleImageClick(i)}
          className="relative duration-500 aspect-square overflow-hidden group"
          key={i}
        >
          <div
            onClick={() => handleImageClick(i)}
            className="absolute w-full h-full left-0 top-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 duration-500 z-10 text-white flex items-center justify-center"
          >
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
    </>
  );
}
