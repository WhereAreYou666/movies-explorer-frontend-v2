import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import Header from '../Header/Header';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [valueName, setValueName] = React.useState('');
  const [valueEmail, setValueEmail] = React.useState('');
  const [titleForm, setTitleForm] = React.useState('');
  const [isSubmitButton, setIsSubmitButton] = React.useState(false);
  const [isErrorSubmit, setIsErrorSubmit] = React.useState(false);
  const [isSuccessSubmit, setIsSucessSubmit] = React.useState(false);

  function signOut() {
    props.onLogoutProfile();
  }

  React.useEffect(() => {
    if (props.loggedIn) {
      setValueName(currentUser.name);
      setValueEmail(currentUser.email);
      setTitleForm(currentUser.name);
    }
  }, [currentUser, props.loggedIn]);

  function clickOnEditButton() {
    if (!isDisabled) {
      setIsDisabled(true);
      setIsSubmitButton(true);
      setIsSucessSubmit(false);
    }
    if (valueName === currentUser.name || valueEmail === currentUser.email) {
      setIsErrorSubmit(true);
    }
  }

  function clickOnSubmitButton() {
    if (!isDisabled) {
      setIsSucessSubmit(false);
    } else {
      setIsSucessSubmit(true);
    }
  }

  React.useEffect(() => {
    if (valueName === currentUser.name && valueEmail === currentUser.email) {
      setIsErrorSubmit(true);
    } else {
      setIsErrorSubmit(false);
    }
  }, [currentUser.name, currentUser.email, valueEmail, valueName])

  function handleChangeName(evt) {
    setValueName(evt.target.value);
    setIsErrorSubmit(false);
  }

  function handleChangeEmail(evt) {
    setValueEmail(evt.target.value);
    setIsErrorSubmit(false);
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();
    setTitleForm(valueName);

    props.onUpdateUser({
      name: valueName,
      email: valueEmail,
    })
  }

  React.useEffect(() => {
    if (props.errorProfile) {
      setIsSubmitButton(true);
      setIsDisabled(true);
      setValueName(currentUser.name);
      setValueEmail(currentUser.email);
      setTitleForm(currentUser.name);
      setIsErrorSubmit(true);
      setIsSucessSubmit(false);
    } else {
      setIsDisabled(false);
      setIsSubmitButton(false);
    }
  }, [currentUser, props.errorProfile])


  return (
    <main className="profile">
      <Header loggedIn={props.loggedIn} />
      <form className="profile__form" name="profileForm" onSubmit={handleSubmitForm}>
        <h1 className="profile__form-title">Привет, {titleForm}!</h1>
        <ul className="profile__form-rows">
          <li className="profile__form-row">
            <label htmlFor="profile-input-name" className="profile__form-label">Имя</label>
            <input
              type="text"
              name="profileInputName"
              className={`profile__form-input ${isDisabled ? 'profile__form-input_type_active' : ''}`}
              id="profile-input-name"
              value={valueName || ""}
              onChange={handleChangeName}
              minLength="2"
              maxLength="32"
              placeholder="Введите имя"
              disabled={!isDisabled}
            />
          </li>
          <li className="profile__form-row">
            <label htmlFor="profile-input-email" className="profile__form-label">E-mail</label>
            <input
              type="email"
              name="profileInputEmail"
              className={`profile__form-input ${isDisabled ? 'profile__form-input_type_active' : ''}`}
              id="profile-input-email"
              value={valueEmail || ""}
              onChange={handleChangeEmail}
              placeholder="Введите почту"
              disabled={!isDisabled}
            />
          </li>
        </ul>
        <ul className="profile__form-buttons">
          <span className={`profile__error-text ${isErrorSubmit && props.errorProfile ? 'profile__error-text_color_red' : ''} ${isSuccessSubmit ? 'profile__error-text_color_green' : ''}`}>{isErrorSubmit && props.errorProfile ? 'При обновлении профиля произошла ошибка.' : 'Сохранение прошло успешно!'}</span>
          <button
            type="button"
            className={`profile__edit-button ${isDisabled || props.errorProfile ? 'profile__edit-button_type_inactive' : ''}`}
            onClick={clickOnEditButton}>
            Редактировать
          </button>
          <button
            type="button"
            className={`profile__escape-button ${isDisabled ? 'profile__escape-button_type_inactive' : ''}`}
            onClick={signOut}>
            Выйти из аккаунта
          </button>
          <button
            type="submit"
            className={
              `profile__submit-button 
                ${!isSubmitButton ? 'profile__submit-button_type_active' : ''}
                ${isErrorSubmit ? 'profile__submit-button_type_error' : ''}`
            }
            onClick={clickOnSubmitButton}
            disabled={isErrorSubmit}
          >
            {props.isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </ul>
      </form>

    </main>
  )
}

export default Profile;