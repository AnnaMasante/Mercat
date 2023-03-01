import { FC, useState } from 'react';
import { Address } from '../../utils/types/Address';
import { BsPen, FaTimes } from 'react-icons/all';
import UpdateAddressModal from './UpdateAddressModal';

const AddressModule: FC<{
  address: Address;
  deleteAddress: (address: Address) => void;
  modifyAddress: (addressToUpdate: Address, addressUpdated: Address) => void;
}> = ({ address, deleteAddress, modifyAddress }) => {
  const [showModal, setShowModal] = useState(false);

  const onDelete = () => {
    deleteAddress(address);
  };

  return (
    <div className="box">
      <div className="columns">
        <div className="column">
          {address.firstname} &nbsp; {address.lastname}, {address.street},{' '}
          {address.zipcode} &nbsp; {address.city}, {address.country}
        </div>
        <div className="column">
          <button className="button is-info" onClick={() => setShowModal(true)}>
            <span className="icon">
              <BsPen />
            </span>
            <span>Modifier</span>
          </button>
        </div>
        <div className="column">
          <button className="button is-danger" onClick={onDelete}>
            <span className="icon">
              <FaTimes></FaTimes>
            </span>
            <span>Supprimer</span>
          </button>
        </div>
      </div>
      <UpdateAddressModal
        show={showModal}
        address={address}
        onHide={() => setShowModal(false)}
        modifyAddress={modifyAddress}
      />
    </div>
  );
};
export default AddressModule;
