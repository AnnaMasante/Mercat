import { FC } from 'react';
import { useForm } from '../../utils/hooks/useForm';
import PasswordInput from '../form/PasswordInput';
import FormInput from '../form/FormInput';

const EmailModification: FC = () => {
  //const {user} = useContext(UserContext)
  const submitEmail = async () => {};

  const initialState: Record<string, string> = {
    mail: '',
    newMail: '',
    confirmationNewMail: '',
    password: '',
  };

  const validateForm = (values: Record<string, any>) => {
    let errors: Record<string, string> = {};
    //TODO : Ajouter validation que l'email est un email
    if (values.newMail !== values.confirmationNewMail) {
      errors.confirmationNewMail = 'Mails différents';
    }
    return errors;
  };

  const { onChange, onSubmit, errors, values } = useForm(
    submitEmail(),
    initialState,
    validateForm,
  );

  return (
    <>
      <div className="box">
        <h4 className="title is-4">Gestion de l'email</h4>
        <p>Email actuel : {values.mail}</p>
        <p></p>
        <h5 className="title is-5">Modifier son mot de passe</h5>
        <FormInput
          value={values.newMail}
          name="newMail"
          onChange={onChange}
          title="Votre nouveau email"
        ></FormInput>
        <FormInput
          value={values.confirmationNewMail}
          name="confirmationNewMail"
          onChange={onChange}
          title="Confirmer votre nouvel email"
        ></FormInput>
        <PasswordInput
          title="Votre mot de passe"
          value={values.password}
          name="password"
          onChange={onChange}
        ></PasswordInput>

        <button className="button is-black" onClick={onSubmit}>
          Modifier l'email
        </button>
      </div>
    </>
  );
};
export default EmailModification;
