"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import jalaali from "jalaali-js";

const AppointmentBookingPage = () => {
    // State for booking process
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [patientInfo, setPatientInfo] = useState({
        name: "",
        phone: "",
        email: ""
    });

    // State for available data
    const [services, setServices] = useState([
        {
            "id": "serv_001",
            "name": "لمینت سرامیکی دندان",
            "description": "روکش سرامیکی دندان برای زیبایی و اصلاح طرح لبخند",
            "category": "زیبایی",
            "duration": 60, // in minutes
            "price": 5000000, // in Rials
            "doctors": ["doc_001", "doc_003"], // IDs of doctors who provide this service
            "image": "/images/services/laminate.jpg",
            "popular": true
        },
        {
            "id": "serv_002",
            "name": "ایمپلنت دندان",
            "description": "کاشت دندان دائمی با استفاده از ایمپلنت های تیتانیومی",
            "category": "جراحی",
            "duration": 90,
            "price": 15000000,
            "doctors": ["doc_002", "doc_004"],
            "image": "/images/services/implant.jpg",
            "popular": true
        },
        {
            "id": "serv_003",
            "name": "جرمگیری حرفه ای",
            "description": "پاکسازی کامل دندان ها از جرم و رسوبات",
            "category": "پیشگیری",
            "duration": 30,
            "price": 800000,
            "doctors": ["doc_001", "doc_002", "doc_003"],
            "image": "/images/services/cleaning.jpg"
        }
    ]);
    const [doctors, setDoctors] = useState([{
        "id": "doc_001",
        "name": "دکتر مریم محمدی",
        "services": ["serv_001", "serv_003"],
        "specialty": "متخصص زیبایی دندان",
        "bio": "Optional biography text",
        "image": "/images/doctors/dr-mohammadi.jpg",
        "workHours": [
            {
                "day": "saturday",
                "start": 9.5,
                "end": 13
            },
            {
                "day": "sunday",
                "start": 16,
                "end": 20
            }
        ]
    }]);
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [bookedAppointments, setBookedAppointments] = useState([]);

    // UI state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [appointmentsRes] = await Promise.all([
                    axiosInstance.get("/api/appointments/appointments/")
                ]);

                setBookedAppointments(appointmentsRes.data);
                setLoading(false);
            } catch (err) {
                setError("خطا در دریافت اطلاعات از سرور");
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Convert to Jalali date
    const toJalaliString = (date) => {
        const { jy, jm, jd } = jalaali.toJalaali(date);
        return `${jy}/${jm.toString().padStart(2, "0")}/${jd.toString().padStart(2, "0")}`;
    };

    // Format date to YYYY-MM-DD for API
    const formatDateForAPI = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Generate available dates (next 14 days)
    useEffect(() => {
        if (selectedDoctor) {
            const dates = [];
            const today = new Date();

            for (let i = 0; i < 14; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);

                // Skip Fridays (or other non-working days)
                if (date.getDay() !== 5) {
                    dates.push({
                        miladi: date,
                        jalali: toJalaliString(date),
                        apiFormat: formatDateForAPI(date)
                    });
                }
            }

            setAvailableDates(dates);
        }
    }, [selectedDoctor]);

    // Generate available time slots
    const generateTimeSlots = () => {
        if (!selectedDate) return [];

        const workHours = selectedDoctor?.workHours || [
            { start: 9.5, end: 13 },  // 9:30 AM - 1:00 PM
            { start: 16, end: 20 }     // 4:00 PM - 8:00 PM
        ];

        const duration = selectedService?.duration || 30; // minutes
        const slots = [];

        workHours.forEach(range => {
            let startTotalMinutes = range.start * 60;
            const endTotalMinutes = range.end * 60;

            while (startTotalMinutes + duration <= endTotalMinutes) {
                const startHour = Math.floor(startTotalMinutes / 60);
                const startMinute = startTotalMinutes % 60;
                const timeStr = `${startHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`;

                // Check if slot is available
                const isBooked = bookedAppointments.some(app => {
                    const appDate = new Date(app.date).toISOString().split('T')[0];
                    const currentDate = selectedDate.apiFormat;
                    return appDate === currentDate && app.time.startsWith(timeStr);
                });

                if (!isBooked) {
                    slots.push(timeStr);
                }

                startTotalMinutes += duration;
            }
        });

        return slots;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const appointmentData = {
                title: `${selectedService.name} - ${selectedDoctor.name}`,
                patient_name: patientInfo.name,
                doctor_name: selectedDoctor.name,
                date: selectedDate.apiFormat, // Use the properly formatted date
                time: selectedTime,
                status: "pending",
                description: `Service: ${selectedService.name}`,
                patient: 1, // This should be replaced with actual patient ID from your system
                doctor: parseInt(selectedDoctor.id.replace('doc_', '')), // Convert doctor ID to number
                patient_phone: patientInfo.phone,
                patient_email: patientInfo.email
            };

            await axiosInstance.post("/api/appointments/appointments/", appointmentData);

            // Redirect to confirmation page
            window.location.href = `/booking/confirmation?ref=${Math.random().toString(36).substring(7)}`;
        } catch (err) {
            setError("خطا در ثبت نوبت. لطفا مجددا تلاش کنید.");
            console.error("Appointment submission error:", err.response?.data);
            setLoading(false);
        }
    };

    // Render current step
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <ServiceSelection
                        services={services}
                        selectedService={selectedService}
                        onSelect={setSelectedService}
                        onNext={() => setStep(2)}
                    />
                );
            case 2:
                return (
                    <DoctorSelection
                        doctors={doctors.filter(d => d.services.includes(selectedService.id))}
                        selectedDoctor={selectedDoctor}
                        onSelect={setSelectedDoctor}
                        onBack={() => setStep(1)}
                        onNext={() => setStep(3)}
                    />
                );
            case 3:
                return (
                    <DateTimeSelection
                        dates={availableDates}
                        times={generateTimeSlots()}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onSelectDate={setSelectedDate}
                        onSelectTime={setSelectedTime}
                        onBack={() => setStep(2)}
                        onNext={() => setStep(4)}
                    />
                );
            case 4:
                return (
                    <PatientInfoForm
                        data={patientInfo}
                        onChange={setPatientInfo}
                        onBack={() => setStep(3)}
                        onSubmit={handleSubmit}
                        loading={loading}
                        selectedService={selectedService}
                        selectedDoctor={selectedDoctor}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex justify-between mb-3">
                        {['انتخاب خدمت', 'انتخاب پزشک', 'زمان مراجعه', 'تکمیل اطلاعات'].map((label, index) => (
                            <div
                                key={index}
                                className={`text-sm ${step > index + 1 ? 'text-blue-600' : step === index + 1 ? 'font-bold text-gray-800' : 'text-gray-400'}`}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((step - 1) / 3) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading && step === 1 ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">در حال دریافت اطلاعات...</p>
                        </div>
                    ) : (
                        renderStep()
                    )}
                </div>
            </div>
        </div>
    );
};

// Sub-components for each step
const ServiceSelection = ({ services, selectedService, onSelect, onNext }) => (
    <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">لطفا خدمت مورد نظر را انتخاب کنید</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map(service => (
                <div
                    key={service.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedService?.id === service.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    onClick={() => onSelect(service)}
                >
                    <h3 className="font-medium text-gray-800">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <p className="text-sm text-blue-600 mt-2">{service.duration} دقیقه - {service.price.toLocaleString()} تومان</p>
                </div>
            ))}
        </div>
        <div className="mt-8 text-left">
            <button
                onClick={onNext}
                disabled={!selectedService}
                className={`px-6 py-2 rounded-lg ${selectedService ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
                مرحله بعد
            </button>
        </div>
    </div>
);

const DoctorSelection = ({ doctors, selectedDoctor, onSelect, onBack, onNext }) => (
    <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">لطفا پزشک مورد نظر را انتخاب کنید</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map(doctor => (
                <div
                    key={doctor.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedDoctor?.id === doctor.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    onClick={() => onSelect(doctor)}
                >
                    <div className="flex items-center">
                        <div className="bg-gray-200 w-12 h-12 rounded-full overflow-hidden ml-3">
                            {doctor.image && (
                                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800">{doctor.name}</h3>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{doctor.bio?.substring(0, 80)}...</p>
                </div>
            ))}
        </div>
        <div className="mt-8 flex justify-between">
            <button
                onClick={onBack}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
                بازگشت
            </button>
            <button
                onClick={onNext}
                disabled={!selectedDoctor}
                className={`px-6 py-2 rounded-lg ${selectedDoctor ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
                مرحله بعد
            </button>
        </div>
    </div>
);

const DateTimeSelection = ({ dates, times, selectedDate, selectedTime, onSelectDate, onSelectTime, onBack, onNext }) => (
    <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">لطفا زمان مراجعه را انتخاب کنید</h2>

        <div className="mb-8">
            <h3 className="font-medium text-gray-700 mb-3">تاریخ:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {dates.map(date => (
                    <button
                        key={date.jalali}
                        onClick={() => onSelectDate(date)}
                        className={`py-2 rounded-lg border ${selectedDate?.jalali === date.jalali ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                        {date.jalali}
                    </button>
                ))}
            </div>
        </div>

        {selectedDate && (
            <div className="mb-8">
                <h3 className="font-medium text-gray-700 mb-3">ساعت:</h3>
                {times.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {times.map(time => (
                            <button
                                key={time}
                                onClick={() => onSelectTime(time)}
                                className={`py-2 rounded-lg border ${selectedTime === time ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-blue-300'}`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">هیچ زمان خالی برای این تاریخ وجود ندارد</p>
                )}
            </div>
        )}

        <div className="mt-8 flex justify-between">
            <button
                onClick={onBack}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
                بازگشت
            </button>
            <button
                onClick={onNext}
                disabled={!selectedDate || !selectedTime}
                className={`px-6 py-2 rounded-lg ${selectedDate && selectedTime ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
                مرحله بعد
            </button>
        </div>
    </div>
);

const PatientInfoForm = ({
    data,
    onChange,
    onBack,
    onSubmit,
    loading,
    selectedService,
    selectedDoctor,
    selectedDate,
    selectedTime
}) => {
    const handleChange = (e) => {
        onChange({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">لطفا اطلاعات خود را وارد کنید</h2>

            <form onSubmit={onSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            نام و نام خانوادگی
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            شماره تلفن
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            ایمیل (اختیاری)
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="pt-4">
                        <h3 className="font-medium text-gray-700 mb-2">خلاصه نوبت:</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">خدمت:</span>
                                <span className="font-medium">{selectedService?.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">پزشک:</span>
                                <span className="font-medium">{selectedDoctor?.name}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600">زمان:</span>
                                <span className="font-medium">
                                    {selectedDate?.jalali} - {selectedTime}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-between">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        بازگشت
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !data.name || !data.phone}
                        className={`px-6 py-2 rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white disabled:bg-gray-300 disabled:cursor-not-allowed`}
                    >
                        {loading ? 'در حال ثبت...' : 'تایید و ثبت نوبت'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentBookingPage;
