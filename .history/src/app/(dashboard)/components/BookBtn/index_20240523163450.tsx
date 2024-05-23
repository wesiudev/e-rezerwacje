"use client";

import * as Scroll from "react-scroll";
import { polishToEnglish } from "../../../../../lib/polishToEnglish";
export default function BookBtn({
  chosenService,
  setChosenService,
  isMobile,
}: {
  chosenService: any;
  setChosenService: any;
  isMobile: boolean;
}) {
  let ScrollTo = Scroll.Link;
  return (
    <Button
      onClick={() =>
        setChosenService({
          ...chosenService,
          name: "service",
          price: "service",
        })
      }
      className={`bg-indigo-600 sm:h-[32px] text-white rounded-xl text-base px-2 hover:bg-indigo-400 duration-100 cursor-pointer items-center justify-center flex ${
        isMobile ? "rounded-t-none" : ""
      } h-[35px]`}
    >
      Umów
    </Button>
  );
}
