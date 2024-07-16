import React from "react";
import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__content">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__quantity">7 технологий</h3>
        <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
        <ul className="techs__types">
          <li>
            <p className="techs__name">HTML</p>
          </li>
          <li>
            <p className="techs__name">CSS</p>
          </li>
          <li>
            <p className="techs__name">JS</p>
          </li>
          <li>
            <p className="techs__name">React</p>
          </li>
          <li>
            <p className="techs__name">Git</p>
          </li>
          <li>
            <p className="techs__name">Express.js</p>
          </li>
          <li>
            <p className="techs__name">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;