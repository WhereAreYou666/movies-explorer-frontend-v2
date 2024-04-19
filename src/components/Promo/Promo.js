import React from "react";
import { Link } from 'react-scroll';
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета <span className="promo__web">Веб-разработки.</span></h1>
        <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <Link activeClass="about-projects" to="about-projects" smooth="true" className="promo__button-know">Узнать больше</Link>
      </div>
    </section>
  )
}

export default Promo;