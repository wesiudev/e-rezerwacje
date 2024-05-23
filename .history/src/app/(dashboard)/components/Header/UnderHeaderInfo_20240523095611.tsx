"use client";
import { useEffect, useState } from "react";

export default function UnderHeaderInfo() {
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
          ? "fixed top-[80px] lg:top-[112px] xl:top-[136px]"
          : "fixed top-[0px]"
      } left-0 z-[30] bg-[#74B901] text-white w-full py-0.5 flex flex-wrap items-center justify-center space-x-6 sm:space-x-0 sm:justify-between xl:justify-evenly px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 duration-300 text-[13px] sm:text-base font-light`}
    >
      <div className="w-max">Partner rezerwacji</div>{" "}
      <div className="w-max">Reklama w Google</div>
      <div className="w-max">Wypłaty 24/7</div>
    </div>
  );
}
