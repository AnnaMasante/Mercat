import { Client } from '../../utils/types/Client';
import { FC, useState } from 'react';
import AddAddressModal from './AddAddressModal';
import { useAxios } from '../../utils/hooks/useAxios';
import { Address } from '../../utils/types/Address';
import AddressModule from './AddressModule';

const Addresses: FC<{ client: Client }> = ({ client }) => {
  const axios = useAxios();
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState(client.addresses);

  const addAddress = (newAddress: Address) => {
    axios
      .patch(`clients/${client._id}`, { addresses: [...addresses, newAddress] })
      .then((res) => {
        if (res.data && res.data.addresses) {
          setAddresses(res.data.addresses);
        }
      });
  };

  const modifyAddress = (addressToUpdate: Address, updatedAddress: Address) => {
    setAddresses((prevState) => {
      return prevState.map((address) => {
        if (address._id === addressToUpdate._id) {
          return updatedAddress;
        }
        return address;
      });
    });
    axios
      .patch(`/clients/${client._id}`, {
        addresses: addresses.map((address) => {
          if (address._id === addressToUpdate._id) {
            return updatedAddress;
          }
          return address;
        }),
      })
      .catch(() =>
        setAddresses((prevState) => {
          return prevState.map((address) => {
            if (address._id === addressToUpdate._id) {
              return addressToUpdate;
            }
            return address;
          });
        }),
      );
  };

  const deleteAddress = (addressToRemove: Address) => {
    console.log(addressToRemove);
    setAddresses((prevState) => {
      return prevState.filter((address) => address._id !== addressToRemove._id);
    });
    axios
      .patch(`clients/${client._id}`, {
        addresses: addresses.filter(
          (address) => address._id !== addressToRemove._id,
        ),
      })
      .catch(() => setAddresses([...addresses, addressToRemove]));
  };
  return (
    <>
      <div className="box">
        <h4 className="title is-4">Quelques mots sur vous</h4>
        <div className="columns">Nom : {client.lastname}</div>
        <div className="columns">Prénom(s) : {client.firstname}</div>

        {/* Les adresses */}
        <div className="columns">
          Adresse(s) :
          {addresses &&
            addresses.map((address) => (
              <AddressModule
                address={address}
                modifyAddress={modifyAddress}
                deleteAddress={deleteAddress}
              />
            ))}
        </div>
        <button className="button is-black" onClick={() => setShowModal(true)}>
          Ajouter une adresse
        </button>
        <AddAddressModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onModify={addAddress}
        />
      </div>
    </>
  );
};
export default Addresses;
