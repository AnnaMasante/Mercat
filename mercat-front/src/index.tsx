import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  UserContext,
  UserContextValue,
  UserCredentials,
} from './contexts/user/types';
import { prepareAxiosInstance } from './utils/axios';
import {
  credentialsFromLocalStorage,
  getPayloadOf,
  isExpired,
} from './utils/credentialsFunctions';
import Loading from './components/Loading';

function Global() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [userContext, setUserContext] = useState<UserContextValue>({
    loggedIn: false,
    logout: () => {
      userContext.setCredentials(null);
    },
    setCredentials: (credentials: UserCredentials) => {
      if (credentials) {
        localStorage.setItem('access_token', credentials.access_token);
        localStorage.setItem('refresh_token', credentials.refresh_token);
        setUserContext((ctx) => {
          ctx.axios.defaults.headers[
            'Authorization'
          ] = `Bearer ${credentials.access_token}`;
          return {
            ...ctx,
            credentials: credentials,
            loggedIn: true,
            user: getPayloadOf(credentials.access_token),
          };
        });
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUserContext((ctx) => {
          delete ctx.axios.defaults.headers['Authorization'];
          return {
            ...ctx,
            credentials: null,
            loggedIn: false,
            user: null,
          };
        });
      }
    },
    credentials: null,
    axios: prepareAxiosInstance(),
    user: null,
  });

  //onComponentLoad
  useEffect(() => {
    if (!loaded) {
      const credentials = credentialsFromLocalStorage();
      if (!credentials) {
        setLoaded(true);
        return;
      }
      const accessTokenPayload = getPayloadOf(credentials.access_token);
      const refreshTokenPayload = getPayloadOf(credentials.refresh_token);
      if (isExpired(refreshTokenPayload)) {
        setLoaded(true);
        return;
      }

      if (isExpired(accessTokenPayload)) {
        userContext.axios
          .post('/auth/refresh', {
            refresh_token: credentials.refresh_token,
          })
          .then((res) => {
            if (res.status === 200) {
              userContext.setCredentials(res.data);
            }
          });
        setLoaded(true);
      } else {
        userContext.setCredentials(credentials);
        setLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (userContext.credentials) {
      const refreshTokenPayload = getPayloadOf(
        userContext.credentials.refresh_token,
      );

      // Refresh token expired, we logout
      if (isExpired(refreshTokenPayload)) {
        userContext.logout();
        return;
      }

      const accessTokenPayload = getPayloadOf(
        userContext.credentials.access_token,
      );
      const expTime = accessTokenPayload.exp;
      //10s before expiring
      const timeBeforeRefresh = expTime * 1000 - new Date().getTime() - 10000;

      // Planifying access_token refresh
      const id = setTimeout(() => {
        userContext.axios
          .post('/auth/refresh', {
            refresh_token: userContext.credentials!.refresh_token,
          })
          .then((res) => {
            if (res.status === 200) {
              userContext.setCredentials(res.data);
            }
          })
          .catch(() => {
            userContext.logout();
          });
      }, timeBeforeRefresh);
      return () => {
        clearTimeout(id);
      };
    }
  }, [userContext]);

  return (
    <UserContext.Provider value={userContext}>
      {!loaded ? (
        <Loading />
      ) : (
        <Router>
          <App />
        </Router>
      )}
    </UserContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Global />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
