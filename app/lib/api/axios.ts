import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getStoredTokens, setStoredTokens, clearStoredTokens } from "../auth/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

console.log("axios baseURL:", api.defaults.baseURL);

// existing interceptor setup...
api.interceptors.request.use(async (config) => {
    const tokens = await getStoredTokens();
    // ... (existing code)
    return config;
}, (error) => {
    console.error("axios request error:", error);
    return Promise.reject(error);
});

api.interceptors.response.use((resp) => resp, (error: AxiosError) => {
    console.error("axios response error:", error?.response?.status, error?.response?.data ?? error.message);
    return Promise.reject(error);
});

export default api;