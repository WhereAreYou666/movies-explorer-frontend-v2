import React, { useCallback } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const regexName = /^[A-Za-zА-Яа-яёЁ]+(?:[-'\s][A-Za-zА-Яа-яёЁ]+)*$/;
  const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;

    setValues({ ...values, [name]: value });

    if (name === 'name' && !regexName.test(value)) {
      setErrors({ ...errors, [name]: 'Имя может содержать латиницу, кириллицу, дефис или пробел' });
      setIsValid(false);
    } else if (name === 'email' && !regexEmail.test(value)) {
      setErrors({ ...errors, [name]: 'Введите корректный адрес электронной почты' });
      setIsValid(false);
    } else {
      setErrors({ ...errors, [name]: input.validationMessage });
      setIsValid(input.closest('form').checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetForm, errors, isValid };
}