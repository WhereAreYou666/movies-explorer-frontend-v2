import React from "react";
import './Navigation.css';
import { Link } from "react-router-dom";

function Navigation(props) {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  const closeMenu = React.useCallback(() => {
    setIsOpenMenu(false);
  }, []);

  function openMenu() {
    setIsOpenMenu(true);
  }

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget && isOpenMenu) {
      closeMenu();
    }
  }

  React.useEffect(() => {
    if (!isOpenMenu) return;
    const handleEscapeClose = (evt) => {
      if (evt.key === 'Escape') {
        closeMenu();
      }
    }
    document.addEventListener('keydown', handleEscapeClose);
    return () => {
      document.removeEventListener('keydown', handleEscapeClose)
    }
  }, [isOpenMenu, closeMenu]);

  return (
    <>
      <button onClick={openMenu} className="menu-button"></button>
      <nav className={`navigation ${isOpenMenu ? 'navigation_type_overlay' : ''}`} onMouseDown={handleOverlayClose}>
        <div className={`navigation__menu ${isOpenMenu ? 'navigation__menu_type_active' : ''}`}>
          <button onClick={closeMenu} className={`navigation__menu-close-button ${isOpenMenu ? 'navigation__menu-close-button_type_active' : ''} `}></button>
          <ul className={`navigation__menu-links ${isOpenMenu ? 'navigation__menu-links_type_active' : ''}`}>
            <li className="navigation__menu-link-row navigation__menu-link-row_type_burger-menu">
              <Link to="/" className={`navigation__menu-link ${props.isPageMain ? 'navigation__menu-link_type_active' : ''} navigation__menu-link_type_burger-menu`}>Главная</Link>
            </li>
            <li className="navigation__menu-link-row">
              <Link to="/movies" className={`navigation__menu-link ${props.isPageMovie ? 'navigation__menu-link_type_active' : ''} navigation__menu-link_type_burger-menu`}>Фильмы</Link>
            </li>
            <li className="navigation__menu-link-row">
              <Link to="/saved-movies" className={`navigation__menu-link ${props.isPageSave ? 'navigation__menu-link_type_active' : ''} navigation__menu-link_type_burger-menu`}>Сохранённые фильмы</Link>
            </li>
          </ul>
          <Link to="/profile" className={`navigation__profile-button ${isOpenMenu ? 'navigation__profile-button_type_active' : ''}`}>
            <p className="navigation__profile-link-text">Аккаунт</p>
            <span className={
              `navigation__profile-logo
          ${props.isOpen ? 'navigation__profile-logo_theme_mainpage' : ''} `
            }></span>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navigation;