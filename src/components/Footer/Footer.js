import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__content">
        <p className="footer__year">© 2024</p>
        <ul className="footer__links">
          <li>
            <Link to="https://practicum.yandex.ru/" className="footer__link" target="_blank">Яндекс.Практикум</Link>
          </li>
          <li>
            <Link to="https://github.com/WhereareYou666" className="footer__link" target="_blank">Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;