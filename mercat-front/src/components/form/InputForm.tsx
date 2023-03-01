import { FC } from 'react';

const InputForm: FC<{
  value: string;
  name: string;
  title: string;
  placeholder?: string;
  onChange: (event: any) => void;
  error?: string | null;
}> = ({ value, name, title, placeholder, onChange, error }) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{title}</label>
      </div>
      <div className="field-body">
        <div className="field is-medium">
          <input
            className="input"
            name={name}
            value={value}
            onChange={onChange}
            type="text"
            placeholder={placeholder}
          />
          {error && <p className="help is-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default InputForm;
