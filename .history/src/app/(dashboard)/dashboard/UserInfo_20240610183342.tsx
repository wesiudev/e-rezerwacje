import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function UserInfo({ loggedUser }: { loggedUser: any }) {
  return (
    <div className="max-w-[100vw] mx-auto py-12 bg-dashboard  bg-left bg-gray-500 bg-no-repeat bg-cover sm:bg-contain rounded-xl relative">
      <div className="bg-black bg-opacity-60 w-full h-full rounded-xl left-0 top-0 absolute"></div>
      <div className="relative z-[50] flex flex-col items-center ">
        <div className="rounded-full bg-indigo-500 p-12">
          <FaUser className="text-white w-12 h-12" />
        </div>
        <h2 className="font-bold text-xl lg:text-2xl mt-4 text-white">
          {loggedUser ? loggedUser?.email : "Ładowanie"}
        </h2>
        <button
          onClick={() => signOut(auth)}
          className="bg-gray-500 text-white rounded-md px-3 p-1 mt-2"
        >
          Wyloguj
        </button>
      </div>
    </div>
  );
}
