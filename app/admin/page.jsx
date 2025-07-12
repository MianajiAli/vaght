"use client";

import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalAppointments: 0,
        todayAppointments: 0,
        pendingAppointments: 0,
        totalPatients: 0
    });
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [recentPatients, setRecentPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock data for statistics
    const mockStats = {
        totalAppointments: 124,
        todayAppointments: 8,
        pendingAppointments: 12,
        totalPatients: 56
    };

    // Mock data for recent appointments
    const mockRecentAppointments = [
        {
            id: 1,
            date: "1402/05/15",
            time: "10:30",
            patient: "علی محمدی",
            service: "جرمگیری",
            status: "confirmed"
        },
        {
            id: 2,
            date: "1402/05/15",
            time: "11:00",
            patient: "فاطمه زاهدی",
            service: "عصب کشی",
            status: "pending"
        },
        {
            id: 3,
            date: "1402/05/16",
            time: "09:00",
            patient: "رضا نوروزی",
            service: "کشیدن دندان",
            status: "confirmed"
        },
        {
            id: 4,
            date: "1402/05/16",
            time: "14:30",
            patient: "نرگس احمدی",
            service: "لمینت",
            status: "cancelled"
        },
        {
            id: 5,
            date: "1402/05/17",
            time: "16:00",
            patient: "محسن کریمی",
            service: "معاینه عمومی",
            status: "pending"
        }
    ];

    // Mock data for recent patients
    const mockRecentPatients = [
        {
            id: 1,
            full_name: "علی محمدی",
            phone_number: "09123456789",
            last_visit: "2023-08-05",
            appointments_count: 3
        },
        {
            id: 2,
            full_name: "فاطمه زاهدی",
            phone_number: "09129876543",
            last_visit: "2023-08-06",
            appointments_count: 2
        },
        {
            id: 3,
            full_name: "رضا نوروزی",
            phone_number: "09351234567",
            last_visit: "2023-08-07",
            appointments_count: 1
        },
        {
            id: 4,
            full_name: "نرگس احمدی",
            phone_number: "09121112233",
            last_visit: "2023-08-07",
            appointments_count: 4
        },
        {
            id: 5,
            full_name: "محسن کریمی",
            phone_number: "09124445566",
            last_visit: null,
            appointments_count: 1
        }
    ];

    // Simulate API calls with mock data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500));

                // Set mock data
                setStats(mockStats);
                setRecentAppointments(mockRecentAppointments);
                setRecentPatients(mockRecentPatients);

                setLoading(false);
            } catch (err) {
                setError('خطا در دریافت اطلاعات داشبورد');
                setLoading(false);
                console.error('Error fetching dashboard data:', err);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = async () => {
        const { success } = await logout();
        if (success) {
            router.push("/");
        }
    };

    if (!user || user.role !== 'admin') {
        // window.location.href = `/dashboard`;
        return <div className="text-center py-8">
            <p>
                دسترسی غیرمجاز
            </p>
            <Link href="/">بازگشت</Link>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">پنل مدیریت کلینیک دندانپزشکی</h1>
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <span className="text-gray-700">
                            {user?.username || 'مدیر'}
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
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
                        <h3 className="text-gray-500 text-sm font-medium">کل نوبت‌ها</h3>
                        <p className="text-2xl font-bold text-blue-600 mt-2">
                            {loading ? '...' : stats.totalAppointments.toLocaleString('fa-IR')}
                        </p>
                        <div className="mt-4 flex items-center text-green-600 text-sm">
                            <span>تمام نوبت‌ها</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
                        <h3 className="text-gray-500 text-sm font-medium">نوبت‌های امروز</h3>
                        <p className="text-2xl font-bold text-green-600 mt-2">
                            {loading ? '...' : stats.todayAppointments.toLocaleString('fa-IR')}
                        </p>
                        <div className="mt-4 flex items-center text-green-600 text-sm">
                            <span>نوبت‌های امروز</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-yellow-200">
                        <h3 className="text-gray-500 text-sm font-medium">نوبت‌های در انتظار</h3>
                        <p className="text-2xl font-bold text-yellow-600 mt-2">
                            {loading ? '...' : stats.pendingAppointments.toLocaleString('fa-IR')}
                        </p>
                        <div className="mt-4 flex items-center text-yellow-600 text-sm">
                            <span>نیاز به تایید</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
                        <h3 className="text-gray-500 text-sm font-medium">بیماران</h3>
                        <p className="text-2xl font-bold text-purple-600 mt-2">
                            {loading ? '...' : stats.totalPatients.toLocaleString('fa-IR')}
                        </p>
                        <div className="mt-4 flex items-center text-purple-600 text-sm">
                            <span>بیماران ثبت شده</span>
                        </div>
                    </div>
                </div>

                {/* Recent Appointments */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            آخرین نوبت‌ها
                        </h2>
                        <Link
                            href="/admin/appointments"
                            className="text-blue-600 text-sm hover:text-blue-800"
                        >
                            مشاهده همه
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-8 text-gray-500">در حال بارگذاری نوبت‌ها...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">{error}</div>
                    ) : recentAppointments.length > 0 ? (
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
                                            بیمار
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
                                    {recentAppointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {appointment.date}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {appointment.time}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {appointment.patient}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {appointment.service}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${appointment.status === "confirmed"
                                                        ? "bg-green-100 text-green-800"
                                                        : appointment.status === "cancelled"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {appointment.status === "confirmed" ? "تایید شده" :
                                                        appointment.status === "cancelled" ? "لغو شده" :
                                                            "در انتظار"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/admin/appointments/${appointment.id}`}
                                                    className="text-blue-600 hover:text-blue-900 ml-2"
                                                >
                                                    جزییات
                                                </Link>
                                                {appointment.status === "pending" && (
                                                    <button className="text-green-600 hover:text-green-900 mr-2">
                                                        تایید
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            نوبتی یافت نشد
                        </div>
                    )}
                </div>

                {/* Recent Patients */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            بیماران اخیر
                        </h2>
                        <Link
                            href="/admin/patients"
                            className="text-blue-600 text-sm hover:text-blue-800"
                        >
                            مشاهده همه
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-8 text-gray-500">در حال بارگذاری بیماران...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">{error}</div>
                    ) : recentPatients.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            نام
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            شماره تماس
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            آخرین مراجعه
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            تعداد نوبت‌ها
                                        </th>
                                        <th className="relative px-4 py-3">
                                            <span className="sr-only">عملیات</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentPatients.map((patient) => (
                                        <tr key={patient.id}>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {patient.full_name}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {patient.phone_number}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {patient.last_visit ? new Date(patient.last_visit).toLocaleDateString('fa-IR') : 'ندارد'}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {patient.appointments_count}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/admin/patients/${patient.id}`}
                                                    className="text-blue-600 hover:text-blue-900 ml-2"
                                                >
                                                    جزییات
                                                </Link>
                                                <Link
                                                    href={`/admin/appointments/new?patient_id=${patient.id}`}
                                                    className="text-green-600 hover:text-green-900 mr-2"
                                                >
                                                    نوبت جدید
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            بیمار جدیدی یافت نشد
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/doctors"
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
                    >
                        <div className="text-blue-600 text-2xl mb-2">👨‍⚕️</div>
                        <h3 className="font-medium text-gray-800">مدیریت پزشکان</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            اضافه کردن و مدیریت پزشکان
                        </p>
                    </Link>

                    <Link
                        href="/admin/services"
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
                    >
                        <div className="text-green-600 text-2xl mb-2">🦷</div>
                        <h3 className="font-medium text-gray-800">خدمات کلینیک</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            مدیریت خدمات دندانپزشکی
                        </p>
                    </Link>

                    <Link
                        href="/admin/schedule"
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
                    >
                        <div className="text-purple-600 text-2xl mb-2">📅</div>
                        <h3 className="font-medium text-gray-800">برنامه‌ریزی</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            مدیریت برنامه زمانی پزشکان
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
