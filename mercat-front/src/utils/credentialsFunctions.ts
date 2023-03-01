import { UserCredentials } from '../contexts/user/types';

export function getPayloadOf(jwt: string) {
  return JSON.parse(atob(jwt.split('.')[1]));
}

export function isExpired(payload: any) {
  return payload.exp * 1000 <= new Date().getTime();
}

export function credentialsFromLocalStorage(): UserCredentials {
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');
  return access_token && refresh_token ? { access_token, refresh_token } : null;
}
