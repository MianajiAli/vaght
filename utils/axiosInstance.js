// utils/axiosInstance.js
import axios from "axios";

const BASE_URL = "http://localhost:8000"; // آدرس بک‌اند

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 👉 اضافه کردن access token به همه‌ی درخواست‌ها
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 👉 اگر توکن منقضی شد، با refresh token یه جدید بگیر و ادامه بده
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const res = await axios.post(`${BASE_URL}/api/token/refresh/`, {
                        refresh: refreshToken,
                    });

                    const newAccess = res.data.access;
                    localStorage.setItem("accessToken", newAccess);

                    // ست کردن توکن جدید
                    originalRequest.headers.Authorization = `Bearer ${newAccess}`;

                    return axiosInstance(originalRequest); // دوباره ارسال کن
                } catch (err) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    // اگر خواستی redirect کن به login
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
