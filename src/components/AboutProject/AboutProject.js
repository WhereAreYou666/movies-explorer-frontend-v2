import React from "react";
import './AboutProject.css';

function AboutProject(props) {
  return (
    <section className="about-project" id={props.id}>
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__overview">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__duration-columns">
        <div className="about-project__duration-column about-project__duration-column_type_backend">
          <p className="about-project__duration-week about-project__duration-week_theme_green">1 неделя</p>
          <p className="about-project__duration-text">Back-end</p>
        </div>
        <div className="about-project__duration-column about-project__duration-column_type_frontend">
          <p className="about-project__duration-week">4 недели</p>
          <p className="about-project__duration-text">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;