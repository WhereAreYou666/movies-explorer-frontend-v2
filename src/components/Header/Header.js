import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import Navigation from "../Navigation/Navigation";
import logo from '../../images/logo.svg';

function Header(props) {
  return (
    <header className={`header ${props.isOpen ? `header_theme_main` : ``}`}>
      <div className="header__content">
        <Link to="/" className="header__link">
          <img src={logo} alt="на главную страницу" className="logo" />
        </Link>
        {
          props.loggedIn
            ? <Navigation isOpen={props.isOpen} isPageMain={props.isPageMain} isPageMovie={props.isPageMovie} isPageSave={props.isPageSave} />
            : <nav className="header__auth-links">
              <Link to="/sign-up" className="header__register-link">Регистрация</Link>
              <Link to="/sign-in" className="header__login-link">Войти</Link>
            </nav>
        }
      </div>
    </header>
  )
}

export default Header;