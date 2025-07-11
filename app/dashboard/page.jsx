"use client";

import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [dentalRecords, setDentalRecords] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [loadingRecords, setLoadingRecords] = useState(true);
    const [error, setError] = useState(null);

    // Fetch upcoming appointments from API
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axiosInstance.get('/api/appointments/appointments/');
                console.log(1, response.data)
                setUpcomingAppointments(response.data.map(appointment => ({
                    id: appointment.id,
                    date: new Date(appointment.date).toLocaleDateString('fa-IR'),
                    time: appointment.time,
                    doctor: appointment.doctor_name || appointment.doctor || "تعریف نشده",
                    service: appointment.description || 'معاینه عمومی',
                    status: appointment.status
                })));
                setLoadingAppointments(false);
            } catch (err) {
                setError('خطا در دریافت نوبت‌ها');
                setLoadingAppointments(false);
                console.error('Error fetching appointments:', err);
            }
        };

        const fetchDentalRecords = async () => {
            try {
                const response = await axiosInstance.get('/api/medical-records/');
                setDentalRecords(response.data.map(record => ({
                    id: record.id,
                    date: new Date(record.date).toLocaleDateString('fa-IR'),
                    service: record.service_type,
                    doctor: record.doctor_name,
                    notes: record.notes
                })));
                setLoadingRecords(false);
            } catch (err) {
                setError('خطا در دریافت سوابق دندانپزشکی');
                setLoadingRecords(false);
                console.error('Error fetching dental records:', err);
            }
        };

        fetchAppointments();
        fetchDentalRecords();
    }, []);

    const handleLogout = async () => {
        const { success } = await logout();
        if (success) {
            router.push("/");
        }
    };

    if (!user) {
        return <div className="text-center py-8">لطفا وارد سیستم شوید</div>;
    }

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
                            href="/dashboard/appointments"
                            className="text-blue-600 text-sm hover:text-blue-800"
                        >
                            مشاهده همه
                        </Link>
                    </div>

                    {loadingAppointments ? (
                        <div className="text-center py-8 text-gray-500">در حال بارگذاری نوبت‌ها...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">{error}</div>
                    ) : upcomingAppointments.length > 0 ? (
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

                    {loadingRecords ? (
                        <div className="text-center py-8 text-gray-500">در حال بارگذاری سوابق...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">{error}</div>
                    ) : dentalRecords.length > 0 ? (
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
                        href="/dashboard/profile"
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
