"use client";

import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const LoginPage = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axiosInstance.post("/api/token/", form);

            const { access, refresh } = res.data;

            // ✅ ذخیره توکن‌ها در localStorage
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);

            setMessage("✅ Login successful!");

            setForm({
                username: "",
                password: "",
            });

            // ✅ اگر خواستی بری به داشبورد:
            window.location.href = "/index";

        } catch (err) {
            if (err.response && err.response.data) {
                setMessage("❌ " + JSON.stringify(err.response.data));
            } else {
                setMessage("❌ Error submitting form: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors px-4">
            <form
                onSubmit={handleSubmit}
                className="border border-black dark:border-white p-8 rounded-xl w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center">Login</h2>

                {message && (
                    <div className="text-sm text-center text-red-500 dark:text-red-400">
                        {message}
                    </div>
                )}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-black dark:border-white bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-black dark:border-white bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full border border-black dark:border-white text-black dark:text-white py-2 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                    {loading ? "Submitting..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
