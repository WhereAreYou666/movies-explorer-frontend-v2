import React from "react";
import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <section className="movies__cards">
      <ul className="movies__card-list">
        {props.children}
      </ul>
    </section>
  )
}

export default MoviesCardList;