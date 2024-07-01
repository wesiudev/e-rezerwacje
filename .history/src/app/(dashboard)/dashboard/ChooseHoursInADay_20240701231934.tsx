import { updateDocument } from "@/firebase";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function ChooseHoursInADay({
  day,
  setDay,
  userHours,
  user,
}: {
  day: any;
  setDay: Function;
  userHours: any;
  user: any;
}) {
  function updateUserHours() {
    //todo here
  }
  return (
    <div
      onClick={() => setDay("")}
      className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-[40rem] h-[70vh] overflow-y-scroll bg-white text-zinc-800 p-6 xl:p-12">
          <h2 className="text-3xl font-bold text-zinc-800 drop-shadow-xl shadow-black w-full">
            Zarządzasz godzinami w dniu:{" "}
            <span className="text-green-500 font-bold">{day?.name}</span>
          </h2>
          <div className="my-4">Twoje godziny to:</div>

          {day?.hours.map((hour: any, i: any) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border-2 border-black"
            >
              <div className="">{hour}</div>
              <button className="group hover:text-white flex items-center p-3 border border-red-500 hover:bg-red-500 rounded-md duration-500">
                <FaTrash className="mr-3 text-red-500 group-hover:text-white duration-500" />
                Usuń
              </button>
            </div>
          ))}
          <button
            onClick={() => updateUserHours()}
            className="w-max mx-auto bg-green-500 hover:bg-green-400 text-white rounded-md px-3 p-1 mt-2"
          >
            add 15:30 to the hours.
          </button>
        </div>
      </div>
    </div>
  );
}
