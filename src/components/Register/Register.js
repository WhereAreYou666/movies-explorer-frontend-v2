import React from "react";
import Auth from "../Authorization/Auth";

function Register(props) {

  return (
    <Auth
      onSubmitRegister={props.onSubmit}
      isLogin={false}
      buttonText="Зарегистрироваться"
      text="Уже зарегистрированы?"
      linkText="Войти"
      title="Добро пожаловать!"
      link="/sign-in"
      nameRequired={true}
      isBadRequest={props.errBadRequest}
      isConflict={props.errConflict}
      isBadRequestText="Переданы некорректные данные при создании пользователя."
      isConflictText="Такой пользователь уже существует"
      isLoading={props.isLoading}
    />
  )
}

export default Register;