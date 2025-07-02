"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const Page = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ username: "", email: "", phone_number: "", role: "" });
    const [newUser, setNewUser] = useState({ username: "", email: "", phone_number: "", role: "admin", password: "123", password2: "123" });
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosInstance.get("/api/users/users/");
                setUsers(res.data);
                setFilteredUsers(res.data);
            } catch (err) {
                setError("❌ Error loading users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/api/users/users/${id}/`);
            setUsers((prev) => prev.filter((user) => user.id !== id));
            setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            alert("Failed to delete user.");
        }
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearch(keyword);
        const filtered = users.filter(
            (user) =>
                user.username.toLowerCase().includes(keyword) ||
                user.role.toLowerCase().includes(keyword)
        );
        setFilteredUsers(filtered);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setEditForm({
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role
        });
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        try {
            const res = await axiosInstance.put(`/api/users/profile/`, editForm);
            const updatedUser = res.data;
            const updatedUsers = users.map((user) => user.id === updatedUser.id ? updatedUser : user);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
            setEditingUser(null);
        } catch (err) {
            alert("Failed to update user.");
        }
    };

    const handleNewUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = async () => {
        try {
            const res = await axiosInstance.post("/api/users/register/", newUser);
            setUsers([...users, res.data]);
            setFilteredUsers([...filteredUsers, res.data]);
            setShowAddModal(false);
        } catch (err) {
            alert("Failed to add user.");
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 text-center">User List</h1>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by username or role..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full max-w-md px-4 py-2 border border-gray-400 dark:border-gray-700 rounded bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <button
                    onClick={() => setShowAddModal(true)}
                    className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Add User
                </button>
            </div>

            {loading ? (
                <div className="text-center text-gray-500">Loading users...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center text-gray-500">No users found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 dark:border-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="border p-2">Username</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Phone</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <td className="border p-2">{user.username}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.phone_number || "-"}</td>
                                    <td className="border p-2 capitalize">{user.role}</td>
                                    <td className="border p-2 text-center space-x-2">
                                        <button
                                            onClick={() => openEditModal(user)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-xl w-full max-w-md text-black dark:text-white">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>
                        <input
                            type="text"
                            name="username"
                            value={editForm.username}
                            onChange={handleEditChange}
                            className="w-full p-2 mb-2 border border-gray-400 dark:border-gray-600 rounded bg-transparent"
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleEditChange}
                            className="w-full p-2 mb-2 border border-gray-400 dark:border-gray-600 rounded bg-transparent"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="phone_number"
                            value={editForm.phone_number}
                            onChange={handleEditChange}
                            className="w-full p-2 mb-2 border border-gray-400 dark:border-gray-600 rounded bg-transparent"
                            placeholder="Phone Number"
                        />
                        <select
                            name="role"
                            value={editForm.role}
                            onChange={handleEditChange}
                            className="w-full p-2 mb-4 border border-gray-400 dark:border-gray-600 rounded bg-transparent"
                        >
                            <option value="admin">admin</option>
                            <option value="doctor">doctor</option>
                            <option value="nurse">nurse</option>
                            <option value="receptionist">receptionist</option>
                            <option value="patient">patient</option>
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-xl w-full max-w-md text-black dark:text-white">
                        <h2 className="text-xl font-bold mb-4">Add New User</h2>
                        <input
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleNewUserChange}
                            className="w-full p-2 mb-2 border border-gray-400 dark:border-gray-600 rounded bg-transparent"
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleNewUserChange}
                            className="w-full p-2 mb-2 border border-gray-400 dark:border-gray-600 rounded bg-transparent"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="phone_number"
                            value={newUser.phone_number}
                            onChange={handleNewUserChange}
                            className="w-full p-2 mb-2 border border-gray-400 dark:border-gray-600 rounded bg-transparent"
                            placeholder="Phone Number"
                        />
                        <select
                            name="role"
                            value={newUser.role}
                            onChange={handleNewUserChange}
                            className="w-full p-2 mb-2 border border-gray-400 dark:border-gray-600 rounded bg-transparent"
                        >
                            <option value="admin">admin</option>
                            <option value="doctor">doctor</option>
                            <option value="nurse">nurse</option>
                            <option value="receptionist">receptionist</option>
                            <option value="patient">patient</option>
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
