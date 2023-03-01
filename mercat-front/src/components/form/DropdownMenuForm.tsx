import { FC } from 'react';

const DropdownMenuForm: FC<{
  tab: string[];
  title: string;
  name: string;
  onChange: (event: any) => void;
  value: string;
  error?: string;
}> = ({ tab, title, name, onChange, value, error }) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{title}</label>
      </div>
      <div className="field-body">
        <div className="field is-narrow">
          <div className="control">
            <div className="select is-fullwidth">
              <select onChange={onChange} name={name} value={value}>
                <option value="">-</option>
                {tab.map((element) => (
                  <option value={element}>{element}</option>
                ))}
              </select>
            </div>
          </div>
          {error && <p className="help is-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default DropdownMenuForm;
