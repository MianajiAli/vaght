"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance"; // مسیر را به درستی تنظیم کن

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

    useEffect(() => {
        const booking = localStorage.getItem("booking");
        if (booking) {
            try {
                const { miladiDate, time } = JSON.parse(booking);
                setForm((f) => ({ ...f, date: miladiDate || "", time: time || "" }));
            } catch {
                // ignore parse error
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const res = await axiosInstance.post("/api/appointments/appointments/", form);
            setMessage("✅ Appointment added successfully!");
            setForm({
                patient: "",
                doctor: "",
                date: "",
                time: "",
                status: "",
                description: "",
            });
            localStorage.removeItem("booking");
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage("❌ " + JSON.stringify(err.response.data));
            } else {
                setMessage("❌ " + err.message);
            }
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
                    <div className="text-center text-sm text-red-500 dark:text-red-400">{message}</div>
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
                    readOnly
                    className="w-full p-2 border border-black dark:border-white bg-gray-100 dark:bg-gray-800 rounded cursor-not-allowed"
                />

                <input
                    type="time"
                    name="time"
                    value={form.time}
                    readOnly
                    className="w-full p-2 border border-black dark:border-white bg-gray-100 dark:bg-gray-800 rounded cursor-not-allowed"
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
