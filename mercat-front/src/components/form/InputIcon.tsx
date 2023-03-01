import { FC } from 'react';

const InputIcon: FC<{
  value: string;
  title: string;
  name: string;
  onChange: (event: any) => void;
  error?: string | null;

}> = ({ value, title, name, onChange, error, children }) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{title}</label>
      </div>
      <div className="field-body">
        <div className="field is-narrow">
          <p className="control is-expanded has-icons-left">
            <input
              className="input"
              name={name}
              value={value}
              type="text"
              onChange={onChange}
              placeholder="Le nom de votre produit"

            />
            <span className="icon is-small is-left">{children}</span>
          </p>
          {error && <p className="help is-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default InputIcon;
