"use client";

import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";

const roles = [
    { value: "admin", label: "مدیر سیستم" },
    { value: "doctor", label: "دندانپزشک" },
    { value: "nurse", label: "کمک دندانپزشک" },
    { value: "receptionist", label: "منشی" },
    { value: "patient", label: "بیمار" }
];

const RegisterPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone_number: "",
        password: "",
        password2: "",
        role: roles[0].value,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (form.password !== form.password2) {
            setError("رمز عبور و تکرار آن مطابقت ندارند");
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.post("/api/users/register/", form);
            router.push("/auth/login?registered=true");
        } catch (err) {
            if (err.response?.data) {
                const errors = Object.values(err.response.data).flat();
                setError(errors.join(" - ") || "خطا در ثبت نام");
            } else {
                setError("خطا در ارتباط با سرور");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/")}
                    className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
                >
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    بازگشت به صفحه اصلی
                </button>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">ثبت نام در سیستم</h1>
                        <p className="text-gray-600 mt-2">لطفا اطلاعات خود را وارد کنید</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                نام کاربری
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                pattern="^[\w.@+-]+$"
                                minLength={1}
                                maxLength={150}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="نام کاربری خود را وارد کنید"
                            />
                        </div>

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
                                placeholder="ایمیل خود را وارد کنید"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                                شماره تلفن
                            </label>
                            <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                value={form.phone_number}
                                onChange={handleChange}
                                minLength={1}
                                maxLength={15}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="شماره تلفن خود را وارد کنید"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                رمز عبور
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                minLength={8}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="رمز عبور (حداقل 8 کاراکتر)"
                            />
                        </div>

                        <div>
                            <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
                                تکرار رمز عبور
                            </label>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={form.password2}
                                onChange={handleChange}
                                minLength={8}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="تکرار رمز عبور"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                نقش کاربری
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                {roles.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        در حال ثبت نام...
                                    </span>
                                ) : 'ثبت نام'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            قبلا ثبت نام کرده‌اید؟ {' '}
                            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                                وارد شوید
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
