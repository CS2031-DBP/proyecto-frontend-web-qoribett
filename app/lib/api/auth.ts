import api from './axios';

export type LoginRequest = { username?: string; email?: string; password: string };
export type RegisterRequest = {
  username?: string;
  email?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string; // ISO date
  dni?: string;
  address?: string;
};

export async function login(payload: LoginRequest) {
  const resp = await api.post('/auth/login', payload);
  return resp.data as { accessToken: string; refreshToken?: string; user?: any };
}

export async function register(payload: RegisterRequest) {
  const resp = await api.post('/auth/register', payload);
  return resp.data as any; // UserDTO
}

export async function refresh(refreshToken: string) {
  // Backend expects refresh token as query parameter
  const resp = await api.post(`/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`);
  return resp.data as { accessToken: string; refreshToken?: string };
}

export async function logout(refreshToken?: string) {
  if (!refreshToken) return api.post('/auth/logout');
  return api.post(`/auth/logout?token=${encodeURIComponent(refreshToken)}`);
}
