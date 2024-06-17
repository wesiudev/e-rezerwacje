"use client";
import "moment/locale/pl";
import { app, auth, getDocument } from "@/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
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
      querySnapshot.filter((doc: any) => {
        doc.data().uid === user?.uid;
      });
      setUserData(snapshotData);
    });
  }, []);
  useEffect(() => {
    // podlaczyc realtime db
    if (user) {
      const getUserData = async (uid: any) => {
        const loggedUser = await getDocument("users", user?.uid);
        return { loggedUser };
      };

      getUserData(user?.uid).then((res) => setUserData(res));
    }
  }, [loading, user, shouldRefresh]);

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
          {userData.isPaid}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-3 ">
            <div className="bg-white rounded-xl shadow-sm shadow-black ">
              <h2 className="text-2xl xl:text-3xl font-bold text-center bg-black text-white rounded-t-xl p-3">
                Kalendarz
              </h2>
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
