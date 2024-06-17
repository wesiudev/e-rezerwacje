"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MonthView from "./MonthView";
import { addDocument, auth, getDocument } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
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
  // const nodeRef = useRef<any>();
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

  return (
    <div className="relative">
      {chosenService.name && (
        <div
          onClick={() => setChosenService(initialState)}
          className="bg-black bg-opacity-75 fixed top-0 left-0 w-screen h-screen z-[50]"
        />
      )}
      {/* <h2 className="text-zinc-800 font-bold drop-shadow-lg shadow-black py-3 text-2xl sm:text-4xl mt-6 rounded-lg">
        Rezerwujesz usługę w e-rezerwacje.com.pl
      </h2> */}
      {/* <div className="w-1 h-1" ref={nodeRef}></div> */}
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col items-start space-y-4 lg:w-[55vw]">
          <div className={`w-full flex flex-col rounded-xlrelative `}>
            <div
              className={`rounded-b-xl w-full h-max left-0 top-0 flex items-center duration-1000 justify-center`}
            >
              <div className={`bg-white w-full rounded-b-xl relative p-3`}>
                <h2 className="text-zinc-800 font-bold drop-shadow-lg shadow-black py-3 text-2xl mb-3 rounded-lg">
                  Twój kalendarz rezerwacji
                </h2>
                <MonthView
                  setChosenService={setDate}
                  chosenService={chosenService}
                  setHour={setHour}
                  hour={chosenService.time.hour}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  bookings={bookings}
                  visibleMonths={visibleMonths}
                  setVisibleMonths={setVisibleMonths}
                  userData={userData}
                />
                {/* <button
                  onClick={() => setChosenService(initialState)}
                  className=" bg-black hover:bg-opacity-80 text-white p-2 px-3 mt-3 w-full"
                >
                  Wyjście
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
