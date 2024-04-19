import React from "react";
import { Link } from "react-router-dom";
import './AboutMe.css';
import imageMe from '../../images/avatar-me.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__overview">
          <h3 className="about-me__overview-title">Руслан</h3>
          <p className="about-me__overview-subtitle">Фронтенд-разработчик, 21 год</p>
          <p className="about-me__overview-paragraph">Я родился и живу в Белгороде, учусь на факультете инженерных и цифровых технологий в НИУ БелГУ. Я люблю слушать музыку, а ещё увлекаюсь программированием и компьютерными играми. С 2022 года занимался фриланс-заказами и решил начать глубже изучать фронтенд разработку.</p>
          <Link to="https://github.com/WhereareYou666" className="about-me__github-link" target="_blank">Github</Link>
        </div>
        <img src={imageMe} alt="Фотография" className="about-me__image" />
      </div>
    </section>
  )
}

export default AboutMe;