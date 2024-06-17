import Link from "next/link";

export default function WeekMenu({
  weekMenu,
  setWeekMenu,
  userHours,
}: {
  weekMenu: number;
  setWeekMenu: Function;
  userHours: any;
}) {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-[40rem] h-[70vh] overflow-y-scroll bg-white text-zinc-800"></div>
    </div>
  );
}
