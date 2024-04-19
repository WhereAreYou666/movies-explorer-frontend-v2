import React from "react";
import Auth from "../Authorization/Auth";

function Login(props) {
  return (
    <Auth
      onSubmitAuth={props.onSubmit}
      isLogin={true}
      buttonText="Войти"
      text="Ещё не зарегистрированы?"
      linkText="Регистрация"
      title="Рады видеть!"
      link="/sign-up"
      nameRequired={false}
      isUnathorized={props.errUnathorized}
      isUnathorizedText="Неправильные почта или пароль"
      isBadRequestLogin={props.errBadRequestLogin}
      isBadRequestLoginText="Переданы некорректные данные при авторизации."
      isLoading={props.isLoading}
    />
  )
}

export default Login;