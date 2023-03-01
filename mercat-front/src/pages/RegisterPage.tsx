import { useState } from 'react';
import { FC } from 'react';
import { BiCartAlt, FaStore } from 'react-icons/all';
import RegisterCustomerForm from '../components/signup/RegisterCustomerForm';
import RegisterSellerForm from '../components/signup/RegisterSellerForm';

enum Role {
  Customer = 0,
  Seller = 1,
}

const RegisterPage: FC = () => {
  const [activeTab, setActiveTab] = useState<Role>(Role.Customer);

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
            <RegisterCustomerForm />
          </div>
        )}
        {activeTab === Role.Seller && (
          <div>
            <RegisterSellerForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
