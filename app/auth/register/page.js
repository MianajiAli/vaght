"use client";

import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const roles = ["admin", "doctor", "nurse", "receptionist", "patient"];

const RegisterPage = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone_number: "",
        password: "",
        password2: "",
        role: roles[0],
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (form.password !== form.password2) {
            setMessage("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const res = await axiosInstance.post("/api/users/register/", form);

            setMessage("✅ Registered successfully!");

            setForm({
                username: "",
                email: "",
                phone_number: "",
                password: "",
                password2: "",
                role: roles[0],
            });
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage("❌ " + JSON.stringify(err.response.data));
            } else {
                setMessage("❌ Error submitting form");
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
                <h2 className="text-2xl font-semibold text-center">Register</h2>

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
                    pattern="^[\w.@+-]+$"
                    minLength={1}
                    maxLength={150}
                    required
                    className="w-full p-2 border border-black dark:border-white bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    maxLength={254}
                    className="w-full p-2 border border-black dark:border-white bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded"
                />

                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={form.phone_number}
                    onChange={handleChange}
                    minLength={1}
                    maxLength={15}
                    required
                    className="w-full p-2 border border-black dark:border-white bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    minLength={1}
                    required
                    className="w-full p-2 border border-black dark:border-white bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded"
                />

                <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    value={form.password2}
                    onChange={handleChange}
                    minLength={1}
                    required
                    className="w-full p-2 border border-black dark:border-white bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded"
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-black dark:border-white bg-transparent text-black dark:text-white rounded"
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full border border-black dark:border-white text-black dark:text-white py-2 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                    {loading ? "Submitting..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
