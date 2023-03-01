import { AxiosError } from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FC } from 'react';
import { BiCartAlt, FaStore } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import { UserContext } from '../contexts/user/types';
import { useAxios } from '../utils/hooks/useAxios';

enum Role {
  Customer = 0,
  Seller = 1,
}

const LoginPage: FC = () => {
  const [activeTab, setActiveTab] = useState<Role>(Role.Customer);
  const [sellerError, setSellerError] = useState<string | null>(null);
  const [customerError, setCustomerError] = useState<string | null>(null);
  const axios = useAxios();
  const history = useHistory();
  const { setCredentials } = useContext(UserContext);

  useEffect(() => {
    setSellerError(null);
    setCustomerError(null);
  }, [activeTab]);

  const loginClient = (mail: string, password: string) => {
    axios
      .post('/auth/client/login', { mail, password })
      .then((res) => {
        setCredentials(res.data);
        history.push('/');
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 404) {
          setCustomerError('Mauvais identifiants');
          return;
        }
        setCustomerError(
          "Erreur durant l'authentification, veuillez réessayer plus tard ou contacter un administrateur.",
        );
      });
  };

  const loginSeller = (mail: string, password: string) => {
    axios
      .post('/auth/seller/login', { mail, password })
      .then((res) => {
        setCredentials(res.data);
        history.push('/');
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 404) {
          setSellerError('Mauvais identifiants');
          return;
        }
        setSellerError(
          "Erreur durant l'authentification, veuillez réessayer plus tard ou contacter un administrateur.",
        );
      });
  };

  return (
    <div>
      <div className="tabs is-centered is-boxed">
        <ul>
          <li
            className={activeTab === Role.Customer ? 'is-active' : ''}
            onClick={() => setActiveTab(Role.Customer)}
            id="customer-form"
          >
            <a>
              <span className="icon is-small">
                <BiCartAlt />
              </span>
              <span>Client</span>
            </a>
          </li>
          <li
            className={activeTab === Role.Seller ? 'is-active' : ''}
            onClick={() => setActiveTab(Role.Seller)}
          >
            <a>
              <span className="icon is-small">
                <FaStore />
              </span>
              <span>Commerçant</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="container">
        {activeTab === Role.Customer && (
          <div id="tab-content">
            {customerError && (
              <div className="notification is-danger">
                <button
                  className="delete"
                  onClick={() => setCustomerError(null)}
                ></button>
                {customerError}
              </div>
            )}
            <LoginForm login={loginClient} />
          </div>
        )}
        {activeTab === Role.Seller && (
          <div id="tab-content">
            {sellerError && (
              <div className="notification is-danger">
                <button
                  className="delete"
                  onClick={() => setSellerError(null)}
                ></button>
                {sellerError}
              </div>
            )}
            <LoginForm login={loginSeller} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
