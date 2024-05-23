import Image from "next/image";
import Link from "next/link";
import { FaImage } from "react-icons/fa";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="min-w-[300px]">
      <Link href={`/${product.url}`} className="w-full h-full flex flex-col">
        <div className="w-full h-full">
          {product.primaryImage !== "" && (
            <div className="aspect-square w-full overflow-hidden relative group rounded-3xl">
              <Image
                src={product?.primaryImage}
                width={248}
                height={248}
                alt={`Obrazek reklamy ${product?.title}`}
                className="absolute inset-0 object-cover w-full h-full group-hover:scale-100 scale-110 duration-500"
              />
            </div>
          )}
          {!product.primaryImage && (
            <div className="bg-gray-300 hover:bg-opacity-80 duration-300 flex items-center justify-center rounded-3xl w-full aspect-square">
              <FaImage className="text-7xl text-gray-500" />
            </div>
          )}
        </div>
        <p className="font-cocobold text-zinc-800 drop-shadow-xl shadow-black">
          {product.urlLabel}
        </p>
      </Link>
    </div>
  );
}
