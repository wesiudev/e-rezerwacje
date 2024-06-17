import Link from "next/link";

export default function ChooseHoursInADay({
  weekMenu,
  setWeekMenu,
  choosingHoursInDayIndexedByNumber,
}: {
  weekMenu: number;
  setWeekMenu: Function;
  choosingHoursInDayIndexedByNumber: any;
}) {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[40rem] h-[70vh] overflow-y-scroll bg-white text-zinc-800">
        <h2>Zarządzasz godzinami w dniu:</h2>
      </div>
    </div>
  );
}
