"use client";

import React, { useState } from "react";

// 📌 توکن جدید می‌گیریم اگر access منقضی شده بود
async function refreshAccessToken() {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return null;

    const res = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem("accessToken", data.access);
        return data.access;
    } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
    }
}

const AddAppointmentPage = () => {
    const [form, setForm] = useState({
        patient: "",
        doctor: "",
        date: "",
        time: "",
        status: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        let token = localStorage.getItem("accessToken");

        const sendRequest = async (jwt) => {
            return await fetch("http://localhost:8000/api/appointments/appointments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(form),
            });
        };

        try {
            let res = await sendRequest(token);

            // اگر توکن منقضی بود، با refresh توکن جدید بگیر
            if (res.status === 401) {
                token = await refreshAccessToken();
                if (token) {
                    res = await sendRequest(token);
                } else {
                    throw new Error("Session expired. Please log in again.");
                }
            }

            if (!res.ok) {
                const errData = await res.json();
                setMessage("❌ " + JSON.stringify(errData));
            } else {
                const data = await res.json();
                setMessage("✅ Appointment added successfully!");
                setForm({
                    patient: "",
                    doctor: "",
                    date: "",
                    time: "",
                    status: "",
                    description: "",
                });
            }
        } catch (err) {
            setMessage("❌ " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg space-y-4 border border-black dark:border-white p-6 rounded-xl"
            >
                <h2 className="text-2xl font-semibold text-center">Add Appointment</h2>

                {message && (
                    <div className="text-center text-sm text-red-500 dark:text-red-400">
                        {message}
                    </div>
                )}

                <input
                    type="number"
                    name="patient"
                    placeholder="Patient ID"
                    value={form.patient}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-black dark:border-white bg-transparent rounded"
                />

                <input
                    type="number"
                    name="doctor"
                    placeholder="Doctor ID"
                    value={form.doctor}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-black dark:border-white bg-transparent rounded"
                />

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full p-2 border border-black dark:border-white bg-transparent rounded"
                />

                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full p-2 border border-black dark:border-white bg-transparent rounded"
                />

                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full p-2 border border-black dark:border-white bg-transparent rounded"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-black dark:border-white bg-transparent rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full border border-black dark:border-white py-2 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                    {loading ? "Submitting..." : "Add Appointment"}
                </button>
            </form>
        </div>
    );
};

export default AddAppointmentPage;
