"use client";
import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/appointments/appointments/";

export default function Table() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalError, setModalError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setAppointments(data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteAppointment = async (id) => {
        const confirm = window.confirm(
            "Are you sure you want to delete this appointment?"
        );
        if (!confirm) return;

        try {
            const res = await fetch(`${API_URL}${id}/`, { method: "DELETE" });
            if (res.ok) {
                setAppointments((prev) => prev.filter((a) => a.id !== id));
            } else {
                console.error("Failed to delete appointment.");
            }
        } catch (err) {
            console.error("Error deleting appointment:", err);
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "1":
                return "Pending";
            case "2":
                return "Confirmed";
            case "3":
                return "Cancelled";
            default:
                return "Unknown";
        }
    };

    const fetchAppointmentDetails = async (id) => {
        setModalLoading(true);
        setModalError(null);
        setIsModalOpen(true);
        try {
            const res = await fetch(`${API_URL}${id}/`);
            if (!res.ok) throw new Error("Failed to fetch details");
            const data = await res.json();
            setSelectedAppointment(data);
        } catch (err) {
            setModalError(err.message);
        } finally {
            setModalLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
        setModalError(null);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Appointments</h2>

            {loading ? (
                <p>Loading...</p>
            ) : appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Patient ID</th>
                                <th className="border px-4 py-2">Doctor ID</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Time</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Description</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((a) => (
                                <tr key={a.id}>
                                    <td className="border px-4 py-2">{a.id}</td>
                                    <td className="border px-4 py-2">{a.patient}</td>
                                    <td className="border px-4 py-2">{a.doctor}</td>
                                    <td className="border px-4 py-2">{a.date || "—"}</td>
                                    <td className="border px-4 py-2">{a.time || "—"}</td>
                                    <td className="border px-4 py-2">{getStatusText(a.status)}</td>
                                    <td className="border px-4 py-2">{a.description}</td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => fetchAppointmentDetails(a.id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => deleteAppointment(a.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded p-6 max-w-lg w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                            aria-label="Close modal"
                        >
                            &#x2715;
                        </button>

                        {modalLoading ? (
                            <p>Loading details...</p>
                        ) : modalError ? (
                            <p className="text-red-600">Error: {modalError}</p>
                        ) : selectedAppointment ? (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">
                                    Appointment Details (ID: {selectedAppointment.id})
                                </h3>
                                <p>
                                    <strong>Patient ID:</strong> {selectedAppointment.patient}
                                </p>
                                <p>
                                    <strong>Doctor ID:</strong> {selectedAppointment.doctor}
                                </p>
                                <p>
                                    <strong>Date:</strong> {selectedAppointment.date || "—"}
                                </p>
                                <p>
                                    <strong>Time:</strong> {selectedAppointment.time || "—"}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {getStatusText(selectedAppointment.status)}
                                </p>
                                <p>
                                    <strong>Description:</strong> {selectedAppointment.description}
                                </p>
                            </div>
                        ) : (
                            <p>No details available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
