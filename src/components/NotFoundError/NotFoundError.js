import React from "react";
import './NotFoundError.css';
import { useNavigate } from "react-router-dom";

function NotFoundError() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <main className="not-found-error">
      <div className="not-found-error__content">
        <h1 className="not-found-error__title">404</h1>
        <p className="not-found-error__text">Страница не найдена</p>
      </div>
      <button onClick={goBack} className="not-found-error__button">Назад</button>
    </main>
  )
}

export default NotFoundError;