// hooks/useAuth.js
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

// User profile type definition for reference
/**
 * @typedef {Object} UserProfile
 * @property {number} id - User ID (read-only)
 * @property {string} username - Required. 150 chars or fewer. Letters, digits and @/./+/-/_ only.
 * @property {string} [email] - Email address (optional)
 * @property {string} phone_number - Required phone number
 * @property {string} [national_code] - National code (optional)
 * @property {string} [address] - Address (optional)
 * @property {string} role - User role from RoleEnum
 */

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(/** @type {UserProfile | null} */ null);
    const [loading, setLoading] = useState(true);

    // Check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axiosInstance.get('/api/users/profile/');
                setIsAuthenticated(true);
                setUser({
                    id: data.id,
                    username: data.username,
                    email: data.email || null,
                    phone_number: data.phone_number,
                    national_code: data.national_code || null,
                    address: data.address || null,
                    role: data.role
                });
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            // First login to get tokens
            const loginResponse = await axiosInstance.post('/api/auth/login/', credentials);

            // Store tokens
            localStorage.setItem('accessToken', loginResponse.data.access);
            localStorage.setItem('refreshToken', loginResponse.data.refresh);

            // Then fetch user profile
            const profileResponse = await axiosInstance.get('/api/users/profile/');

            // Update state
            setIsAuthenticated(true);
            setUser({
                id: profileResponse.data.id,
                username: profileResponse.data.username,
                email: profileResponse.data.email || null,
                phone_number: profileResponse.data.phone_number,
                national_code: profileResponse.data.national_code || null,
                address: profileResponse.data.address || null,
                role: profileResponse.data.role
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || { message: 'Login failed' }
            };
        }
    };

    const logout = async () => {
        try {
            // Optional: Call logout API if you have one
            // await axiosInstance.post('/api/auth/logout/');

            // Clear local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            // Reset state
            setIsAuthenticated(false);
            setUser(null);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || { message: 'Logout failed' }
            };
        }
    };

    // Optional: Add a method to refresh user data
    const refreshUser = async () => {
        try {
            const { data } = await axiosInstance.get('/api/users/profile/');
            setUser({
                id: data.id,
                username: data.username,
                email: data.email || null,
                phone_number: data.phone_number,
                national_code: data.national_code || null,
                address: data.address || null,
                role: data.role
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data };
        }
    };

    return {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        refreshUser // Optional: export the refresh method
    };
};

export default useAuth;
