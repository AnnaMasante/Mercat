import { FC } from 'react';

const TextAreaForm: FC<{
  value: string;
  title: string;
  name: string;
  onChange: (event: any) => void;
  placeholder: string;
  error?: string | null;
}> = ({ value, name, title, onChange, placeholder, error }) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{title}</label>
      </div>
      <div className="field-body">
        <div className="field is-normal">
          <textarea
            className="textarea"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          ></textarea>
          {error && <p className="help is-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default TextAreaForm;
