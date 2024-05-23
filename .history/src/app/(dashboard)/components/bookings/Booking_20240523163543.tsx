"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MonthView from "./MonthView";
import { addDocument, auth, getDocument } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaClock, FaCoins } from "react-icons/fa";
import { toast } from "react-toastify";
import { toastUpdate } from "@/components/Toast/Toasts";
import { polishToEnglish } from "../../../../../lib/polishToEnglish";
import BookBtn from "../BookBtn";
import { checkReliability } from "../../../../../lib/checkReliability";
export default function Booking({ bookings }: { bookings?: any }) {
  const initialState = {
    name: "",
    time: { month: "", day: "", hour: "" },
  };
  const [user, loading] = useAuthState(auth);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [chosenService, setChosenService] = useState<any>(initialState);
  const [visibleMonths, setVisibleMonths] = useState(2);
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    async function getUser() {
      await getDocument("users", user?.uid).then((res) => setUserData(res));
    }
    if (user) {
      getUser();
    }
  }, [loading]);
  const nodeRef = useRef<any>();
  function setDate(day: any, month: any) {
    setChosenService({
      ...chosenService,
      time: {
        month: month,
        day: day,
        hour: "",
      },
    });
  }
  function setHour(arg: string) {
    setChosenService({
      ...chosenService,
      time: {
        month: chosenService.time.month,
        day: chosenService.time.day,
        hour: arg,
      },
    });
  }
  async function createBooking(isReliable: boolean, uniqueId: string) {
    addDocument("bookings", uniqueId, {
      ...chosenService,
      isCompleted: false,
      isReliable: isReliable,
      phoneNumber: userData ? userData.phoneNumber : phoneNumber,
      id: uniqueId,
      uid: user?.uid,
      time: chosenService.time,
      price: chosenService.price,
    });
  }
  const router = useRouter();
  const finalizeOrder = async (phoneNumber: string) => {
    const id = toast.loading(<span>Rezerwuję usługę...</span>);

    const uniqueId = uuidv4();
    if (user) {
      await checkReliability(user?.uid, bookings)
        .then((isReliable) => createBooking(isReliable, uniqueId))
        .then(() => {
          router.push(
            `/rezerwacje/finalizacja?phoneNumber=${phoneNumber}&bookingId=${uniqueId}`
          );
          toastUpdate("Zarezerwowano pomyślnie.", id, "success");
        });
    } else {
      await addDocument("bookings", uniqueId, {
        ...chosenService,
        isCompleted: false,
        isReliable: false,
        phoneNumber: phoneNumber,
        id: uniqueId,
        time: chosenService.time,
        price: chosenService.price,
      }).then(() => {
        toastUpdate("Zarezerwowano pomyślnie.", id, "success");
        router.push(
          `/rezerwacje/finalizacja?phoneNumber=${phoneNumber}&bookingId=${uniqueId}`
        );
      });
    }
  };
  const [openedDescriptions, setOpenedDescriptions] = useState<number[]>([]);

  return (
    <div className="relative">
      {chosenService.name && (
        <div
          onClick={() => setChosenService(initialState)}
          className="bg-black bg-opacity-75 fixed top-0 left-0 w-screen h-screen z-[50]"
        />
      )}
      <h2 className="text-zinc-800 font-bold drop-shadow-lg shadow-black py-3 text-2xl sm:text-4xl mt-6 rounded-lg">
        Rezerwujesz usługę w e-rezerwacje.com.pl
      </h2>
      <div className="w-1 h-1" ref={nodeRef}></div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col items-start space-y-4 lg:w-[55vw]">
          <div
            className={`w-full flex flex-col rounded-xl bg-gray-300 relative `}
          >
            <div className="w-full sm:p-3 flex flex-row justify-between text-xl text-zinc-800 drop-shadow-lg shadow-black">
              <div className="flex flex-row items-start justify-between w-full">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between w-full px-3 sm:px-0">
                    <div className="sm:block hidden ml-2">
                      <BookBtn
                        setChosenService={setChosenService}
                        chosenService={chosenService}
                        isMobile={false}
                      />
                    </div>
                  </div>

                  <p className="block sm:hidden font-normal text-sm px-3 mt-2">
                    opis
                  </p>

                  <div className="sm:hidden flex flex-row items-start my-2 px-3">
                    <span className="text-sm sm:text-base p-1 rounded-xl font-normal flex flex-row items-center bg-gray-400 text-white px-1.5 sm:px-3">
                      <FaCoins className="mr-1.5 " /> cena
                    </span>

                    <span className="ml-2 text-sm sm:text-base font-normal flex flex-row items-center p-1 rounded-xl bg-gray-400 text-white w-max px-1.5 sm:px-3">
                      <FaClock className="mr-1.5 " />
                      {service.duration}
                    </span>
                  </div>
                  <div className={`block sm:hidden mt-2`}>
                    <BookBtn
                      setChosenService={setChosenService}
                      service={service}
                      scrollTo={idx}
                      chosenService={chosenService}
                      isMobile={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            {chosenService.name === service.serviceName && (
              <div
                className={`rounded-b-xl w-full h-max left-0 top-0 flex items-center duration-1000 justify-center`}
              >
                <div className={`bg-white w-full rounded-b-xl relative p-3`}>
                  <h2 className="text-zinc-800 font-bold drop-shadow-lg shadow-black py-3 text-2xl mb-3 rounded-lg">
                    Wybierz termin
                  </h2>
                  <MonthView
                    setChosenService={setDate}
                    chosenService={chosenService}
                    setHour={setHour}
                    hour={chosenService.time.hour}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    finalizeOrder={finalizeOrder}
                    bookings={bookings}
                    visibleMonths={visibleMonths}
                    setVisibleMonths={setVisibleMonths}
                    userData={userData}
                  />
                  <button
                    onClick={() => setChosenService(initialState)}
                    className=" bg-black hover:bg-opacity-80 text-white p-2 px-3 mt-3 w-full"
                  >
                    Wyjście
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
