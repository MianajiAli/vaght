"use client";

import React from "react";
// import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserDashboard = () => {
    // const { user, logout } = useAuth();
    const router = useRouter();

    // Sample data - replace with real data from your API
    const upcomingAppointments = [
        {
            id: 1,
            date: "1402/05/20",
            time: "10:30",
            doctor: "دکتر احمدی",
            service: "معاینه دندان",
            status: "تایید شده",
        },
        {
            id: 2,
            date: "1402/05/25",
            time: "16:00",
            doctor: "دکتر محمدی",
            service: "جرمگیری",
            status: "در انتظار تایید",
        },
    ];

    const dentalRecords = [
        {
            id: 1,
            date: "1402/04/15",
            service: "پر کردن دندان",
            doctor: "دکتر احمدی",
            notes: "دندان شماره ۳",
        },
        {
            id: 2,
            date: "1402/03/20",
            service: "عصب کشی",
            doctor: "دکتر رضوی",
            notes: "دندان شماره ۵",
        },
    ];

    const handleLogout = () => {
        // logout();
        router.push("/");
    };

    // if (!user) {
    //     return <div className="text-center py-8">لطفا وارد سیستم شوید</div>;
    // }

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">داشبورد کاربری</h1>
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <span className="text-gray-700">
                            {/* {user.name || user.username} */}|
                            user name
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-800 text-sm"
                        >
                            خروج از سیستم
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Welcome Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-blue-800">
                                {/* سلام، {user.name || user.username}! */}
                                user name
                            </h2>
                            <p className="text-blue-600 mt-1">
                                به پنل کاربری کلینیک دندانپزشکی خوش آمدید
                            </p>
                        </div>
                        <Link
                            href="/appointments/new"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            رزرو نوبت جدید
                        </Link>
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            نوبت‌های آینده
                        </h2>
                        <Link
                            href="/appointments"
                            className="text-blue-600 text-sm hover:text-blue-800"
                        >
                            مشاهده همه
                        </Link>
                    </div>

                    {upcomingAppointments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            تاریخ
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            زمان
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            پزشک
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            خدمت
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            وضعیت
                                        </th>
                                        <th className="relative px-4 py-3">
                                            <span className="sr-only">عملیات</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {upcomingAppointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {appointment.date}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {appointment.time}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {appointment.doctor}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {appointment.service}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${appointment.status === "تایید شده"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {appointment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/appointments/${appointment.id}`}
                                                    className="text-blue-600 hover:text-blue-900 ml-2"
                                                >
                                                    جزییات
                                                </Link>
                                                <button className="text-red-600 hover:text-red-900">
                                                    لغو
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            نوبت آینده‌ای ندارید
                        </div>
                    )}
                </div>

                {/* Dental Records */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        سوابق دندانپزشکی
                    </h2>

                    {dentalRecords.length > 0 ? (
                        <div className="space-y-4">
                            {dentalRecords.map((record) => (
                                <div
                                    key={record.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-800">
                                                {record.service}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {record.date} - {record.doctor}
                                            </p>
                                            {record.notes && (
                                                <p className="text-sm text-gray-500 mt-2">
                                                    توضیحات: {record.notes}
                                                </p>
                                            )}
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            دریافت گزارش
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            سابقه دندانپزشکی ثبت نشده است
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/profile"
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
                    >
                        <div className="text-blue-600 text-2xl mb-2">👤</div>
                        <h3 className="font-medium text-gray-800">مشاهده پروفایل</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            اطلاعات شخصی و پزشکی
                        </p>
                    </Link>

                    <Link
                        href="/payments"
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
                    >
                        <div className="text-green-600 text-2xl mb-2">💳</div>
                        <h3 className="font-medium text-gray-800">پرداخت‌ها</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            صورت حساب‌ها و پرداخت‌ها
                        </p>
                    </Link>

                    <Link
                        href="/contact"
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
                    >
                        <div className="text-purple-600 text-2xl mb-2">📞</div>
                        <h3 className="font-medium text-gray-800">تماس با کلینیک</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            اطلاعات تماس و پشتیبانی
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
