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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-1">
            {weekData.days.map((day, dayIndex) => (
              <div key={dayIndex} className="flex flex-col relative">
                <button
                  onClick={() => {
                    manageBooking(day.day, weekData.monthName, day.year, "");
                  }}
                  className={`${
                    (
                      chosenService.time.month + chosenService.time.day.day
                    ).toString() === (weekData.monthName + day.day).toString()
                      ? "border-indigo-800 bg-indigo-400 border-2 text-green-400"
                      : "border-2 border-transparent"
                  } p-1 rounded-xl duration-100 text-zinc-800 text-sm sm:text-base bg-gray-300`}
                >
                  {day.day}
                </button>
                {chosenService.time.day.day === day.day &&
                  chosenService.time.month === weekData.monthName &&
                  chosenService.time.day.year === day.year && (
                    <div className="my-1 bg-gray-200 rounded-xl">
                      <h2 className="my-1 mx-auto text-sm sm:text-lg xl:text-base 2xl:text-lg text-zinc-800 drop-shadow-xl shadow-black font-bold w-max">
                        Dostępne godziny
                      </h2>
                      <div className="text-white grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 text-center gap-1 mt-1 mb-1">
                        {availableHours.map((item: any, idx: any) => (
                          <button
                            disabled={bookings?.some(
                              (booking) =>
                                booking.time.day.day === day.day &&
                                booking.time.hour === item &&
                                booking.time.day.year === day.year &&
                                booking.time.month === weekData.monthName &&
                                booking.isReliable
                            )}
                            key={idx}
                            onClick={() => {
                              setHour(item);
                              manageBooking(
                                day.day,
                                weekData.monthName,
                                day.year,
                                item
                              );
                            }}
                            className={`bg-indigo-600 disabled:border-2 disabled:border-red-500 disabled:text-red-500 disabled:bg-white hover:bg-indigo-500 duration-500 p-1 px-2 rounded-xl border-2 ${
                              hour === item
                                ? "border-indigo-800 bg-indigo-400 text-green-400"
                                : "border-transparent"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      {chosenService.time.hour && !userData && (
                        <input
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="bg-white border-2 border-green-500 font-bold text-xl p-2 rounded-xl text-black mt-1 w-full"
                          placeholder="Numer tel."
                          type="text"
                        />
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
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
