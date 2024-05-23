"use client";
import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [reciever, setReciever] = useState(0);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    message: "",
  });
  const handleChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    if (target.name === "phone") {
      setPhone(target.value);
    } else if (target.name === "message") {
      setMessage(target.value);
    }
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      phone: "",
      message: "",
    };

    if (!message) {
      newErrors.message = "Proszę wpisać wiadomość";
      isValid = false;
    } else if (message.length < 10) {
      newErrors.message = "Wiadomość powinna mieć co najmniej 10 znaków";
      isValid = false;
    }

    setTimeout(() => {
      setErrors(newErrors);
    }, 7500);
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/mailer`,
        {
          method: "POST",
          body: JSON.stringify({ phone, reciever, message }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      if (res?.message?.accepted?.length > 0) {
        setMessage("");

        setIsSent(true);
      } else {
        alert("Coś poszło nie tak, spróbuj ponownie później");
      }
    }
  };
  return (
    <div className="flex flex-col bg-[#74B901] p-6 w-full">
      <label className="text-3xl text-white" htmlFor="reciever">
        Odbiorca
      </label>
      <select
        className="mt-6 xl:w-1/2 lg:w-full bg-white rounded-xl px-4 py-2 text-center font-bold text-2xl text-zinc-800 drop-shadow-black shadow-xl"
        onChange={(e: any) => setReciever(e.target.value)}
        value={reciever}
        name="reciever"
      >
        <option value="biuro@reklamy-figurscy.com.pl" className="font-light">
          Biuro
        </option>
        <option value="piotr@reklamy-figurscy.com.pl" className="font-light">
          Imie Nazwisko
        </option>
        <option value="wioletta@reklamy-figurscy.com.pl" className="font-light">
          Imie Nazwisko
        </option>
      </select>
      <label htmlFor="phone" className="text-3xl text-white mt-6">
        Numer Telefonu
      </label>
      <div className={`${errors.phone && "text-red-500"}`}>{errors.phone}</div>
      <input
        placeholder="Wpisz swój numer telefonu"
        type="text"
        id="phone"
        className="xl:w-1/2 lg:w-full p-3 rounded-xl mt-6 placeholder:font-light"
        onChange={(e: any) => setPhone(e.target.value)}
      />
      <label htmlFor="message" className="text-white mt-6">
        Wiadomość
      </label>
      <textarea
        onChange={handleChange}
        name="message"
        id="message"
        className="xl:w-1/2 lg:w-full p-3 rounded-xl mt-6 placeholder:font-light"
        placeholder="Wpisz wiadomość"
      ></textarea>
      <div className={`${errors.message && "text-red-500"}`}>
        {errors.message}
      </div>
      <div
        className={`${
          isSent ? "text-white scale-y-100" : "text-orange-500 scale-y-0"
        } duration-500 mt-4 font-light`}
      >
        Wysłano pomyślnie
      </div>
      <button
        type="submit"
        onClick={(e: any) => !isSent && handleSubmit(e)}
        className="text-zinc-800 bg-white p-4 mt-12 w-max px-16 flex items-center justify-center"
      >
        {!isSent && "Wyślij"}
        {isSent && "Wiadomość wysłana"}
        <Image
          src="/icons/favicon-32x32.png"
          width={64}
          height={64}
          alt=""
          className="ml-2 w-6 h-6"
        />
      </button>
    </div>
  );
}
