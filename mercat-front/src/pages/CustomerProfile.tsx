import { FC } from 'react';
import { useGet } from '../utils/hooks/useGet';
import { Client } from '../utils/types/Client';
import Loading from '../components/Loading';
import PasswordModification from '../components/account/PasswordModification';
import EmailModification from '../components/account/EmailModification';
import Addresses from '../components/addresse/Addresses';

const CustomerProfile: FC = () => {
  const [client, isPending] = useGet<Client>('/clients/profile');

  return (
    <>
      {isPending && Loading}
      {client && (
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column">
            <h3 className="title is-3">Paramètres du compte</h3>

            {/*Adresses*/}
            <Addresses client={client}></Addresses>

            {/* Gérer mot de passe*/}
            <PasswordModification></PasswordModification>

            {/*Gérer le mail*/}
            <EmailModification></EmailModification>
          </div>
          <div className="column is-2"></div>
        </div>
      )}
    </>
  );
};
export default CustomerProfile;
