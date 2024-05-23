import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-center h-screen w-full text-black bg-white">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center mt-6">Taka strona nie istnieje!</h1>
        <Link href="/" className="text-[#010BB0] mt-4">
          <div className="hover-underline-animation">
            <div className="flex flex-row items-center ">
              Strona główna
              <FaArrowRight className="ml-2" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
