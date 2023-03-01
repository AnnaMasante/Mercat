import { FC } from 'react';
import { FiMail } from 'react-icons/fi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useForm } from '../../utils/hooks/useForm';

const LoginForm: FC<{ login: (mail: string, password: string) => void }> = ({
  login,
}) => {
  const onSuccess = () => {
    login(values.mail, values.password);
  };

  const validateForm = (values: Record<string, any>) => {
    return {};
  };
  const initialState: Record<string, any> = {
    mail: '',
    password: '',
  };
  const { onChange, onSubmit, errors, values } = useForm(
    onSuccess,
    initialState,
    validateForm,
  );

  return (
    <form onSubmit={onSubmit}>
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

export default LoginForm;
