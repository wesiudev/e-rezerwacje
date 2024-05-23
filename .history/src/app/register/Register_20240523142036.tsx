"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { addDocument, auth } from "@/firebase";
import { toast } from "react-toastify";
import { toastUpdate } from "@/components/Toast/Toasts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { errorCatcher } from "../../../lib/errorCatcher";
import Toast from "@/components/Toast";
import moment from "moment";
export default function Register() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    password: "",
    repeatPassword: "",
    email: "",
  });
  function createAccount() {
    const id = toast.loading(<span>Tworzę konto...</span>);
    if (userData.password !== userData.repeatPassword) {
      toastUpdate("Hasła nie są takie same", id, "error");
      return;
    }
    if (userData.password?.length < 6) {
      toastUpdate("Hasło jest za krótkie (minimum 6 znaków)", id, "error");
      return;
    }
    if (!userData.email) {
      toastUpdate("Proszę wpisać email", id, "error");
      return;
    }

    (async () => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then((userCredential) => {
          addDocument("users", userCredential.user.uid, {
            email: userData.email,
            uid: userCredential.user.uid,
            subscriptionExpirationDate: new Date(),
          });
          toastUpdate("Sukces!", id, "success");
        });
      } catch (err: any) {
        const errorMsg = errorCatcher(err);
        toastUpdate(errorMsg, id, "error");

        router.push("/dashboard");
      }
    })();
  }

  return (
    <div className="relative flex flex-col h-screen justify-center items-center bg-gray-100 overflow-hidden font-light">
      <Toast />
      <form className="flex flex-col w-full max-w-sm p-6 bg-white rounded-lg shadow-md relative z-50">
        <label className="text-gray-700 mb-2 font-bold" htmlFor="email">
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
        <label className="text-gray-700 mb-2 font-bold" htmlFor="password">
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
          placeholder="Hasło"
          required
        />
        <label
          className="text-gray-700 mb-2 font-bold"
          htmlFor="repeatPassword"
        >
          Powtórz Hasło
        </label>
        <input
          id="repeatPassword"
          type="password"
          value={userData.repeatPassword}
          onChange={(e) =>
            setUserData({ ...userData, repeatPassword: e.target.value })
          }
          className="border border-gray-400 p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74b900]"
          placeholder="Powtórz hasło"
          required
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            createAccount();
          }}
          type="submit"
          className="bg-[#74b900] text-white py-2 rounded-md hover:bg-[#75b900c4] focus:outline-none focus:ring-2 focus:ring-[#75b900c4]"
        >
          Rejestracja
        </button>
        <div className="mt-2">
          Posiadasz już konto?{" "}
          <Link href="/dashboard" className="text-[#009ce7]">
            Zaloguj się
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
