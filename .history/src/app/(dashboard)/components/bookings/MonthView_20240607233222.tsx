import React from "react";
import moment from "moment";
import "moment/locale/pl";

export default function MonthView({
  setChosenService,
  chosenService,
  setHour,
  hour,
  phoneNumber,
  setPhoneNumber,
  bookings,
  visibleMonths,
  setVisibleMonths,
  userData,
}: {
  setChosenService: Function;
  chosenService: any;
  setHour: Function;
  hour: string;
  phoneNumber: string;
  setPhoneNumber: Function;
  bookings: any[];
  visibleMonths: number;
  setVisibleMonths: Function;
  userData: any;
}) {
  moment.locale("pl");
  const userConfig = {
    workingDays: [
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
      "niedziela",
    ],
  };
  const startDate = moment().add(2, "days");
  const weeks = [];
  let currentDate = startDate.clone();
  while (weeks.length < visibleMonths) {
    const days = [];
    const monthName = currentDate.format("MMMM");
    const currentMonth = currentDate.month();
    const daysInMonth = currentDate.daysInMonth();
    for (let day = 0; day < daysInMonth; day++) {
      if (currentDate.month() === currentMonth) {
        if (
          !currentDate
            .format("DD dddd")
            .includes(userConfig.workingDays[currentDate.day()])
        ) {
          days.push({
            day: currentDate.format("DD dddd"),
            year: currentDate.year(), // Include the year in the days array
          });
        }
      } else {
        break;
      }

      currentDate.add(1, "day");
    }

    weeks.push({ monthName, days });
  }

  const capitalizeFirstLetter = (inputString: string) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  };

  const manageBooking = (day: any, monthName: any, year: any, hour: any) => {
    const time = {
      day: {
        day,
        year,
      },
      month: monthName,
      hour,
    };
    setChosenService(time);
    console.log(time);
  };

  return (
    <>
      {weeks.map((weekData, idx) => (
        <div key={idx}>
          {weekData.days.length > 0 && (
            <p className={`my-2 text-xl font-bold ${idx === 0 && "!mt-0"}`}>
              {capitalizeFirstLetter(weekData.monthName) +
                " " +
                weekData.days[0].year}
            </p>
          )}
        </div>
      ))}
      <div className="w-full flex items-center justify-center">
        <button
          onClick={() => setVisibleMonths(visibleMonths + 2)}
          className="my-6 p-1 px-3 rounded-xl bg-green-600 hover:bg-green-800 text-white  text-lg mx-auto w-max"
        >
          Wczytaj więcej
        </button>
      </div>
    </>
  );
}
