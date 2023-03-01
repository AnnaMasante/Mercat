import { useState } from 'react';
import { FC } from 'react';
import { FiMail } from 'react-icons/fi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { useAxios } from '../../utils/hooks/useAxios';
import { useForm } from '../../utils/hooks/useForm';
import { validateEmail } from '../../utils/validationFunctions';
import InputForm from '../form/InputForm';

const RegisterCustomerForm: FC = () => {
  const axios = useAxios();
  const history = useHistory();
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const signUpClient = () => {
    const newClient = {
      firstname: values.firstname,
      mail: values.mail,
      password: values.password,
    };
    axios
      .post('/clients', newClient)
      .then(() => history.push('/connexion'))
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          if (err.response.data && err.response.data.mail) {
            setSignUpError(
              'Cette adresse email est déjà utilisée veuillez en choisir une autre.',
            );
          }
        } else {
          setSignUpError(
            'Erreur inattendue, veuillez réessayer plus tard ou contacter un administrateur.',
          );
        }
      });
  };

  const validateForm = (values: Record<string, any>) => {
    let errors: Record<string, string> = {};
    if (values.firstname.trim().length < 2) {
      errors.firstname = 'Votre prénom doit au moins contenir 2 caractères';
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
  const initialState: Record<string, any> = {
    firstname: '',
    mail: '',
    password: '',
    isAdmin: false,
  };
  const { onChange, onSubmit, errors, values } = useForm(
    signUpClient,
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
        name="firstname"
        value={values.firstname}
        error={errors.firstname}
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
      <label className="checkbox">
        <input type="checkbox" name="isAdmin" onChange={onChange} />
        Remember me
      </label>
      <button className="button is-info">Submit</button>
    </form>
  );
};

export default RegisterCustomerForm;
