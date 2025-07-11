"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

const roles = [
    { value: "admin", label: "مدیر سیستم" },
    { value: "doctor", label: "دندانپزشک" },
    { value: "nurse", label: "کمک دندانپزشک" },
    { value: "receptionist", label: "منشی" },
    { value: "patient", label: "بیمار" }
];

const ProfileSettingsPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone_number: "",
        national_code: "",
        address: "",
        role: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    // Load user data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get("/api/users/profile/");
                const userData = response.data;
                setCurrentUser(userData);
                setForm({
                    username: userData.username || "",
                    email: userData.email || "",
                    phone_number: userData.phone_number || "",
                    national_code: userData.national_code || "",
                    address: userData.address || "",
                    role: userData.role || ""
                });
            } catch (err) {
                setError("خطا در دریافت اطلاعات کاربر");
                console.error("Failed to fetch user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Basic validation
        if (!form.phone_number || form.phone_number.length < 1) {
            setError("شماره تلفن الزامی است");
            return;
        }

        try {
            const response = await axiosInstance.patch("/api/users/profile/", form);
            setCurrentUser(response.data);
            setSuccess("پروفایل با موفقیت به‌روزرسانی شد");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            if (err.response?.data) {
                const errors = Object.values(err.response.data).flat();
                setError(errors.join(" - ") || "خطا در به‌روزرسانی پروفایل");
            } else {
                setError("خطا در ارتباط با سرور");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
                <div className="text-center">در حال بارگذاری اطلاعات کاربری...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">تنظیمات پروفایل</h1>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-6 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Username (readonly) */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    نام کاربری
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* Role (readonly for non-admins) */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                    نقش کاربری
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    disabled={currentUser?.role !== "admin"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                                >
                                    {roles.map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    ایمیل
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    maxLength={254}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                                    شماره تلفن *
                                </label>
                                <input
                                    type="tel"
                                    id="phone_number"
                                    name="phone_number"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                    required
                                    minLength={1}
                                    maxLength={15}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* National Code */}
                            <div>
                                <label htmlFor="national_code" className="block text-sm font-medium text-gray-700 mb-1">
                                    کد ملی
                                </label>
                                <input
                                    type="text"
                                    id="national_code"
                                    name="national_code"
                                    value={form.national_code}
                                    onChange={handleChange}
                                    maxLength={10}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    آدرس
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                بازگشت
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                ذخیره تغییرات
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettingsPage;
