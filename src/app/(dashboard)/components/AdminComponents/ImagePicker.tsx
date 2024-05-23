import Image from "next/image";
import { useState } from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
export default function ImagePicker({
  handler,
  closeImagePicker,
  imagePickerOpen,
  images,
  setProduct,
  product,
  sourceOfImagePicker,
}: {
  handler: any;
  closeImagePicker: Function;
  imagePickerOpen: boolean;
  images: any;
  setProduct: Function;
  product: any;
  sourceOfImagePicker: string;
}) {
  const [selectedImage, setSelectedImage] = useState<any>();

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[70vw] max-h-[80vh] bg-white shadow-sm shadow-black z-[251]">
      <div className="p-6 flex items-center justify-between w-full">
        <div className="text-2xl font-bold">Zdjęcia produktu</div>
        <button
          onClick={() => closeImagePicker()}
          className="flex items-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-400 duration-300"
        >
          <FaSignOutAlt className="mr-2" />
          Zamknij
        </button>
      </div>
      <div className="w-full overflow-y-scroll">
        {images.length === 0 && (
          <div className="w-full min-h-[50vh] flex items-center justify-center text-center flex-col">
            <b>Brak zdjęć dla tego produktu.</b>
          </div>
        )}
        <div className={`${imagePickerOpen && "h-[50vh]"}`}>
          <div className="h-max grid grid-cols-4 gap-6 px-4 pt-12 pb-24">
            {images &&
              images?.map((image: any, i: any) => (
                <button
                  onClick={() => setSelectedImage(image.src)}
                  className={`${
                    selectedImage === image.src
                      ? "border-green-500 bg-gray-400"
                      : "hover:border-green-500 border-transparent bg-gray-300 hover:bg-gray-400"
                  } group border-[4px] flex items-center justify-center aspect-square overflow-hidden p-3`}
                  key={i}
                >
                  <Image
                    width={500}
                    height={500}
                    src={image.src}
                    alt="Agencja Reklamowa W Grudziądzu Grudziądz"
                    className="object-fit w-full h-auto group-hover:border-green-500"
                  />
                </button>
              ))}
          </div>
          <div className="w-full absolute bottom-0 left-0 flex justify-end bg-white">
            {selectedImage && (
              <div className="flex items-center">
                <button
                  onClick={() => {
                    const updatedImages = images.filter(
                      (image: any) => image.src !== selectedImage
                    );
                    setProduct((prevProduct: any) => ({
                      ...prevProduct,
                      images: updatedImages,
                      primaryImage:
                        prevProduct.primaryImage === selectedImage
                          ? ""
                          : prevProduct.primaryImage,
                      secondaryImage:
                        prevProduct.secondaryImage === selectedImage
                          ? ""
                          : prevProduct.secondaryImage,
                    }));
                  }}
                  className="w-max mt-4 py-3 px-12 text-center justify-center items-center flex font-bold hover:bg-rose-400 bg-rose-500 duration-300 text-white"
                >
                  Usuń
                </button>
                {sourceOfImagePicker !== "" && (
                  <button
                    onClick={() => {
                      setProduct({
                        ...product,
                        [sourceOfImagePicker]: selectedImage,
                      });
                      closeImagePicker();
                    }}
                    className="w-max mt-4 py-3 px-12 text-center justify-center items-center flex font-bold hover:bg-blue-400 bg-blue-500 duration-300 text-white"
                  >
                    Zastosuj
                  </button>
                )}
              </div>
            )}
            <label
              htmlFor="uploader"
              className="w-max mt-4 py-3 px-12 text-center justify-center items-center flex font-bold hover:bg-green-400 bg-green-500 duration-300 text-white"
            >
              <FaPlus className="mr-2" />
              Dodaj zdjęcia
            </label>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e: any) => {
              const files = e.target.files;
              // Filter out non-image files if needed
              const imageFiles = Array.from(files).filter((file: any) =>
                file.type.startsWith("image/")
              );
              handler(imageFiles);
            }}
            id="uploader"
            className="text-white hidden"
          />
        </div>
      </div>
    </div>
  );
}
