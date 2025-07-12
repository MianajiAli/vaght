"use client";

import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

// Helper function to translate status to Persian
const translateStatus = (status) => {
    switch (status) {
        case 'pending':
            return 'در انتظار';
        case 'confirmed':
            return 'تایید شده';
        case 'cancelled':
            return 'لغو شده';
        case 'done':
            return 'تکمیل شده';
        default:
            return status;
    }
};

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [dentalRecords, setDentalRecords] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [loadingRecords, setLoadingRecords] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch upcoming appointments from API
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axiosInstance.get('/api/appointments/appointments/');
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

    const openDeleteModal = (appointment) => {
        setSelectedAppointment(appointment);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedAppointment(null);
    };

    const openDetailsModal = async (appointmentId) => {
        try {
            const response = await axiosInstance.get(`/api/appointments/appointments/${appointmentId}/`);
            setAppointmentDetails(response.data);
            setIsDetailsModalOpen(true);
        } catch (err) {
            setError('خطا در دریافت جزئیات نوبت');
            console.error('Error fetching appointment details:', err);
        }
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setAppointmentDetails(null);
    };

    const handleDeleteAppointment = async () => {
        if (!selectedAppointment) return;

        setIsDeleting(true);
        try {
            // First get current appointment data
            const currentData = await axiosInstance.get(
                `/api/appointments/appointments/${selectedAppointment.id}/`
            );

            // Prepare updated data with status changed
            const updatedData = {
                ...currentData.data,
                status: "cancelled"
            };

            // Send PUT request with full updated data
            const response = await axiosInstance.delete(
                `/api/appointments/appointments/${selectedAppointment.id}/`);

            // Update local state
            setUpcomingAppointments(upcomingAppointments.map(app =>
                app.id === selectedAppointment.id
                    ? { ...app, status: "cancelled" }
                    : app
            ));

            closeDeleteModal();
        } catch (err) {
            setError('خطا در لغو نوبت');
            console.error('Error cancelling appointment:', err);
        } finally {
            setIsDeleting(false);
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
                            href="/dashboard/appointment/new"
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
                            href="/dashboard/appointment/all"
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
                                                    className={`px-2 py-1 rounded-full text-xs ${appointment.status === "confirmed"
                                                        ? "bg-green-100 text-green-800"
                                                        : appointment.status === "cancelled"
                                                            ? "bg-red-100 text-red-800"
                                                            : appointment.status === "done"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {translateStatus(appointment.status)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => openDetailsModal(appointment.id)}
                                                    disabled={['cancelled'].includes(appointment.status)}

                                                    className="text-blue-600 hover:text-blue-900 ml-2"
                                                >
                                                    جزییات
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(appointment)}
                                                    disabled={['cancelled', 'done'].includes(appointment.status)}
                                                    className={`text-red-600 hover:text-red-900 mr-2 ${['cancelled', 'done'].includes(appointment.status) ? "opacity-50 cursor-not-allowed" : ""
                                                        }`}
                                                >
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

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50" onClick={closeDeleteModal}>
                    <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            لغو نوبت
                        </h3>
                        <p className="text-gray-600 mb-6">
                            آیا مطمئن هستید که می‌خواهید نوبت {selectedAppointment?.service} در تاریخ {selectedAppointment?.date} را لغو کنید؟
                            {selectedAppointment?.status === "cancelled" && (
                                <span className="block text-red-500 mt-2">این نوبت قبلاً لغو شده است</span>
                            )}
                            {selectedAppointment?.status === "done" && (
                                <span className="block text-red-500 mt-2">نوبت‌های تکمیل شده قابل لغو نیستند</span>
                            )}
                        </p>
                        <div className="flex justify-end space-x-3 space-x-reverse">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                انصراف
                            </button>
                            <button
                                onClick={handleDeleteAppointment}
                                disabled={isDeleting || ['cancelled', 'done'].includes(selectedAppointment?.status)}
                                className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${isDeleting ? 'opacity-70' : ''
                                    } ${['cancelled', 'done'].includes(selectedAppointment?.status) ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isDeleting ? 'در حال لغو...' : 'لغو نوبت'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Appointment Details Modal */}
            {isDetailsModalOpen && appointmentDetails && (
                <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50" onClick={closeDetailsModal}>
                    <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                جزئیات نوبت
                            </h3>
                            <button
                                onClick={closeDetailsModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">خدمت</h4>
                                <p className="mt-1 text-sm text-gray-900">
                                    {appointmentDetails.description || 'معاینه عمومی'}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-500">تاریخ و زمان</h4>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(appointmentDetails.date).toLocaleDateString('fa-IR')} - {appointmentDetails.time}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-500">پزشک</h4>
                                <p className="mt-1 text-sm text-gray-900">
                                    {appointmentDetails.doctor_name || appointmentDetails.doctor || "تعریف نشده"}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-500">وضعیت</h4>
                                <p className="mt-1 text-sm text-gray-900">
                                    <span className={`px-2 py-1 rounded-full text-xs ${appointmentDetails.status === "confirmed"
                                        ? "bg-green-100 text-green-800"
                                        : appointmentDetails.status === "cancelled"
                                            ? "bg-red-100 text-red-800"
                                            : appointmentDetails.status === "done"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {translateStatus(appointmentDetails.status)}
                                    </span>
                                </p>
                            </div>

                            {appointmentDetails.notes && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">توضیحات</h4>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {appointmentDetails.notes}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeDetailsModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                بستن
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
