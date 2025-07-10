"use client";

import React, { useMemo, useState, useEffect } from "react";
import jalaali from "jalaali-js";

const AppointmentBooking = () => {
    // تنظیمات ساعت کاری
    const duration = 30;
    const workTimes = [
        { start: 9.5, end: 13 },
        { start: 16, end: 20 },
    ];

    // تبدیل تاریخ میلادی به شمسی رشته‌ای به فرمت yyyy/mm/dd
    const toJalaliString = (date) => {
        const { jy, jm, jd } = jalaali.toJalaali(date);
        return `${jy}/${jm.toString().padStart(2, "0")}/${jd
            .toString()
            .padStart(2, "0")}`;
    };

    // فرمت زمان 08:00
    const formatTime = (hour, minute) =>
        `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    // تولید اسلات‌های زمانی
    const generateTimeSlots = (ranges, duration) => {
        const result = [];

        for (const range of ranges) {
            let startTotalMinutes = range.start * 60;
            const endTotalMinutes = range.end * 60;

            while (startTotalMinutes + duration <= endTotalMinutes) {
                const startHour = Math.floor(startTotalMinutes / 60);
                const startMinute = startTotalMinutes % 60;
                const endSlotMinutes = startTotalMinutes + duration;
                const endHour = Math.floor(endSlotMinutes / 60);
                const endMinute = endSlotMinutes % 60;

                const slot = `${formatTime(startHour, startMinute)}-${formatTime(
                    endHour,
                    endMinute
                )}`;
                result.push(slot);

                startTotalMinutes += duration;
            }
        }

        return result;
    };

    // تولید آرایه‌ای از اشیاء {miladi: Date, jalali: string}
    const generateJalaliDates = (startDate, count) => {
        const dates = [];
        const baseDate = new Date(startDate);
        for (let i = 0; i < count; i++) {
            const date = new Date(baseDate);
            date.setDate(baseDate.getDate() + i);
            const jalali = toJalaliString(date);
            dates.push({ miladi: date, jalali });
        }
        return dates;
    };

    const times = useMemo(() => generateTimeSlots(workTimes, duration), []);

    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [animationClass, setAnimationClass] = useState("");
    const [animationDirection, setAnimationDirection] = useState("next");

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const daysPerPage = isMobile ? 2 : 7;
    const totalDays = 30;
    const totalPages = Math.ceil(totalDays / daysPerPage);
    const baseDate = new Date();

    const pagedDates = generateJalaliDates(
        new Date(
            baseDate.getFullYear(),
            baseDate.getMonth(),
            baseDate.getDate() + currentPage * daysPerPage
        ),
        daysPerPage
    );

    const changePage = (newPage, direction) => {
        if (animating) return;
        setAnimating(true);
        setAnimationDirection(direction);

        setAnimationClass(
            direction === "next" ? "slide-exit-right" : "slide-exit-left"
        );

        setTimeout(() => {
            setCurrentPage(newPage);

            setAnimationClass(
                direction === "next" ? "slide-enter-left" : "slide-enter-right"
            );

            setTimeout(() => {
                setAnimating(false);
                setAnimationClass("");
            }, 300);
        }, 300);
    };

    const goPrev = () => changePage(Math.max(currentPage - 1, 0), "prev");
    const goNext = () => changePage(Math.min(currentPage + 1, totalPages - 1), "next");

    return (
        <div className="rtl p-4 max-w-7xl mx-auto space-y-6" dir="rtl">
            <style>{`
                .rtl {
                    direction: rtl;
                    text-align: right;
                }
                .slide-exit-left {
                    animation: slideExitLeft 0.3s forwards;
                }
                .slide-enter-right {
                    animation: slideEnterRight 0.3s forwards;
                }
                .slide-exit-right {
                    animation: slideExitRight 0.3s forwards;
                }
                .slide-enter-left {
                    animation: slideEnterLeft 0.3s forwards;
                }
                @keyframes slideExitLeft {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(-100%); opacity: 0; }
                }
                @keyframes slideEnterRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideExitRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                @keyframes slideEnterLeft {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 9999px;
                }
            `}</style>

            {/* ساعات کاری */}
            <div className="font-semibold text-gray-800">
                ساعات کاری:
                {workTimes.map((range, index) => (
                    <span key={index} className="mr-3 inline-block text-sm text-gray-600">
                        {range.start}:00 تا {range.end}:00
                    </span>
                ))}
            </div>

            {/* نمایش تاریخ‌ها */}
            <div className={`flex gap-4 overflow-hidden ${animationClass}`}>
                {pagedDates.map((date) => (
                    <div
                        key={date.jalali}
                        className="border rounded-lg shadow-sm flex flex-col flex-shrink-0"
                        style={{
                            width: isMobile ? "45%" : `calc(100% / ${daysPerPage} - 1rem)`,
                        }}
                    >
                        <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg font-semibold text-base">
                            {date.jalali}
                        </div>

                        <div className="flex flex-col gap-2 p-3 overflow-y-auto scrollbar-thin max-h-[350px] min-h-[350px]">
                            {times.map((timeRange) => {
                                const startTime = timeRange.split("-")[0];
                                return (
                                    <button
                                        key={timeRange}
                                        type="button"
                                        onClick={() => {
                                            const bookingData = {
                                                jalaliDate: date.jalali,
                                                miladiDate: date.miladi.toISOString().slice(0, 10),
                                                time: startTime,
                                            };
                                            localStorage.setItem("booking", JSON.stringify(bookingData));
                                            window.location.href = "/index/booking";
                                        }}
                                        className="rounded-full border px-2 py-1 text-xs text-center transition-colors bg-gray-100 text-gray-700 hover:bg-blue-100 cursor-pointer"
                                    >
                                        {startTime}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* کنترل‌های صفحه بندی */}
            <div className="flex justify-center items-center gap-6 mt-6">
                <button
                    onClick={goPrev}
                    disabled={currentPage === 0 || animating}
                    className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                >
                    قبلی
                </button>

                <span className="text-gray-700 font-medium">
                    صفحه {currentPage + 1} از {totalPages}
                </span>

                <button
                    onClick={goNext}
                    disabled={currentPage === totalPages - 1 || animating}
                    className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                >
                    بعدی
                </button>
            </div>
        </div>
    );
};

export default AppointmentBooking;
