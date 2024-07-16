import './Auth.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useForm';

import logo from '../../images/logo.svg';

function Auth(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const [errReg, setErrReg] = React.useState(false);
  const [errLogin, setErrLogin] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (props.isLogin) {
      props.onSubmitAuth(values.password, values.email);
    } else {
      props.onSubmitRegister(values.password, values.email, values.name);
    }

    if (props.isBadRequest || props.isConflict) {
      setErrReg(true);
    } else {
      setErrReg(false);
    }

    if (props.isBadRequestLogin || props.isUnathorized) {
      setErrLogin(true);
    } else {
      setErrReg(true);
    }
  }

  const handleClickSubmit = React.useEffect(() => {
    if (props.isBadRequest || props.isConflict) {
      setErrReg(true);
    } else {
      setErrReg(false);
    }

    if (props.isBadRequestLogin || props.isUnathorized) {
      setErrLogin(true);
    } else {
      setErrLogin(false);
    }
  }, [props])

  function handleChangeInput(evt) {
    handleChange(evt);
    setErrLogin(false);
    setErrReg(false);
  }

  return (
    <main className="auth">
      <form
        className="auth__form"
        name="authForm"
        onSubmit={handleSubmit}
      >
        <Link to="/" className="auth__link-main">
          <img src={logo} alt="на главную страницу" className="logo logo_type_auth" />
        </Link>
        <h1 className="auth__title">{props.title}</h1>
        <div className="auth__form-content">
          <label htmlFor="auth-input-name" className={`auth__form-label ${props.isLogin ? 'auth__form-label_type_inactive' : ''}`}>Имя</label>
          <input
            type="text"
            name="name"
            className={`auth__form-input ${props.isLogin ? 'auth__form-input_type_inactive' : ''}`}
            id="auth-input-name"
            placeholder="Имя"
            minLength="2"
            maxLength="32"
            value={values.name || ""}
            onChange={handleChangeInput}
            required={props.nameRequired}
          />
          <span className={`auth__form-error ${props.isLogin ? 'auth__form-error_type_inactive' : ''}`} id="auth-input-name-error">
            {errors.name || ""}
          </span>
          <label htmlFor="auth-input-email" className="auth__form-label">E-mail</label>
          <input
            type="email"
            name="email"
            className="auth__form-input"
            id="auth-input-email"
            placeholder="E-mail"
            value={values.email || ""}
            onChange={handleChangeInput}
            required
          />
          <span className="auth__form-error" id="auth-input-email-error">
            {errors.email}
          </span>
          <label htmlFor="auth-input-password" className="auth__form-label">Пароль</label>
          <input
            type="password"
            name="password"
            className={`auth__form-input ${errors.password ? 'auth__form-input_type_error' : ''}`}
            id="auth-input-password"
            placeholder="Пароль"
            minLength="6"
            value={values.password || ""}
            onChange={handleChangeInput}
            required
          />
          <span className="auth__form-error" id="auth-input-password-error">
            {errors.password || ""}
          </span>
        </div>
        <div className="auth__content-button">
          <span className={`auth__error-text ${(props.isUnathorized || props.isBadRequest || props.isBadRequestLogin || props.isConflict) ? 'auth__error-text_type_active' : ''}`}>
            {(props.isUnathorized && props.isUnathorizedText) || (props.isConflict && props.isConflictText) || (props.isBadRequest && props.isBadRequestText) || (props.isBadRequestLogin && props.isBadRequestLoginText) || 'error'}
          </span>
          <button
            type="submit"
            className={`auth__submit-button ${!isValid || errLogin || errReg ? 'auth__submit-button_type_inactive' : ''}`}
            onClick={handleClickSubmit}
            disabled={!isValid || errLogin || errReg}
          >
            {props.isLoading ? 'Подождите' : props.buttonText}
          </button>
          <div className="auth__place-login">
            <h3 className="auth__title-login">{props.text}</h3>
            <Link to={props.link} className="auth__link-login">
              {props.linkText}
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Auth;