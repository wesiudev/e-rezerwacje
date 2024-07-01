"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCheck,
  FaImage,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaTh,
} from "react-icons/fa";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

import { v4 as uuid } from "uuid";
import {
  createDraft,
  createProduct,
  deleteDraft,
  deleteProduct,
  storage,
  updateDraft,
  updateProduct,
} from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { EditorState } from "draft-js";
import { useRouter } from "next/navigation";
import ImagePicker from "./ImagePicker";
import Input from "./Input";
import HtmlInput from "./HtmlInput";
import ExtraSettings from "./ExtraSettings";
import ContentButton from "./ContentButton";
export default function ProductEdit({
  source,
  place,
}: {
  source: any;
  place: "products" | "drafts" | "new";
}) {
  const router = useRouter();
  const [htmlContent, setHtmlContent] = useState(() =>
    EditorState.createEmpty()
  );
  const initialInput = {
    type: "",
    title: "",
    label: "",
  };
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [product, setProduct] = useState<any>(source);
  const [sourceOfImagePicker, setSourceOfImagePicker] = useState("");
  const [currentInput, setCurrentInput] = useState(initialInput);
  const [loading, setLoading] = useState(false);
  const [draftCreated, setDraftCreated] = useState(false);
  function closeImagePicker() {
    setImagePickerOpen(false);
    setSourceOfImagePicker("");
  }
  const [savedAutomatically, setSavedAutomatically] = useState(false);
  function updateAutomatically() {
    setLoading(true);
    if (place === "products") {
      updateProduct(product.id, product).then(() => {
        setLoading(false), setSavedAutomatically(true);
      });
    } else if (place === "drafts") {
      updateDraft(product.id, product).then(() => {
        setLoading(false), setSavedAutomatically(true);
      });
    } else if (place === "new") {
      if (draftCreated) {
        setLoading(true);
        updateDraft(product.id, product).then(() => setLoading(false));
      }
    }
  }
  useEffect(() => {
    if (!draftCreated && place === "new") createDraft(product, product.id);
    setDraftCreated(true);
  }, []);
  useEffect(() => {
    updateAutomatically();
  }, [
    currentInput,
    product.primaryImage,
    product.secondaryImage,
    product.images,
  ]);

  function handleChange(e: any) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }
  function closeInput() {
    setCurrentInput(initialInput);
  }
  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState();
  async function upload(files: any) {
    setUploadCount(files.length);
    setUploading(true);
    const localImagesArray: any = [];
    const uploadFile = async (file: any) => {
      const randId = uuid();
      const imageRef = ref(storage, randId);

      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        const data = {
          src: url,
        };

        localImagesArray.push(data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    // Iterate through each file and upload
    const uploadPromises = files.map(uploadFile);

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      setProduct({
        ...product,
        images: [...product.images, ...localImagesArray],
      });

      setLoading(false);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
      setUploading(false);
    }
  }
  const [isFullscreen, setIsFullscreen] = useState(false);
  return (
    <div
      className={`w-full duration-500 ${
        isFullscreen ? "fixed left-0 top-0 overflow-y-scroll h-screen" : "p-24"
      }`}
    >
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className={`fixed right-8 bottom-8 flex items-center group z-[1500]`}
      >
        <div className="group-hover:opacity-100 duration-300 opacity-0 bg-gray-500 h-11 px-3 rounded-l-md flex items-center text-white">
          {isFullscreen ? "Zamknij" : "Pełny ekran"}
        </div>
        <div className="text-2xl aspect-square w-11 h-11 group-hover:rounded-l-none rounded-md bg-gray-600 group-hover:bg-gray-700 text-white items-center justify-center flex">
          {!isFullscreen && <AiOutlineFullscreen />}
          {isFullscreen && <AiOutlineFullscreenExit />}
        </div>
      </button>
      {isUploading && (
        <div className="z-[500] flex items-center justify-center text-center fixed left-0 top-0 bg-black bg-opacity-75 w-full h-screen font-bold text-xl text-white">
          Dodawanie {uploadCount} obrazów...
        </div>
      )}
      {imagePickerOpen && (
        <ImagePicker
          handler={upload}
          imagePickerOpen={imagePickerOpen}
          closeImagePicker={closeImagePicker}
          images={product.images}
          setProduct={setProduct}
          product={product}
          sourceOfImagePicker={sourceOfImagePicker}
        />
      )}
      <Input
        value={product[currentInput.title]}
        title={currentInput.title}
        handleChange={handleChange}
        type={currentInput.type}
        label={currentInput.label}
        closeInput={closeInput}
      />
      <HtmlInput
        setProduct={setProduct}
        product={product}
        label={currentInput.label}
        type={currentInput.type}
        title={currentInput.title}
        htmlContent={htmlContent}
        setHtmlContent={setHtmlContent}
        closeInput={closeInput}
      />
      <div className={`relative w-full bg-white min-h-screen`}>
        <div
          className={`z-[50] sticky w-full flex items-center justify-between bg-slate-800 left-0 top-0 p-1.5 ${
            isFullscreen ? "px-20" : ""
          } `}
        >
          <p className="text-white font-bold w-[50%]">
            {place === "new" && (
              <p className="text-white font-bold w-max">
                Dodajesz nowy produkt na stronę
              </p>
            )}
            {place !== "new" && (
              <>
                Pracujesz nad produktem{" "}
                <span className="text-green-400 italic">
                  {!product.title && product.id}
                  {product.title && product.title}
                </span>
              </>
            )}
          </p>
          <ExtraSettings
            handleChange={handleChange}
            setProduct={setProduct}
            product={product}
            dbUpdate={updateProduct}
          />
          <div>
            <div className="flex flex-row items-center space-x-2">
              {place !== "new" && (
                <>
                  <button
                    onClick={() => {
                      if (place === "products") {
                        deleteProduct(product.id).then(() =>
                          router.push("/admin/products")
                        );
                      } else if (place === "drafts") {
                        deleteDraft(product.id).then(() =>
                          router.push("/admin/products/drafts")
                        );
                      }
                    }}
                    className="bg-red-500 hover:bg-red-400 text-white p-1.5 rounded-md"
                  >
                    Usuń
                  </button>

                  <button
                    onClick={() => {
                      if (place === "products") {
                        updateProduct(product.id, product).then(() =>
                          setTimeout(() => {
                            router.push("/admin/products");
                          }, 2000)
                        );
                      } else if (place === "drafts") {
                        updateDraft(product.id, product).then(() =>
                          setTimeout(() => {
                            router.push("/admin/products/drafts");
                          }, 2000)
                        );
                      }
                    }}
                    className={`bg-gray-500 hover:bg-gray-400
                   text-white p-1.5 rounded-md`}
                  >
                    {loading && <div className="text-white">Wczytywanie</div>}
                    {savedAutomatically && !loading && (
                      <div className="flex items-center">
                        <FaCheck className="mr-2 text-green-500" />{" "}
                        <div className="text-white">Zapisano</div>
                      </div>
                    )}
                    {!loading && !savedAutomatically && "Zapisz zmiany"}
                  </button>
                </>
              )}
              {(place === "new" || place === "drafts") && (
                <>
                  {loading && (
                    <div className="bg-green-500 hover:bg-green-400 text-white p-3">
                      Wczytywanie
                    </div>
                  )}
                  {!loading && (
                    <button
                      onClick={() => {
                        deleteDraft(product.id).then(() =>
                          createProduct(product).then(() =>
                            router.push("/admin/products")
                          )
                        );
                      }}
                      className="w-max bg-green-500 hover:bg-green-400 text-white p-3"
                    >
                      Dodaj produkt
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <Image
          src="/adminHeader.png"
          width={1980}
          height={1024}
          alt="Agencja Reklamowa W Grudziądzu Grudziądz"
          className="w-full h-auto"
        />
        <div className={`${isFullscreen ? "px-32" : ""} p-12`}>
          <div
            className={`mx-auto text-center w-full mt-12 ${
              product.title && "text-3xl font-bold"
            }`}
          >
            <ContentButton
              label="Nazwa produktu"
              value={product.title}
              type="text"
              title="title"
              setInput={setCurrentInput}
              optional={false}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mx-auto mt-12">
            <div className="flex flex-col">
              <ContentButton
                label="Krótki opis"
                value={product.shortDesc}
                type="html"
                title="shortDesc"
                setInput={setCurrentInput}
                optional={false}
                setHtmlContent={setHtmlContent}
              />
              <ContentButton
                label="Tytuł tekstu 1"
                value={product.text1Title}
                type="text"
                title="text1Title"
                setInput={setCurrentInput}
                optional={true}
              />
              <ContentButton
                label="Opis tekstu 1"
                value={product.text1Desc}
                type="html"
                title="text1Desc"
                setInput={setCurrentInput}
                optional={true}
                setHtmlContent={setHtmlContent}
              />
              <ContentButton
                label="Tytuł tekstu 2"
                value={product.text2Title}
                type="text"
                title="text2Title"
                setInput={setCurrentInput}
                optional={true}
              />

              <ContentButton
                label="Opis tekstu 2"
                value={product.text2Desc}
                type="html"
                title="text2Desc"
                setInput={setCurrentInput}
                optional={true}
                setHtmlContent={setHtmlContent}
              />
            </div>
            {/* image input */}
            <div className="flex flex-col items-center">
              <div className="w-full">
                <button
                  className={`${
                    !product.primaryImage &&
                    "add_image_btn flex flex-col items-center justify-center text-zinc-800"
                  }`}
                  onClick={() => {
                    setImagePickerOpen(true);
                    setSourceOfImagePicker("primaryImage");
                  }}
                >
                  {!product.primaryImage && <FaImage className="text-7xl" />}
                  {product.primaryImage !== "" && (
                    <div className="min-w-full">
                      <Image
                        src={product.primaryImage}
                        width={1024}
                        height={1024}
                        alt="Agencja Reklamowa W Grudziądzu Grudziądz"
                        className="rounded-xl min-w-full object-cover"
                      />
                    </div>
                  )}
                </button>
              </div>{" "}
              <div className="w-full">
                <ContentButton
                  label="Tytuł tekstu 3"
                  value={product.text3Title}
                  type="text"
                  title="text3Title"
                  setInput={setCurrentInput}
                  optional={true}
                />
                <ContentButton
                  label="Opis tekstu 3"
                  value={product.text3Desc}
                  type="html"
                  title="text3Desc"
                  setInput={setCurrentInput}
                  optional={true}
                  setHtmlContent={setHtmlContent}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center bg-blue-500 w-full h-[30vh] mt-12 px-24 py-12 lg:py-0">
          <div className="text-white text-xl lg:text-lg xl:text-2xl font-bold text-center flex items-center justify-center w-max">
            BEZPŁATNA WYCENA REKLAMY!
          </div>
          <Link
            href="/kontakt"
            className="text-zinc-800 font-bold drop-shadow-sm shadow-black rounded-3xl py-2 px-6 bg-white text-sm lg:text-lg w-max h-max my-auto mx-4 hover:bg-gray-300 duration-300"
          >
            UMÓW KONSULATCJĘ
          </Link>
        </div>
        <div className="p-12 grid grid-cols-2 w-full">
          <div className="w-full mt-4">
            <button
              onClick={() => {
                setImagePickerOpen(true);
                setSourceOfImagePicker("secondaryImage");
              }}
              className={`${
                !product.secondaryImage &&
                "add_image_btn flex flex-col items-center justify-center text-zinc-800"
              }`}
            >
              {!product.secondaryImage && (
                <>
                  <FaImage className="text-7xl" /> <br />{" "}
                  <span className="text-sm font-normal">(opcjonalnie)</span>
                </>
              )}
              {product.secondaryImage && (
                <div className="min-w-full">
                  <Image
                    src={product.secondaryImage}
                    width={1024}
                    height={1024}
                    alt="Agencja Reklamowa W Grudziądzu Grudziądz"
                    className="min-w-full object-cover rounded-xl"
                  />
                </div>
              )}
            </button>
          </div>
          <div className="flex flex-col pl-4">
            <ContentButton
              label="Tytuł tekstu 4"
              value={product.text4Title}
              type="text"
              title="text4Title"
              setInput={setCurrentInput}
              optional={true}
            />
            <ContentButton
              label="Opis tekstu 4"
              value={product.text4Desc}
              type="html"
              title="text4Desc"
              setInput={setCurrentInput}
              optional={true}
              setHtmlContent={setHtmlContent}
            />
          </div>
        </div>

        <div className="p-12 flex flex-col items-center justify-center">
          <ContentButton
            label="Mały tekst nad tytułem zdjęć np. 30 lat doświadczenia / pracujemy z pasją / 1000 zadowolonych
              klientów"
            value={product.imagesHeadingSmallText}
            type="text"
            title="imagesHeadingSmallText"
            setInput={setCurrentInput}
            optional={false}
          />

          <ContentButton
            label="Tytuł do zdjęć realizacji np. Nasze ostatnie realizacje - Flagi i
              Maszty"
            value={product.imagesHeadingMainText}
            type="text"
            title="imagesHeadingMainText"
            setInput={setCurrentInput}
            optional={false}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full">
            {product.images?.map((image: any, i: any) => (
              <div className="relative aspect-square overflow-hidden" key={i}>
                <Image
                  width={700}
                  height={700}
                  src={image.src}
                  alt="Agencja Reklamowa W Grudziądzu Grudziądz"
                  className="rounded-xl absolute inset-0 object-cover w-full h-full"
                />
              </div>
            ))}
            <button
              onClick={() => setImagePickerOpen(true)}
              className="aspect-square h-full w-full py-3 px-12 border-2 border-dashed border-zinc-800 text-zinc-800 text-center justify-center items-center flex font-bold hover:bg-gray-300 duration-300"
            >
              Zarządzaj zdjęciami
            </button>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center bg-blue-500 w-full h-[30vh] mt-12 px-24 py-12 lg:py-0">
          <div className="text-white text-xl lg:text-lg xl:text-2xl font-bold text-center flex items-center justify-center w-max">
            BEZPŁATNA WYCENA REKLAMY!
          </div>
          <Link
            href="/kontakt"
            className="text-zinc-800 font-bold drop-shadow-sm shadow-black rounded-3xl py-2 px-6 bg-white text-sm lg:text-lg w-max h-max my-auto mx-4 hover:bg-gray-300 duration-300"
          >
            UMÓW KONSULATCJĘ
          </Link>
        </div>
        <div className="!text-zinc-800 py-12 flex flex-row items-center justify-evenly">
          <div
            className="flex flex-row items-center"
            title="Link do poprzedniego produktu"
          >
            <FaLongArrowAltLeft className="mr-2" /> Poprzedni produkt
          </div>
          <div className="" title="Link do wszystkich produktów">
            <FaTh className="text-3xl" />
          </div>
          <div
            className="flex flex-row items-center"
            title="Link do następnego produktu"
          >
            Następny produkt
            <FaLongArrowAltRight className="ml-2" />
          </div>
        </div>
        <Image
          src="/footer.png"
          width={1920}
          height={1024}
          alt="Agencja Reklamowa W Grudziądzu Grudziądz"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
