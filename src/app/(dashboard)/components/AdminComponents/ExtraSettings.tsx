"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import ContentButton from "./ContentButton";
import GoogleViewConfig from "./GoogleViewConfig";
import GoogleKeywordsConfig from "./GoogleKeywordsConfig";
import UrlConfig from "./UrlConfig";

export default function ExtraSettings({
  product,
  setProduct,
  handleChange,
  dbUpdate,
}: {
  product: any;
  setProduct: Function;
  handleChange: any;
  dbUpdate: Function;
}) {
  const [extraSettingsOpen, setExtraSettingsOpen] = useState(false);
  useEffect(() => {
    dbUpdate(product.id, product);
  }, [extraSettingsOpen]);
  return (
    <div>
      <button
        onClick={() => setExtraSettingsOpen(!extraSettingsOpen)}
        className="flex items-center mr-4 text-white"
      >
        <FaCog className="mr-2" />
        Ustawienia dodatkowe
      </button>
      {extraSettingsOpen && (
        <div className="fixed pt-6 w-[550px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-[80vh] shadow-md bg-white shadow-black z-10">
          <div className="flex items-center justify-between w-full px-6">
            <h2 className="text-2xl font-bold">Ustawienia dodatkowe</h2>
            <button
              onClick={() => setExtraSettingsOpen(false)}
              className="bg-gray-600 text-white rounded-xl px-3 py-1.5 hover:bg-gray-500 duration-300"
            >
              Zamknij
            </button>
          </div>
          <div className="h-full overflow-y-scroll w-full p-6">
            <GoogleViewConfig handleChange={handleChange} product={product} />
            <GoogleKeywordsConfig
              product={product}
              handleChange={handleChange}
            />
            <UrlConfig handleChange={handleChange} product={product} />
            <div className="my-12">
              <div className="mb-3">
                <h2 className="text-xl my-3 font-bold text-zinc-800 drop-shadow-xl shadow-black">
                  Strona dodatkowa?
                </h2>
              </div>
              <div className="flex items-center hover:underline">
                <input
                  className="h-4 w-4"
                  type="checkbox"
                  checked={product.additionalPage}
                  value={product.additionalPage}
                  id="additionalPage"
                  name="additionalPage"
                  onClick={() =>
                    setProduct({
                      ...product,
                      additionalPage: !product.additionalPage,
                    })
                  }
                />
                <label htmlFor="additionalPage" className="ml-2">
                  {product.additionalPage ? "Tak" : "Nie"}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
