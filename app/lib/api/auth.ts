import api from "./axios";

export type LoginRequest = { username?: string; email?: string; password: string };
export type RegisterRequest = {
    username?: string;
    email?: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    birthDate?: string;
    dni?: string;
    address?: string;
};

export async function login(payload: LoginRequest) {
    console.log("auth.login -> baseURL:", api.defaults.baseURL, "payload:", payload);
    const resp = await api.post("/auth/login", payload);
    console.log("auth.login resp:", resp.status, resp.data);
    return resp.data as { accessToken: string; refreshToken?: string; user?: any };
}

export async function register(payload: RegisterRequest) {
    console.log("auth.register -> baseURL:", api.defaults.baseURL, "payload:", payload);
    const resp = await api.post("/auth/register", payload);
    console.log("auth.register resp:", resp.status, resp.data);
    return resp.data as any; // UserDTO
}

export async function refresh(refreshToken: string) {
    console.log("auth.refresh -> baseURL:", api.defaults.baseURL, "refreshToken:", refreshToken);
    const resp = await api.post(`/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`);
    console.log("auth.refresh resp:", resp.status, resp.data);
    return resp.data as { accessToken: string; refreshToken?: string };
}

export async function logout(refreshToken?: string) {
    console.log("auth.logout -> baseURL:", api.defaults.baseURL, "refreshToken:", refreshToken);
    if (!refreshToken) {
        const r = await api.post("/auth/logout");
        console.log("auth.logout resp:", r.status, r.data);
        return r;
    }
    const r = await api.post(`/auth/logout?token=${encodeURIComponent(refreshToken)}`);
    console.log("auth.logout resp:", r.status, r.data);
    return r;
}