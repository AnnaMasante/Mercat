import axios, { AxiosInstance } from 'axios';
import React from 'react';

interface UserCredentialsData {
  access_token: string;
  refresh_token: string;
}

export const SELLER = 'SELLER';
export const CUSTOMER = 'CLIENT';

export type UserCredentials = UserCredentialsData | null;

export interface UserContextValue {
  credentials: UserCredentials;
  axios: AxiosInstance;
  setCredentials: (credentials: UserCredentials) => void;
  logout: () => void;
  loggedIn: boolean;
  user: { sub: string; role: string } | null;
}

export const UserContext = React.createContext<UserContextValue>({
  credentials: null,
  axios: axios.create(),
  loggedIn: false,
  logout: () => {},
  setCredentials: () => {},
  user: null,
});
