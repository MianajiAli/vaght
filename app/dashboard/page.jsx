"use client";

import React from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserDashboard = () => {
    const { user, logout } = useAuth();
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

    const handleLogout = async () => {
        const { success } = await logout();
        if (success) {
            router.push("/");
        }
    };




    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">داشبورد کاربری</h1>
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <span className="text-gray-700">
                            {user?.username || 'کاربر'}
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
                                سلام، {user?.username || 'کاربر'}!
                            </h2>
                            <p className="text-blue-600 mt-1">
                                به پنل کاربری کلینیک دندانپزشکی خوش آمدید
                            </p>
                            {user?.phone_number && (
                                <p className="text-sm text-blue-500 mt-1">
                                    شماره تماس: {user.phone_number}
                                </p>
                            )}
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
                                {/* ... existing appointment table code ... */}
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
                    {/* ... existing dental records code ... */}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* ... existing quick actions code ... */}
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
