"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaImage, FaLongArrowAltRight, FaPlus } from "react-icons/fa";
import { destinations } from "./destinations";
import useWindowDimensions from "../../../../../lib/useWidth";
export default function Header({ products }: { products: any[] }) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const headerProductsUrls = products.map((product: any) => ({
    url: product.url,
    urlLabel: product.urlLabel,
    img: product.primaryImage,
    additionalPage: product.additionalPage || false,
  }));
  const [helperNeeded, setHelperNeeded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const [activeItem, setActiveItem] = useState(-1);

  const [menuShow, setMenuShow] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let previousScrollPosition = window.scrollY;

    const scrollListener = () => {
      const currentScrollPosition = window.scrollY;
      const isScrolledDown = previousScrollPosition < currentScrollPosition;
      previousScrollPosition = currentScrollPosition;

      setShowHeader(
        isScrolledDown && currentScrollPosition > 100 ? false : true
      );
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  return (
    <>
      {/* PRODUCTS TAB ON SHOWN HOVER -> xl devices */}
      <div
        onMouseEnter={() => {
          width >= 1280 && handleMouseEnter();
        }}
        onMouseLeave={() => {
          width >= 1280 && handleMouseLeave();
        }}
        className={`z-[200] fixed grid grid-cols-2 w-full max-h-[86.5vh] top-0 left-0 bg-white xl:space-x-3 font-semibold shadow-black ${
          hovered
            ? "translate-y-[116px] lg:translate-y-[136px]"
            : "-translate-y-[100vh] opacity-0"
        } duration-300 pl-4 md:pl-8 lg:pl-12 xl:pl-20 2xl:pl-32 border-y border-gray-300 overflow-y-scroll`}
      >
        <div className="flex flex-col relative z-[500]">
          <h2 className="text-zinc-800 drop-shadow-xl shadow-black font-bold text-xl xl:text-2xl text-left pt-8">
            Wszystkie systemy
          </h2>
          <div className="grid grid-cols-2 pb-8 pt-4">
            {...headerProductsUrls
              .sort((a, b) =>
                a.urlLabel.localeCompare(b.urlLabel, undefined, {
                  sensitivity: "base",
                })
              )
              .map((item: any, i: any) => (
                <>
                  <Link
                    className={`relative group hover:scale-110 duration-150 drop-shadow-xl shadow-black  text-zinc-800 font-light`}
                    href={item.url}
                    key={i}
                    onClick={() => setHovered(false)}
                    title={`Agencja Reklamowa W Grudziądzu ${item.urlLabel}`}
                  >
                    <div className="absolute -left-8 group-hover:-left-6 top-1.5 opacity-0 group-hover:opacity-100 duration-150 h-full flex items-center justify-center">
                      <FaLongArrowAltRight />
                    </div>
                    <div className="w-full mt-3 group-hover:text-[#010BB0] text-zinc-800 text-[12px]">
                      {item.urlLabel.toUpperCase()}
                    </div>
                  </Link>
                </>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-3">
          {additionalServices.map((item: any, i: any) => (
            <>
              {item && (
                <Link
                  title="E-Rezerwacje system rezerwacji dla twojego biznesu"
                  style={{ backgroundColor: item.color }}
                  className={`group drop-shadow-sm shadow-black aspect-square w-full h-full text-white font-bold text-lg text-center relative overflow-hidden `}
                  href={item.url}
                  key={i}
                  onClick={() => setHovered(false)}
                >
                  <div className="bg-white bg-opacity-10 duration-500 group-hover:bg-opacity-0 absolute top-0 left-0 w-full h-full"></div>
                  <div
                    className="absolute w-full h-full left-0 top-0 z-[50] opacity-30 hover:opacity-0 duration-300"
                    style={{ background: item.color }}
                  />
                  <div className="aspect-square relative z-10 w-full group-hover:scale-100 scale-150 duration-500 ">
                    <Image
                      src={item.image}
                      width={500}
                      height={500}
                      alt=""
                      className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-500"
                    />
                  </div>
                  <div className="bg-black text-white font-bold absolute bottom-0 left-1/2 -translate-x-1/2 w-full mt-3 drop-shadow-xl shadow-black z-[55] xl:text-sm 2xl:text-base">
                    {item.urlLabel.toUpperCase()}
                  </div>
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
      {/* PRODUCTS TAB OPENED MOBILE */}
      <div
        className={`fixed w-full max-h-[88vh] overflow-y-scroll pb-20 top-0 left-0 bg-gray-300 bg-opacity-90 xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          productsOpen
            ? "translate-y-[102px] lg:translate-y-[128px] opacity-100 z-[500]"
            : "z-[-10] opacity-0"
        } duration-300 pb-7 scrollbar xl:hidden`}
      >
        <div className="w-full sticky top-0 left-0 py-4 px-3 sm:px-5 flex items-center justify-between z-[200] bg-white border-b-2 border-blue-400">
          <h2 className="text-zinc-800 drop-shadow-md shadow-black sm:text-lg lg:text-xl  font-bold">
            Wszystkie produkty
          </h2>
          <button
            onClick={() => {
              setMenuShow(true);
              setProductsOpen(false);
            }}
            className=" text-zinc-800 text-sm"
          >
            Zamknij
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full px-3 sm:px-5 pt-3 pb-20">
          {headerProductsUrls.map((item: any, i: any) => (
            <Link
              className={`aspect-square h-full w-full flex flex-col items-center justify-center bg-white duration-200 p-3 sm:p-5 rounded-lg text-sm group drop-shadow-sm shadow-black`}
              href={item.url}
              key={i}
              title="Reklama Grudziądz Figurscy"
              onClick={() => {
                setMenuShow(false), setProductsOpen(false);
              }}
            >
              <div className="w-full h-full aspect-square overflow-hidden rounded-lg relative">
                {item.img && (
                  <Image
                    src={item.img}
                    width={200}
                    height={200}
                    alt={`${item.urlLabel} Reklama Grudziądz`}
                    className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-500"
                  />
                )}
                {!item.img && (
                  <div className="text-5xl text-zinc-800 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
                    <FaImage />
                  </div>
                )}
              </div>
              <div className="w-full text-center mt-3 group-hover:underline font-bold text-zinc-800 ">
                {item.urlLabel}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* HEADER */}
      <div
        className={`z-[500] sticky top-0 left-0 bg-white flex flex-row items-center w-full justify-between px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 ${
          showHeader || menuShow || hovered || productsOpen
            ? "-translate-y-0"
            : "-translate-y-[100%]"
        } duration-300`}
      >
        {/* LOGO */}
        <div className="flex flex-col">
          <Link
            onClick={() => setActiveItem(-1)}
            title="E-Rezerwacje system rezerwacji dla twojego biznesu"
            href="/"
            className="flex flex-col py-4 xl:py-0 font-light"
          >
            <Image
              src="/logo.png"
              width={300}
              height={300}
              alt="E-Rezerwacje system rezerwacji dla twojego biznesu"
              className="h-12 lg:h-16 xl:h-16 2xl:h-20 w-auto"
            />
          </Link>
        </div>
        <div className="flex flex-col items-end justify-center relative">
          {/* MENU SHOW SUSTAIN ON HOVER */}
          {hovered && helperNeeded && (
            <div
              onMouseEnter={() => {
                width >= 1280 && handleMouseEnter();
                setTimeout(() => {
                  setHelperNeeded(false);
                }, 3500);
              }}
              className="absolute bottom-0 right-0 w-full h-[40%] z-[700] "
            ></div>
          )}
          <div
            className={`fixed flex flex-col top-0 left-0 bg-white w-full h-max xl:w-auto xl:h-auto xl:flex-row items-center xl:space-x-3 xl:-ml-3 font-semibold shadow-black xl:relative py-3 space-y-3 xl:py-0 xl:space-y-0 ${
              menuShow
                ? "translate-y-[102px] lg:translate-y-[128px] xl:translate-y-0 z-10"
                : "z-[-10] xl:z-0 opacity-0 xl:opacity-100 -translate-y-[100%] xl:-translate-y-0"
            } duration-500`}
          >
            <div className="absolute left-0 top-0 h-2"></div>
            {destinations.map((item: any, i: any) => (
              <>
                {i === 1 && (
                  <div
                    onMouseEnter={() => {
                      width >= 1280 && handleMouseEnter();
                      setHelperNeeded(true);
                    }}
                    onMouseLeave={() => {
                      width >= 1280 && handleMouseLeave();
                    }}
                    className={`w-max mx-auto h-full xl:py-12 group`}
                  >
                    <button
                      onClick={() => {
                        setProductsOpen(true);
                        setMenuShow(false);
                        setActiveItem(-1);
                      }}
                      title={"Produkty"}
                      className={`${
                        hovered ? "bg-[#74B901] text-white" : "text-zinc-800"
                      } p-2 drop-shadow-sm duration-100 cursor-default `}
                    >
                      OFERTA
                    </button>{" "}
                  </div>
                )}
                <Link
                  key={i}
                  className={`hover:bg-[#74B901] hover:text-white p-2 group text-zinc-800 drop-shadow-sm duration-100 w-max`}
                  onClick={() => {
                    setActiveItem(i), setMenuShow(false), setHovered(false);
                  }}
                  href={item.href}
                  title={item.title}
                >
                  {item.title}
                </Link>
              </>
            ))}
          </div>
        </div>
        {/* BUTTON FOR MOBILE */}
        <button
          className={`relative !z-[2000] xl:hidden menu ${
            menuShow ? "opened" : ""
          }`}
          onClick={() => setMenuShow(!menuShow)}
          aria-expanded={menuShow}
          aria-label="Main Menu"
        >
          <svg width="65" height="65" viewBox="0 0 100 100">
            <path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="line line2" d="M 20,50 H 80" />
            <path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
const additionalServices = [
  {
    urlLabel: "System Rezerwacji dla prawnika",
    url: "/system-rezerwacji-dla-prawnika",
    color: "#C5E1A5",
    image: "/header-images/prawnik.jpg",
  }, // Pastel Green
  {
    urlLabel: "System Rezerwacji dla barbera",
    url: "/system-rezerwacji-dla-barbera",
    color: "#F59BBB",
    image: "/header-images/barber.jpg",
  }, // Pastel Pink
  {
    urlLabel: "System Rezerwacji dla masażysty",
    url: "/system-rezerwacji-dla-masazysty",
    color: "#A6BFFD",
    image: "/header-images/masaz.jpg",
  }, // Pastel Blue
  {
    urlLabel: "System Rezerwacji dla kosmetyczki",
    url: "/system-rezerwacji-dla-kosmetyczki",
    color: "#A4D8F9",
    image: "/header-images/kosmetyczka.jpg",
  }, // Pastel Cyan
  {
    urlLabel: "System Rezerwacji dla operatora koparki",
    url: "/system-rezerwacji-dla-operatora-koparki",
    color: "#FDE598",
    image: "/header-images/koparka.jpg",
  }, // Pastel Yellow
  {
    urlLabel: "System Rezerwacji dla lekarza",
    url: "/system-rezerwacji-dla-lekarza",
    color: "#74B901",
    image: "/header-images/lekarz.jpg",
  },
];
