"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toJalaali, jalaaliMonthLength } from "jalaali-js";

const AppointmentsCalendarPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState(null);
    const [currentYear, setCurrentYear] = useState(1402);
    const [currentMonth, setCurrentMonth] = useState(1);

    // Fetch appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axiosInstance.get('/api/appointments/appointments/');
                setAppointments(response.data);
                setLoading(false);

                // Set current Jalali date
                const currentJalali = toJalali(currentDate);
                if (currentJalali) {
                    setCurrentYear(currentJalali.jy);
                    setCurrentMonth(currentJalali.jm);
                }
            } catch (err) {
                setError("Failed to fetch appointments");
                setLoading(false);
                console.error("Error fetching appointments:", err);
            }
        };

        fetchAppointments();
    }, []);

    // Convert to Jalali date
    const toJalali = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    };

    // Format Jalali date as string
    const formatJalali = (jy, jm, jd) => {
        return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
    };

    // Get current Jalali date
    const currentJalali = toJalali(currentDate);

    // Fetch appointment details
    const fetchAppointmentDetails = async (appointmentId) => {
        try {
            const response = await axiosInstance.get(`/api/appointments/appointments/${appointmentId}/`);
            setSelectedAppointmentDetails(response.data);
            console.log("Appointment details:", response.data); // Debug log
        } catch (err) {
            setError("Failed to fetch appointment details");
            console.error("Error fetching appointment details:", err);
        }
    };

    // Generate calendar days for current month
    const generateCalendarDays = () => {
        const daysInMonth = jalaaliMonthLength(currentYear, currentMonth);
        const days = [];

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    // Get appointments for a specific day
    const getAppointmentsForDay = (day) => {
        if (!day) return [];

        return appointments.filter(app => {
            const appDate = toJalali(app.date);
            return appDate &&
                appDate.jy === currentYear &&
                appDate.jm === currentMonth &&
                appDate.jd === day;
        });
    };

    // Change month
    const changeMonth = (increment) => {
        let newMonth = currentMonth + increment;
        let newYear = currentYear;

        if (newMonth > 12) {
            newMonth = 1;
            newYear++;
        } else if (newMonth < 1) {
            newMonth = 12;
            newYear--;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        setSelectedDate(null);
        setSelectedAppointmentDetails(null);
    };

    // Day names in Persian
    const dayNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>;
    }

    if (error) {
        return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-md mt-8">
            {error}
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8" dir="rtl">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Calendar Header */}
                <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-blue-700">
                        ‹
                    </button>
                    <h2 className="text-xl font-bold">
                        {currentYear} - {currentMonth} (تقویم شمسی)
                    </h2>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-blue-700">
                        ›
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="p-4">
                    {/* Day Names */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayNames.map((day, index) => (
                            <div key={index} className="text-center font-medium text-gray-600 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                        {generateCalendarDays().map((day, index) => {
                            const dayAppointments = getAppointmentsForDay(day);
                            const isToday = currentJalali &&
                                day === currentJalali.jd &&
                                currentMonth === currentJalali.jm &&
                                currentYear === currentJalali.jy;
                            const isSelected = selectedDate === day && !selectedAppointmentDetails;

                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSelectedDate(day);
                                        setSelectedAppointmentDetails(null);
                                    }}
                                    className={`min-h-24 p-1 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-blue-100 border-blue-500' :
                                        isToday ? 'bg-yellow-50 border-yellow-300' :
                                            'hover:bg-gray-50'
                                        }`}
                                >
                                    {day && (
                                        <>
                                            <div className="text-right font-medium mb-1">
                                                {day}
                                            </div>
                                            <div className="space-y-1 max-h-20 overflow-y-auto">
                                                {dayAppointments.map(app => (
                                                    <div
                                                        key={app.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            fetchAppointmentDetails(app.id);
                                                        }}
                                                        className="text-xs p-1 bg-blue-50 rounded text-blue-800 truncate cursor-pointer hover:bg-blue-100"
                                                    >
                                                        {app.time} - {app.patient_name}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Appointment Details */}
                {selectedAppointmentDetails && (
                    <div className="border-t p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">جزئیات نوبت</h3>
                            <button
                                onClick={() => setSelectedAppointmentDetails(null)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                            >
                                × بستن
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <h4 className="font-medium text-gray-700 mb-2">اطلاعات بیمار</h4>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span className="font-medium">نام کامل:</span>
                                            <span>{selectedAppointmentDetails.patient_name || '---'}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="font-medium">شماره تماس:</span>
                                            <span>{selectedAppointmentDetails.patient_phone || '---'}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <h4 className="font-medium text-gray-700 mb-2">اطلاعات نوبت</h4>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span className="font-medium">تاریخ:</span>
                                            <span>
                                                {formatJalali(
                                                    currentYear,
                                                    currentMonth,
                                                    selectedDate
                                                )}
                                            </span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="font-medium">زمان:</span>
                                            <span>{selectedAppointmentDetails.time || '---'}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="font-medium">وضعیت:</span>
                                            <span className={`${selectedAppointmentDetails.status === 'confirmed' ? 'text-green-600' :
                                                selectedAppointmentDetails.status === 'cancelled' ? 'text-red-600' :
                                                    'text-yellow-600'
                                                }`}>
                                                {selectedAppointmentDetails.status || '---'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">اطلاعات پزشک</h4>
                                <div className="space-y-2">
                                    <p className="flex justify-between">
                                        <span className="font-medium">نام پزشک:</span>
                                        <span>{selectedAppointmentDetails.doctor_name || '---'}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-medium">تخصص:</span>
                                        <span>{selectedAppointmentDetails.doctor_specialty || '---'}</span>
                                    </p>
                                </div>
                            </div>

                            {selectedAppointmentDetails.notes && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <h4 className="font-medium text-gray-700 mb-2">یادداشت‌ها</h4>
                                    <p className="whitespace-pre-line">{selectedAppointmentDetails.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Day View (when no appointment is selected) */}
                {selectedDate && !selectedAppointmentDetails && (
                    <div className="border-t p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">
                                نوبت‌های {currentYear}/{currentMonth}/{selectedDate}
                            </h3>
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                            >
                                × بستن
                            </button>
                        </div>
                        {getAppointmentsForDay(selectedDate).length > 0 ? (
                            <div className="space-y-2">
                                {getAppointmentsForDay(selectedDate).map(app => (
                                    <div
                                        key={app.id}
                                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                                        onClick={() => fetchAppointmentDetails(app.id)}
                                    >
                                        <div className="flex justify-between">
                                            <span className="font-medium">بیمار:</span>
                                            <span>{app.patient_name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">زمان:</span>
                                            <span>{app.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">هیچ نوبتی برای این روز ثبت نشده است</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentsCalendarPage;
