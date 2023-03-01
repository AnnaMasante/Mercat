import { useState } from 'react';

export const useForm = (
  callback: any,
  initialState: Record<string, any>,
  validate: (v: Record<string, any>) => Record<string, string>,
) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({
    err: 'waiting for change',
  });

  const onChange = (event: any) => {
    if (event.target.type === 'checkbox') {
      setValues({ ...values, [event.target.name]: !values[event.target.name] });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const formErrors = validate(values);
    if (Object.keys(formErrors).length === 0) {
      callback();
      setValues(initialState);
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return { onChange, onSubmit, values, errors };
};
