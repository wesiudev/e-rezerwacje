"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function ContactInfo() {
  const [currentMailVisible, setCurrentMailVisible] = useState(1);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMailVisible((prev: any) => {
        if (prev < 3) {
          return prev + 1;
        } else {
          return 1;
        }
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  const [isSticky, setIsSticky] = useState(true);
  useEffect(() => {
    let previousScrollPosition = window.scrollY;

    const scrollListener = () => {
      const currentScrollPosition = window.scrollY;
      const isScrolledDown = previousScrollPosition < currentScrollPosition;
      previousScrollPosition = currentScrollPosition;

      setIsSticky(isScrolledDown && currentScrollPosition > 100 ? false : true);
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  return (
    <div
      className={`${
        isSticky
          ? "fixed bottom-0 sm:bottom-auto sm:top-[106px] lg:top-[136px] xl:top-[164px]"
          : "fixed bottom-0 sm:bottom-auto sm:top-[0px] overflow-y-hidden"
      } left-0 z-[30] bg-white w-full duration-300`}
    >
      <div className="flex md:flex-row flex-col items-center justify-evenly relative font-light">
        <div className="flex flex-row items-center xl:-ml-3 sm:text-base text-sm">
          <Link
            href="tel:+48663494376"
            className="group py-1 w-max hover:bg-[#74B901] duration-200 px-3 text-zinc-800 hover:text-white flex flex-col items-center justify-center "
          >
            <div className="group-hover:bg-white group-hover:text-gray-500 text-white flex items-center justify-center rounded-full bg-[#74B901] w-8 h-8 ">
              <FaPhoneAlt />
            </div>
            663 494 376
          </Link>

          <Link
            href="tel:+48721417154"
            className="group py-1 w-max hover:bg-[#74B901] duration-200 px-3 text-zinc-800 hover:text-white flex flex-col items-center justify-center  "
          >
            <div className="group-hover:bg-white group-hover:text-gray-500 text-white flex items-center justify-center rounded-full bg-[#74B901] w-8 h-8 ">
              <FaPhoneAlt />
            </div>
            721 417 154
          </Link>
        </div>
        <Link
          href={`${
            (currentMailVisible === 1 && "mailto:biuro@e-rezerwacje.com.pl") ||
            (currentMailVisible === 2 && "mailto:pawel@e-rezerwacje.com.pl") ||
            (currentMailVisible === 3 && "mailto:marcin@e-rezerwacje.com.pl")
          }`}
          className="relative group sm:ml-[100px] xl:ml-0 font-light py-3 lg:py-0"
          title="Systemy rezerwacji online"
        >
          <div className="sm:flex hidden absolute -left-[48%] top-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#74B901] w-8 h-8 -mx-4">
            <FaEnvelope className="text-white " />
          </div>
          <div
            className={`${
              currentMailVisible === 1
                ? "opacity-100 -translate-y-1/2 top-1/2 duration-500"
                : "opacity-0 top-0 animation-move-to-bottom duration-500"
            } absolute left-0 -translate-x-[100%] group-hover:underline font-bold`}
          >
            biuro
          </div>
          <div
            className={`${
              currentMailVisible === 2
                ? "opacity-100 -translate-y-1/2 top-1/2 duration-500"
                : "opacity-0 top-0 animation-move-to-bottom duration-500"
            } absolute left-0 -translate-x-[100%] group-hover:underline font-bold`}
          >
            pawel
          </div>
          <div
            className={`${
              currentMailVisible === 3
                ? "opacity-100 -translate-y-1/2 top-1/2 duration-500"
                : "opacity-0 top-0 animation-move-to-bottom duration-500"
            } absolute left-0 -translate-x-[100%] group-hover:underline font-bold`}
          >
            marcin
          </div>
          @e-rezerwacje.com
        </Link>
      </div>
    </div>
  );
}
