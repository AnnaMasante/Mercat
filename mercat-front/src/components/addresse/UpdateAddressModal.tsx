import { Address } from '../../utils/types/Address';
import { FC } from 'react';
import { useForm } from '../../utils/hooks/useForm';
import FormInput from '../form/FormInput';

const UpdateAddressModal: FC<{
  show: boolean;
  onHide: () => void;
  address: Address;
  modifyAddress: (addressToUpdate: Address, updatedAddress: Address) => void;
}> = ({ address, modifyAddress, show, onHide }) => {
  const submitInfo = async () => {
    const newAddress: Address = {
      country: values.country,
      state: values.state,
      street: values.street,
      streetBis: values.streetBis,
      zipcode: values.zipcode,
      city: values.city,
      firstname: values.firstname,
      lastname: values.lastname,
    };
    modifyAddress(address, newAddress);
    onHide();
  };

  const initialState: Record<string, string> = {
    country: address.country,
    state: address.state ? address.state : '',
    street: address.street,
    streetBis: address.streetBis ? address.streetBis : '',
    zipcode: address.zipcode,
    city: address.city,
    firstname: address.firstname,
    lastname: address.lastname,
  };

  const validateForm = (values: Record<string, any>) => {
    let formErrors: Record<string, string> = {};
    if (values.country.trim().length === 0) {
      formErrors.country = 'Le pays ne peut pas être vide';
    }
    if (values.street.trim().length === 0) {
      formErrors.street = 'La rue ne peut être vide';
    }
    if (values.zipcode.trim().length === 0) {
      formErrors.zipcode = 'Le code postal ne peut être vide';
    }
    if (values.city.trim().length === 0) {
      formErrors.city = 'La ville ne peut être vide';
    }
    if (values.firstname.trim().length === 0) {
      formErrors.firstname = 'Le prénom ne peut être vide';
    }
    if (values.lastname.trim().length === 0) {
      formErrors.lastname = 'Le nom de famille ne peut être vide';
    }
    return formErrors;
  };

  const { onChange, onSubmit, errors, values } = useForm(
    submitInfo,
    initialState,
    validateForm,
  );

  return (
    <div className={`modal ${show && 'is-active'}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modifier l'adresse</p>
          <button
            className="delete"
            onClick={onHide}
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <FormInput
            name="firstname"
            value={values.firstname}
            title="Prénom(s)*"
            onChange={onChange}
            error={errors.firstname}
          ></FormInput>
          <FormInput
            name="lastname"
            value={values.lastname}
            title="Nom de famille*"
            onChange={onChange}
            error={errors.lastname}
          ></FormInput>
          <FormInput
            name="street"
            value={values.street}
            title="Numéro et rue*"
            onChange={onChange}
            error={errors.street}
          ></FormInput>
          <FormInput
            name="streetBis"
            value={values.streetBis}
            title="Complément de rue"
            onChange={onChange}
          ></FormInput>
          <FormInput
            name="city"
            value={values.city}
            title="Ville*"
            onChange={onChange}
            error={errors.city}
          ></FormInput>
          <FormInput
            name="zipcode"
            value={values.zipcode}
            title="Code postal*"
            onChange={onChange}
            error={errors.zipcode}
          ></FormInput>
          <FormInput
            name="country"
            value={values.country}
            title="Pays*"
            onChange={onChange}
            error={errors.country}
          ></FormInput>

          <FormInput
            name="state"
            value={values.state}
            title="Etat/Region"
            onChange={onChange}
          ></FormInput>

          <button onClick={onSubmit} className="button is-black">
            {"Modifier l'adresse"}
          </button>
        </section>
      </div>
    </div>
  );
};
export default UpdateAddressModal;
