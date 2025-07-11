"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
    const router = useRouter();
    // const { user, logout } = useAuth();

    // Sample stats data
    const stats = [
        { title: "نوبت‌های امروز", value: "۱۲", icon: "📅", link: "/appointments" },
        { title: "بیماران جدید", value: "۵", icon: "👨‍⚕️", link: "/patients" },
        { title: "درآمد امروز", value: "۸,۵۰۰,۰۰۰ تومان", icon: "💰", link: "/financial" },
        { title: "کارهای انجام شده", value: "۹", icon: "✅", link: "/treatments" },
    ];

    // Quick actions
    const quickActions = [
        { title: "ثبت نوبت جدید", icon: "➕", link: "/appointments/new" },
        { title: "ثبت بیمار جدید", icon: "👤", link: "/patients/new" },
        { title: "صورتحساب", icon: "🧾", link: "/billing" },
        { title: "گزارشات", icon: "📊", link: "/reports" },
    ];

    // Recent appointments
    const recentAppointments = [
        { id: 1, patient: "علی محمدی", time: "۱۰:۳۰", doctor: "دکتر احمدی", service: "معاینه اولیه" },
        { id: 2, patient: "فاطمه زاهدی", time: "۱۱:۱۵", doctor: "دکتر رضوی", service: "جرمگیری" },
        { id: 3, patient: "محسن کریمی", time: "۱۴:۰۰", doctor: "دکتر محمدی", service: "لمینت" },
    ];

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">داشبورد مدیریت کلینیک دندانپزشکی</h1>
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <span className="text-gray-700">user name</span>
                        <button
                            onClick={() => {
                                logout();
                                router.push("/login");
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                        >
                            خروج از سیستم
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <Link
                            key={index}
                            href={stat.link}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                </div>
                                <span className="text-3xl">{stat.icon}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">عملیات سریع</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <Link
                                key={index}
                                href={action.link}
                                className="border border-gray-200 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-200 transition-colors"
                            >
                                <span className="text-2xl block mb-2">{action.icon}</span>
                                <span className="text-sm text-gray-700">{action.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Appointments */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">نوبت‌های اخیر</h2>
                        <Link href="/appointments" className="text-blue-600 text-sm hover:text-blue-800">
                            مشاهده همه
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        بیمار
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        زمان
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        پزشک
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        خدمت
                                    </th>
                                    <th scope="col" className="relative px-4 py-3">
                                        <span className="sr-only">جزییات</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentAppointments.map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {appointment.patient}
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
                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/appointments/${appointment.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                جزییات
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
