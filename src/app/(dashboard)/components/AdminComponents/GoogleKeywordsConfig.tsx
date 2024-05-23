import Link from "next/link";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function GoogleKeywordsConfig({
  product,
  handleChange,
}: {
  product: any;
  handleChange: Function;
}) {
  return (
    <div className="my-3">
      <h2 className="z-50 relative group flex items-center justify-center text-xl font-bold text-zinc-800 drop-shadow-xl shadow-black w-max">
        Słowa kluczowe
        <FaInfoCircle className="h-5 w-5 ml-2 text-blue-600" />
        <div>
          <div className=" text-base bg-gray-300 group-hover:block hidden group-hover:opacity-100 duration-300 opacity-0 w-[500px] h-max p-3.5 fixed left-0 top-7 font-normal">
            Słowa kluczowe podane po przecinku (&quot;kasetony, kasetony
            grudziądz, kaseton grudziądz, kaseton&quot;), które system Google
            weźmie pod uwagę, ustalając pozycję dla strony produktu. Nie ma
            limitu słów kluczowych jednak zaleca się pisać ich około 15.
          </div>
        </div>
      </h2>
      <div className="flex items-center mt-3">
        <textarea
          name="googleKeywords"
          value={product.googleKeywords}
          onChange={(e: any) => handleChange(e)}
          placeholder="Wpisz słowa kluczowe"
          className="outline-none w-full p-3 bg-gray-300 outline-1 text-zinc-800"
          rows={3}
        ></textarea>
      </div>
    </div>
  );
}
