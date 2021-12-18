export const isAuthenticated = () => {
  return Boolean(getToken());
};

export const getToken = () => {
  const token = localStorage.getItem('token') ?? null;
  return token;
};

export const logout = () => {
  localStorage.removeItem('token');
};
