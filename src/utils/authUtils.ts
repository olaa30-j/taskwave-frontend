import { getCookie } from 'cookies-next';

export const getTokenFromCookies = () => {
  return getCookie("token") || null;
};

export const isAuthenticated = () => {
  return !!getTokenFromCookies();
};
