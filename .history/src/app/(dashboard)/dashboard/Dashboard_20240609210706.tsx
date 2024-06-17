"use client";
import "moment/locale/pl";
import { app, auth, getDocument, userUpdate } from "@/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import moment, { weekdays } from "moment";
import { FaTag } from "react-icons/fa";
import Loading from "./loading";
import LoginPage from "./LoginPage";
import UserInfo from "./UserInfo";
import BookingDetails from "../components/bookings/BookingDetails";
import Booking from "../components/bookings/Booking";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  moment.locale("pl");
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<any>();
  const [bookingView, setBookingView] = useState("accepted");
  const [copied, setCopied] = useState(false);
  const [openedBooking, setOpenedBooking] = useState<any>();
  const [shouldRefresh, setShouldRefresh] = useState(0);
  useEffect(() => {
    const ref = collection(getFirestore(app), "users");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push({ ...doc.data(), id: doc.id });
      });
      setUserData(snapshotData.filter((doc) => doc.uid === user?.uid));

      // setUserData(snapshotData);
    });
  }, []);

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
          <UserInfo loggedUser={userData?.loggedUser} />
          {userData?.isPaid}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-3 ">
            <div className="bg-white rounded-xl shadow-sm shadow-black ">
              <h2 className="text-2xl xl:text-3xl font-bold text-center bg-black text-white rounded-t-xl p-3">
                Kalendarz
              </h2>
              <div className="my-12">
                <button
                  onClick={() => {
                    console.log(userData);
                  }}
                >
                  update
                </button>
              </div>
              <Booking />
            </div>
          </div>
        </div>
      ) : (
        <>{loading && <Loading />}</>
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
