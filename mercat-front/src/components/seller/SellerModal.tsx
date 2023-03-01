import React, { FC, useContext } from 'react';
import { UserContext } from '../../contexts/user/types';
import { Seller } from '../../utils/types/Seller';
import { useForm } from '../../utils/hooks/useForm';
import FormInput from '../form/FormInput';
import { useAxios } from '../../utils/hooks/useAxios';

const SellerModal: FC<{
  show: boolean;
  onHide: () => void;
  seller: Seller;
  setSeller: React.Dispatch<Seller>;
}> = ({ show, onHide, seller, setSeller }) => {
  const { user } = useContext(UserContext);
  const axios = useAxios();

  const submitModifications = async () => {
    const userChanged: Seller = {
      firstname: values.firstname,
      lastname: values.lastname,
      address: values.address,
      city: values.city,
      description: values.description,
      store: values.store,
      zipcode: values.zipcode,
      products: values.products,
      subscription: values.subscription,
    };
    console.log(userChanged);
    axios
      .patch(`sellers/${user!.sub}`, userChanged)
      .then((res) => setSeller(userChanged));
    onHide();
  };
  const initialState: Record<string, string> = {
    city: seller.city,
    zipcode: seller.zipcode,
    firstname: seller.firstname,
    lastname: seller.lastname,
    store: seller.store,
    description: seller.description,
    address: seller.address,
  };
  console.log(initialState);
  const validateForm = (values: Record<string, any>) => {
    let formErrors: Record<string, string> = {};
    if (values.city.trim().length === 0) {
      formErrors.city = 'La ville ne peut être vide.';
    }
    if (values.zipcode.trim().length === 0) {
      formErrors.zipcode = 'Le code postal ne peut être vide.';
    }
    if (values.store.trim().length === 0) {
      formErrors.store = 'Le nom du magasin ne peut être vide.';
    }
    if (values.description.trim().length === 0) {
      formErrors.description = 'La description ne peut être vide.';
    }
    if (values.address.trim().length === 0) {
      formErrors.address = "L'adresse ne peut être vide.";
    }
    if (values.firstname.trim().length === 0) {
      formErrors.firstname = 'Le prénom ne peut être vide.';
    }
    if (values.lastname.trim().length === 0) {
      formErrors.lastname = 'Le nom de famille ne peut être vide.';
    }
    return formErrors;
  };
  const { onChange, onSubmit, errors, values } = useForm(
    submitModifications,
    initialState,
    validateForm,
  );

  return (
    <div className={`modal ${show && 'is-active'}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modifier mes informations</p>
          <button
            className="delete"
            onClick={onHide}
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <FormInput
            name="lastname"
            value={values.lastname}
            title="Nom"
            onChange={onChange}
            error={errors.lastname}
          ></FormInput>
          <FormInput
            name="firstname"
            value={values.firstname}
            title="Prénom"
            onChange={onChange}
            error={errors.firstname}
          ></FormInput>
          <FormInput
            name="store"
            value={values.store}
            title="Magasin"
            onChange={onChange}
            error={errors.store}
          ></FormInput>
          <FormInput
            name="address"
            value={values.address}
            title="Adresse"
            onChange={onChange}
            error={errors.address}
          ></FormInput>
          <FormInput
            name="zipcode"
            value={values.zipcode}
            title="Code postal"
            onChange={onChange}
            error={errors.zipcode}
          ></FormInput>
          <FormInput
            name="city"
            value={values.city}
            title="Ville"
            onChange={onChange}
            error={errors.city}
          ></FormInput>
          <button onClick={onSubmit} className="button is-black">
            Enregistrer les modifications
          </button>
        </section>
      </div>
    </div>
  );
};
export default SellerModal;
