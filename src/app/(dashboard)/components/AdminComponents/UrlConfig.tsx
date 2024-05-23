import Link from "next/link";

export default function UrlConfig({
  product,
  handleChange,
}: {
  product: any;
  handleChange: any;
}) {
  return (
    <div>
      <h2 className="text-xl my-3 font-bold text-zinc-800 drop-shadow-xl shadow-black">
        Link do produktu
      </h2>
      <div className="flex items-center">
        <h2 className="text-lg">https://reklamyfigurscy.pl/</h2>{" "}
        <input
          type="text"
          value={product.url}
          name="url"
          onChange={(e) => handleChange(e)}
          className="font-bold bg-gray-300 outline-none w-full p-3 ml-3"
        />
      </div>
      <h2 className="text-xl my-3 font-bold text-zinc-800 drop-shadow-xl shadow-black">
        Etykieta linku <br />{" "}
        <span className="text-sm">
          (pojawi się w liście produktów w nagłówku górnym oraz stopce dolnej
          strony)
        </span>
      </h2>

      <input
        type="text"
        value={product.urlLabel}
        name="urlLabel"
        onChange={(e) => handleChange(e)}
        className="bg-gray-300 outline-none w-full p-3"
      />
    </div>
  );
}
