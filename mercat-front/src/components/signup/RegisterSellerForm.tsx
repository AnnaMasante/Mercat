import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { useAxios } from '../../utils/hooks/useAxios';
import { useForm } from '../../utils/hooks/useForm';
import { SellerAccount } from '../../utils/types/Seller';
import { validateEmail } from '../../utils/validationFunctions';
import InputForm from '../form/InputForm';

const RegisterSellerForm: FC = () => {
  const axios = useAxios();
  const history = useHistory();
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const initialState = {
    firstname: '',
    lastname: '',
    store: '',
    address: '',
    zipcode: '',
    city: '',
    description: '',
    mail: '',
    password: '',
  };

  const signUpSeller = () => {
    const newSeller: SellerAccount = {
      firstname: values.firstname,
      lastname: values.lastname,
      store: values.store,
      address: values.address,
      zipcode: values.zipcode,
      city: values.city,
      description: values.description,
      mail: values.mail,
      password: values.password,
    };
    axios
      .post('/sellers', newSeller)
      .then(() => history.push('/connexion'))
      .catch((err: AxiosError) => {
        if (err.response?.status === 400) {
          if (err.response.data.mail) {
            setSignUpError(
              'Cette adresse email est déjà utilisée veuillez en choisir une autre.',
            );
          } else if (err.response.data.store) {
            setSignUpError(
              'Ce nom de magasin existe déjà veuillez en choisir un autre.',
            );
          }
        } else {
          setSignUpError(
            'Erreur inattendue, veuillez réessayer plus tard ou contacter un administrateur.',
          );
        }
      });
  };

  const validateForm = (
    values: Record<string, any>,
  ): Record<string, string> => {
    let errors: Record<string, string> = {};
    if (values.firstname.trim().length < 2) {
      errors.firstname = 'Votre prénom doit au moins contenir 2 caractères';
    }
    if (values.lastname.trim().length < 2) {
      errors.lastname = 'Votre nom doit au moins contenir 2 caractères';
    }
    if (values.store.trim().length < 2) {
      errors.store =
        'Le nom de votre magasin doit au moins contenir 2 caractères';
    }
    if (values.address.trim().length < 2) {
      errors.address = 'Votre adresse doit au moins contenir 2 caractères';
    }
    if (values.zipcode.trim().length !== 5) {
      errors.zipcode = 'Votre code postal doit contenir 5 caractères';
    }
    if (values.city.trim().length < 2) {
      errors.city = 'Votre ville doit au moins contenir 2 caractères';
    }
    if (values.description.length < 20) {
      errors.description =
        'La description de votre magasin doit contenir au moins 20 caractères';
    }
    if (!validateEmail(values.mail)) {
      errors.mail = "Votre adresse e-mail n'est pas valide";
    }
    if (values.password.trim().length < 6) {
      errors.password =
        'Votre mot de passe doit au moins contenir 6 caractères';
    }
    return errors;
  };

  const { onChange, onSubmit, errors, values } = useForm(
    signUpSeller,
    initialState,
    validateForm,
  );

  return (
    <form onSubmit={onSubmit}>
      {signUpError && (
        <div className="notification is-danger">
          <button
            className="delete"
            onClick={() => setSignUpError(null)}
          ></button>
          {signUpError}
        </div>
      )}
      <InputForm
        onChange={onChange}
        title="Prénom"
        value={values.firstname}
        name="firstname"
        error={errors.firstname}
      />
      <InputForm
        onChange={onChange}
        title="Nom"
        value={values.lastname}
        name="lastname"
        error={errors.lastname}
      />
      <InputForm
        onChange={onChange}
        title="Nom du magasin"
        value={values.store}
        name="store"
        error={errors.store}
      />
      <InputForm
        onChange={onChange}
        title="Adresse"
        value={values.address}
        name="address"
        error={errors.address}
      />
      <InputForm
        onChange={onChange}
        title="Code postal"
        value={values.zipcode}
        name="zipcode"
        error={errors.zipcode}
      />
      <InputForm
        onChange={onChange}
        title="Ville"
        value={values.city}
        name="city"
        error={errors.city}
      />
      <InputForm
        onChange={onChange}
        title="Description de votre magasin"
        value={values.description}
        name="description"
        error={errors.description}
      />
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">E-mail</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                name="mail"
                value={values.mail}
                type="email"
                placeholder="Email"
                onChange={onChange}
              />

              {errors.mail && <p className="help is-danger">{errors.mail}</p>}
              <span className="icon is-small is-left">
                <FiMail />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Mot de passe</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                name="password"
                value={values.password}
                type="password"
                placeholder="Password"
                onChange={onChange}
              />
              {errors.password && (
                <p className="help is-danger">{errors.password}</p>
              )}
              <span className="icon is-small is-left">
                <RiLockPasswordFill />
              </span>
            </p>
          </div>
        </div>
      </div>
      <button className="button is-info">Submit</button>
    </form>
  );
};

export default RegisterSellerForm;
