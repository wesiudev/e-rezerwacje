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
              <h2 className="text-2xl xl:text-3xl font-bold px-3">
                Dostępne godzinyaaaa
              </h2>
              <div className="duration-500 mb-12 flex flex-wrap space-x-3 space-y-3">
                {userData?.userHours?.filter(
                  (a: any, b: any) => a.name === day
                )?.((dayWithHours: any, i: any) => (
                  <button
                    onClick={() => console.log(userData?.userHours)}
                    key={i}
                    className={`${i === 0 && "mt-3 ml-3"} ${
                      userData.userWeeks.includes(userData?.userHours[0].name)
                        ? "fixed opacity-0 w-[px]"
                        : "relative opacity-100"
                    } duration-500 text-white font-bold bg-blue-500 relative`}
                  >
                    <div className="px-3 py-1">{dayWithHours.name}</div>
                    {userData?.userHours[i].name === dayWithHours && (
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
