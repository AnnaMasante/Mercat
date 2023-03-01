import PasswordInput from '../form/PasswordInput';
import { useForm } from '../../utils/hooks/useForm';
import { ChangePassword } from '../../utils/types/ChangePassword';
import { useAxios } from '../../utils/hooks/useAxios';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user/types';
import { AxiosError } from 'axios';

const PasswordModification = () => {
  const axios = useAxios();
  const { user } = useContext(UserContext);

  const submitPassword = async () => {
    const changePassword: ChangePassword = {
      oldPassword: values.password,
      newPassword: values.newPassword,
    };
    axios
      .patch(`clients/${user!.sub}/password`, changePassword)
      //maybe a validation msg
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 400) {
          errors.confirmationNewPassword = "Le mot de passe n'est pas valide";
        }
      });
  };

  const initialState: Record<string, string> = {
    password: '',
    newPassword: '',
    confirmationNewPassword: '',
  };

  const validateForm = (values: Record<string, any>) => {
    let formErrors: Record<string, string> = {};
    if (values.newPassword.trim().length < 6) {
      formErrors.newPassword =
        'Le nouveau mot de passe doit contenir au moins 6 caractères.';
    }
    if (values.newPassword !== values.confirmationNewPassword) {
      formErrors.confirmationNewPassword =
        'Les deux mots de passes sont différents.';
    }
    return formErrors;
  };

  const { onChange, onSubmit, errors, values } = useForm(
    submitPassword,
    initialState,
    validateForm,
  );
  return (
    <div className="box">
      <h4 className="title is-4">Gestion du mot de passe</h4>

      <PasswordInput
        title="Mot de passe actuel"
        value={values.password}
        name="password"
        onChange={onChange}
      ></PasswordInput>
      <PasswordInput
        title="Nouveau mot de passe"
        value={values.newPassword}
        name="newPassword"
        onChange={onChange}
      ></PasswordInput>
      <PasswordInput
        title="Confirmer votre nouveau mot de passe"
        value={values.confirmationNewPassword}
        name="confirmationNewPassword"
        onChange={onChange}
        error={errors.confirmationNewPassword}
      ></PasswordInput>

      <button className="button is-black" onClick={onSubmit}>
        Modifier le mot de passe
      </button>
    </div>
  );
};
export default PasswordModification;
