"use client";
import "moment/locale/pl";
import { app, auth, userUpdate } from "@/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import Loading from "./loading";
import LoginPage from "./LoginPage";
import UserInfo from "./UserInfo";
import BookingDetails from "../components/bookings/BookingDetails";
import Booking from "../components/bookings/Booking";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import ChooseHoursInADay from "./ChooseHoursInADay";
import { FaInfoCircle } from "react-icons/fa";

export default function Dashboard() {
  moment.locale("pl");
  const [user, loading] = useAuthState(auth);

  const [userData, setUserData] = useState<any>();
  const [openedBooking, setOpenedBooking] = useState<any>();
  const [shouldRefresh, setShouldRefresh] = useState(0);
  const [day, setDay] = useState<any>();
  useEffect(() => {
    if (user) {
      const ref = collection(getFirestore(app), "users");
      const unsub = onSnapshot(ref, (querySnapshot: any) => {
        const snapshotData: any[] = [];
        querySnapshot.forEach((doc: any) => {
          snapshotData.push({ ...doc.data(), id: doc.id });
        });

        setUserData(snapshotData.find((snap: any) => snap.id === user?.uid));
      });
    }
  }, [loading]);

  return (
    <>
      {!user && !loading && <LoginPage />}
      {user ? (
        <div className="bg-gray-300 w-full min-h-screen px-6 md:px-8 xl:px-32 font-sans py-12">
          {openedBooking && (
            <BookingDetails
              setOpenedBooking={setOpenedBooking}
              booking={openedBooking}
              // bookings={bookings}
              setShouldRefresh={setShouldRefresh}
              shouldRefresh={shouldRefresh}
            />
          )}
          <UserInfo loggedUser={userData} />

          <div className="mt-12 grid grid-cols-1 gap-3">
            <div className="bg-white rounded-xl shadow-sm shadow-black ">
              <h2 className="text-2xl xl:text-3xl font-bold text-center bg-black text-white rounded-t-xl p-3">
                Kalendarz
              </h2>
              <h2 className="text-2xl xl:text-3xl font-bold mt-6 px-3">
                Dostępne dni
              </h2>
              <div className="mb-12 flex flex-wrap space-x-3 space-y-3">
                {weekDays.map((day: any, i: any) => (
                  <button
                    onClick={() =>
                      userData?.userWeeks?.includes(day)
                        ? userUpdate(userData?.uid, {
                            userWeeks: userData?.userWeeks?.filter(
                              (d: any) => d !== day
                            ),
                          })
                        : userUpdate(userData?.uid, {
                            userWeeks: [...userData.userWeeks, day],
                          })
                    }
                    key={i}
                    className={`${
                      i === 0 && "mt-3 ml-3"
                    } px-3 py-1 font-bold duration-150 ${
                      userData?.userWeeks?.includes(day)
                        ? "text-white bg-green-500"
                        : "text-zinc-800 bg-gray-300"
                    }`}
                  >
                    {day}
                  </button>
                ))}{" "}
              </div>
              <h2 className="px-3 text-zinc-800 font-bold drop-shadow-lg shadow-black text-2xl">
                Dostępne godziny
              </h2>
              {userData?.userHours.filter((day: any) => day.hours.length > 0)
                .length === 0 && (
                <div className="bg-zinc-800 text-white font-bold p-3 drop-shadow-lg shadow-black flex flex-row items-center">
                  <FaInfoCircle className="text-green-500 mr-2" />
                  Ustaw godziny w których chcesz przyjmować swoich klientów
                  klikając w dany dzień.
                </div>
              )}
              <div className="duration-500 mb-12 flex flex-wrap space-x-3 space-y-3">
                {userData?.userHours?.map((dayWithHours: any, i: any) => (
                  <button
                    onClick={() => setDay(dayWithHours)}
                    key={i}
                    className={`${i === 0 && "mt-3 ml-3"} ${
                      userData?.userWeeks?.includes(dayWithHours.name)
                        ? "relative opacity-100"
                        : "fixed -left-[1000px] -top-[1000px] opacity-0 w-[px]"
                    } duration-500 text-white font-bold bg-blue-500`}
                  >
                    <div className="px-3 py-1">{dayWithHours.name}</div>
                    {userData?.userHours[i].name === dayWithHours.name && (
                      <>
                        {userData?.userHours[i]?.hours?.length === 0 && (
                          <div className="px-2 py-1 w-full bottom-0 left-0 text-sm bg-red-500 text-white font-bold">
                            Brak godzin
                          </div>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>
              <Booking userData={userData} />
            </div>
          </div>
        </div>
      ) : (
        <>{loading && <Loading />}</>
      )}
      {day !== "" && (
        <ChooseHoursInADay
          day={day}
          setDay={setDay}
          userHours={userData?.userHours}
          user={userData}
        />
      )}
    </>
  );
}

const weekDays = [
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
  "niedziela",
];
