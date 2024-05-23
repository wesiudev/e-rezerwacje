"use client";
import { toastUpdate } from "@/components/Toast/Toasts";
import { addDocument, auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { errorCatcher } from "../../../../lib/errorCatcher";
import Link from "next/link";
import Toast from "@/components/Toast";

export default function LoginPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    phone: "",
    password: "",
    passwordRepeat: "",
    email: "",
  });
  function signIn() {
    const id = toast.loading(<span>Loguję...</span>, {
      autoClose: 5000,
      closeOnClick: true,
    });
    (async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then((userCredential) => {
          toastUpdate("Sukces!", id, "success");
          router.push("/dashboard");
        });
      } catch (err: any) {
        const errorMsg = errorCatcher(err);
        toastUpdate(errorMsg, id, "error");
      }
    })();
  }
  return (
    <div className="relative flex flex-col h-screen justify-center items-center bg-gray-100 overflow-hidden font-light">
      <Toast />
      <form className="flex flex-col w-full max-w-sm p-6 bg-white rounded-lg shadow-md relative z-50">
        <label className="text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="border border-gray-400 p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74b900]"
          placeholder="Email"
          required
        />
        <label className="text-gray-700 font-bold mb-2" htmlFor="password">
          Hasło
        </label>
        <input
          id="password"
          type="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          className="border border-gray-400 p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74b900]"
          placeholder="Wpisz hasło"
          required
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
          type="submit"
          className="bg-[#74b900] text-white py-2 rounded-md hover:bg-[#75b900c4] focus:outline-none focus:ring-2 focus:ring-[#75b900c4]"
        >
          Login
        </button>
        <div className="mt-2">
          Nie posiadasz konta?{" "}
          <Link href="/register" className="text-[#009ce7]">
            Zarejestruj się
          </Link>
        </div>
      </form>{" "}
      <h2 className="text-center text-2xl py-12 bg-[#74b900] text-white px-3 rounded-b-xl relative z-50">
        E-Rezerwacje &copy; 2024
      </h2>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#74b900] via-[#009ce7] to-[#febe00] opacity-25"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#74b900] via-[#009ce7] to-[#febe00] opacity-25"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#74b900] via-[#009ce7] to-[#febe00] opacity-25 transform rotate-45"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#74b900] via-[#009ce7] to-[#febe00] opacity-25 transform -rotate-45"></div>
    </div>
  );
}
