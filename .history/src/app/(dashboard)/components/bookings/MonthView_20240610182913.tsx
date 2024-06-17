"use client";
import React from "react";
import moment from "moment";
import "moment/locale/pl";
import {
  removeNumbersFromString,
  removeSpacesFromString,
} from "../../../../../lib/removeNumbersFromString";
import { polishToEnglish } from "../../../../../lib/polishToEnglish";

export default function MonthView({
  setChosenService,
  chosenService,
  visibleMonths,
  setVisibleMonths,
  userData,
}: {
  setChosenService: Function;
  chosenService: any;
  visibleMonths: number;
  setVisibleMonths: Function;
  userData: any;
}) {
  moment.locale("pl");

  const startDate = moment().add(2, "days");
  const weeks = [];
  let currentDate = startDate.clone();
  while (weeks.length < visibleMonths) {
    const days = [];
    const monthName = currentDate.format("MMMM");
    const currentMonth = currentDate.month();
    const daysInMonth = currentDate.daysInMonth();

    const formattedDay = moment(currentDate).format("dddd");
    for (let day = 0; day < daysInMonth; day++) {
      if (currentDate.month() === currentMonth) {
        days.push({
          day: currentDate.format("DD dddd"),
          year: currentDate.year(), // Include the year in the days array
        });
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
  };
  console.log(userData.userWeeks?.includes("poniedziałek"));

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
          <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-1 sm:gap-0 sm:space-x-3 sm:space-y-3">
            {weekData.days.map((day, dayIndex) => (
              <>
                {userData?.userWeeks?.includes(
                  removeNumbersFromString(removeSpacesFromString(day.day))
                ) && (
                  <div
                    key={dayIndex}
                    className={`${
                      dayIndex === 0 && "ml-3 mt-3"
                    } flex flex-col relative`}
                  >
                    <button
                      onClick={() => {
                        console.log(
                          day.day.toString().includes("poniedziałek")
                        );
                      }}
                      className={`${
                        (
                          chosenService.time.month + chosenService.time.day.day
                        ).toString() ===
                        (weekData.monthName + day.day).toString()
                          ? "border-indigo-800 bg-indigo-400 border-2 text-green-400"
                          : "border-2 border-transparent"
                      } p-1 rounded-xl duration-100 text-zinc-800 text-sm sm:text-base bg-gray-300`}
                    >
                      {day.day}
                    </button>
                  </div>
                )}
              </>
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
