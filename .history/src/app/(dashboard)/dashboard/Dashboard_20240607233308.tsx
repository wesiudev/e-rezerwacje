"use client";
import "moment/locale/pl";
import { auth, getDocument } from "@/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { FaTag } from "react-icons/fa";
import Loading from "./loading";
import LoginPage from "./LoginPage";
import UserInfo from "./UserInfo";
import BookingDetails from "../components/bookings/BookingDetails";
import Booking from "../components/bookings/Booking";

export default function Dashboard() {
  moment.locale("pl");
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<any>();
  const [bookingView, setBookingView] = useState("accepted");
  const [copied, setCopied] = useState(false);
  const [openedBooking, setOpenedBooking] = useState<any>();
  const [shouldRefresh, setShouldRefresh] = useState(0);
  useEffect(() => {
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
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-3 ">
            <div className="bg-white rounded-xl shadow-sm shadow-black ">
              <h2 className="text-2xl xl:text-3xl font-bold text-center bg-black text-white rounded-t-xl p-3">
                Rezerwacje
              </h2>
              <Booking />
              {/* <BookingsButtons
                setBookingView={setBookingView}
                bookingView={bookingView}
                bookings={userData?.bookings}
              />
              <BookingsMap
                bookings={userData?.bookings}
                setOpenedBooking={setOpenedBooking}
                loading={loading}
                bookingView={bookingView}
              /> */}
            </div>
            <div className="bg-white rounded-xl h-max shadow-sm shadow-black">
              <h2 className="text-2xl xl:text-3xl font-bold  rounded-t-xl p-3 text-center bg-black text-white">
                Ustawienia
              </h2>

              {/* <UserInvitations
                relatedUsers={userData?.relatedUsers}
                loading={loading}
                uid={userData?.loggedUser?.uid}
                setShouldRefresh={setShouldRefresh}
                shouldRefresh={shouldRefresh}
              /> */}
              {/* <div className="w-full p-3 py-6 bg-gray-300 rounded-b-xl text-zinc-700 text-center flex items-center justify-center relative">
                {!loading && (
                  <>
                    <div className="text-sm sm:text-lg absolute rounded-b-xl left-0 top-0 w-full h-full flex items-center justify-center group hover:bg-black duration-300 hover:bg-opacity-40">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `https://www.manicuregrudziadz.pl/register?ref=${user?.uid}`,
                            setCopied
                          )
                        }
                        className={`${
                          copied
                            ? "bg-green-500 hover:bg-green-700"
                            : "bg-indigo-500 hover:bg-indigo-700 "
                        } duration-150 p-2 px-4 opacity-0 group-hover:opacity-100 font-bold text-white rounded-xl`}
                      >
                        {!copied ? "Skopiuj Link" : "Skopiowano pomyślnie!"}
                      </button>
                    </div>
                    <span className="text-sm sm:text-lg">
                      {cutSentence(`?ref=${user?.uid}`)}
                    </span>
                  </>
                )}
                {loading && "Wczytywanie danych..."}
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <>{loading && <Loading />}</>
      )}
    </>
  );
}
