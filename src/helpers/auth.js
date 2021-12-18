export const isAuthenticated = () => Boolean(getToken());

export const getToken = () => localStorage.getItem('token') ?? null;

export const setToken = (token) => localStorage.setItem('token', token);

export const logout = () => localStorage.removeItem('token');
