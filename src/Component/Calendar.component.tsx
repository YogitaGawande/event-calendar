import React, { useEffect, useState } from "react";
import IndexedDB from "../Utils/IndexedDB";
import { EventInterface } from "../Interfaces/events.interface";
import AddEventModal from "./AddEventModal/AddEventModal.component";
import Header from "./Header/Header.component";

const EventCalendar: React.FC = () => {
    const date = new Date();
    const todayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const [weekDates, setWeekDates] = useState<Date[]>([]);
    const [displayMonth, setDisplayMonth] = useState<string>();
    const [displayYear, setDisplayYear] = useState<number>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [eventTitle, setEventTitle] = useState<string>("");
    const [events, setEvents] = useState<EventInterface[]>([]);

    // Define the days of the week as a constant array
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Sample data for events

    // Define the months as a constant array
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const colorCodes = ['bg-[#93e3e3]', 'bg-[#ca3355]', 'bg-[#abcdef]', 'bg-[#0a8d6a]']

    /*
    Description: This function is used to get date of the week
    Input: Referende date i.e. any date in any week
    Output: It will give dates of the week of which we have provided reference date.
    */
    const getWeek = (referenceDate: Date) => {
        const sunday = new Date(
            referenceDate.setDate(referenceDate.getDate() - referenceDate.getDay())
        );
        const weekArray = [new Date(sunday)];
        while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
            weekArray.push(new Date(sunday));
        }
        setWeekDates(weekArray);
    }

    useEffect(() => {
        getWeek(new Date());
        setDisplayMonth(months[todayDate.getMonth()]);
        setDisplayYear(todayDate.getFullYear());
    }, []);

    useEffect(() => {
        getAllEvents();
    }, [weekDates]);

    /*
    Description: This function is used to get all dates of the previous week from current week
    Input: Referende date i.e. start date of currently displayed week
    Output: It will give dates of the previous week of which we have provided reference date.
    */
    const handlePreviousClick = () => {
        const referenceDate = weekDates[0];
        getWeek(new Date(referenceDate.setDate(referenceDate.getDate() - 1)));
        setDisplayMonth(months[referenceDate.getMonth()]);
        setDisplayYear(referenceDate.getFullYear());
    }

    /*
    Description: This function is used to get all dates of the next week from current week
    Input: Referende date i.e. end date of currently displayed week
    Output: It will give dates of the next week of which we have provided reference date.
    */
    const handleNextClick = () => {
        const referenceDate = weekDates[6];
        getWeek(new Date(referenceDate.setDate(referenceDate.getDate() + 1)));
        setDisplayMonth(months[referenceDate.getMonth()]);
        setDisplayYear(referenceDate.getFullYear());
    }

    /*
    Description: This function is used to check if provided date is today's date or not
    Input: Today date, Referende date: i.e. date for which we are checking status
    Output: true/false
    */
    const isTodayDate = (todayDate: Date, referenceDate: Date) => {
        if (
            todayDate.getDate() === referenceDate.getDate() &&
            todayDate.getMonth() === referenceDate.getMonth()
        )
            return true;
        return false;
    }

    /*
    Description: This function is used to open pop up to add new event.
    It accepts date and time as parameter to pre set value of date and time for which we are adding event.
    */
    const handleCellClick = (date: string, time: string) => {
        setShowModal(true);
        console.log(showModal)
        setSelectedDate(date);
        setSelectedTime(time);
        setEventTitle("");
    };

    /*
    Description: This function is used to save new event in indexed db with all the required parameters like title, date, time.
    */
    const handleSaveEvent = () => {
        const newEvent: Partial<EventInterface> = {
            title: eventTitle,
            date: selectedDate,
            time: selectedTime,
            color: colorCodes[(Math.random() * colorCodes.length) | 0]
        };
        // method to add event in indexed db
        IndexedDB.addData(newEvent)
        // method to get all the saved events in indexed db
        getAllEvents();
        // Close the modal and reset the state
        setShowModal(false);
        setSelectedDate("");
        setSelectedTime("");
        setEventTitle("");
    };

    // get all saved events from Indexed DB
    const getAllEvents = async () => {
        await IndexedDB.getAllData().then((eventsData: EventInterface[]) => {
            console.log(eventsData)
            if (eventsData && eventsData.length > 0) {
                setEvents(eventsData);
            } else {
                // just added these events if no data available in indexed db
                setEvents([{
                    id: 1,
                    title: 'Start Event 1',
                    date: '2023-08-01',
                    time: '09:00',
                    color: 'bg-[#abcdef]'
                }, {
                    id: 2,
                    title: 'Start Event 2',
                    date: '2023-08-02',
                    time: '09:00',
                    color: 'bg-[#abcde0]'
                },
                {
                    id: 2,
                    title: 'Start Event 3',
                    date: '2023-08-02',
                    time: '09:00',
                    color: 'bg-[#abcd00]'
                }])
            }
        })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <Header
                displayMonth={displayMonth}
                displayYear={displayYear}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick} />
            <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="w-16 border p-2 text-center bg-white-200 font-bold"></th>
                        {weekDates.map((date, index) => (
                            <th
                                key={date.toISOString()}
                                className="p-2 text-center bg-white-200 font-bold border min-w-200"
                            >
                                <div
                                    key={index}
                                    className={`text-xs ${isTodayDate(todayDate, date)
                                        ? "text-blue-600"
                                        : "text-gray-400"
                                        } p-5`}
                                >
                                    {daysOfWeek[date.getDay()].toUpperCase()}
                                </div>
                                <div
                                    className={`w-5 h-5 flex rounded-full font-normal text-3xl mx-auto p-6 justify-center items-center ${isTodayDate(todayDate, date)
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {date.getDate()}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <tr key={hour}>
                            <td className="p-2 text-center bg-white-200 border text-gray-400 text-sm">
                                {hour.toString().padStart(2, "0")}:00
                            </td>
                            {weekDates.map((date) => {
                                return (
                                    <td
                                        key={`${date.toISOString()}-${hour}`}
                                        className="p-1 text-center border"
                                    >
                                        {events.map((event: EventInterface, innerIndex: number) =>

                                            event.date === date.toISOString().slice(0, 10) &&
                                                event.time >= hour.toString().padStart(2, "0") + ":00" &&
                                                event.time <
                                                (hour + 1).toString().padStart(2, "0") + ":00" ? (
                                                <>
                                                    <div
                                                        className={`text-xs font-semibold text-white-600 ${todayDate <= date
                                                            ? event.color
                                                            : "bg-gray-200"
                                                            } rounded-lg px-2 py-1 `}
                                                        style={{ marginBottom: "2px" }}
                                                    >
                                                        {event.title} - {event.time}
                                                    </div>
                                                </>
                                            ) : (
                                                <AddEventModal
                                                    key={innerIndex}
                                                    date={date}
                                                    hour={hour}
                                                    handleCellClick={handleCellClick}
                                                    innerIndex={innerIndex}
                                                    eventTitle={eventTitle}
                                                    setEventTitle={setEventTitle}
                                                    selectedDate={selectedDate}
                                                    selectedTime={selectedTime}
                                                    handleSaveEvent={handleSaveEvent} />
                                            )
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    {showModal && (<AddEventModal></AddEventModal>)}
                </tbody>
            </table>
            </div>
        </div>
    )
};

export default EventCalendar;
