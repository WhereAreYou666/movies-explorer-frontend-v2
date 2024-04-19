import React from "react";
import './MoviesCard.css';
import { Link } from "react-router-dom";

function MoviesCard(props) {
  const [isSaveMovie, setIsSaveMovie] = React.useState(false);

  React.useEffect(() => {
    const movie = props.savedCards.find((card) => card.movieId === props.card.id);
    const saveMovie = props.savedCards.find((card) => card.movieId === props.card.movieId);
    if (movie || saveMovie) {
      setIsSaveMovie(true);
    } else {
      setIsSaveMovie(false)
    }
  }, [props.card.id, props.savedCards, props.card.movieId])

  function clickSaveButton() {
    if (isSaveMovie) {
      props.handleMovieDelete(props.card);
    } else {
      props.handleAddMovies({
        country: props.card.country,
        director: props.card.director,
        duration: props.card.duration,
        year: props.card.year,
        description: props.card.description,
        image: `https://api.nomoreparties.co/${props.card.image.url}`,
        trailerLink: props.card.trailerLink,
        nameRU: props.card.nameRU,
        nameEN: props.card.nameEN,
        thumbnail: `https://api.nomoreparties.co/${props.card.image.formats.thumbnail.url}`,
        movieId: props.card.id
      })
    }
  }

  return (
    <li className={`movies__card ${(props.index > props.visibleCards) ? 'movies__card_type_inactive' : ''}`} key={props.card.id || props.card.movieId}>
      <div className="movies__card-content">
        <h2 className="movies__card-title">{props.card.nameRU}</h2>
        <p className="movies__card-duration">{Math.floor(props.card.duration / 60)}ч {props.card.duration % 60}м</p>
      </div>
      <Link to={props.card.trailerLink} className="movies__card-link" target="_blank">
        <img src={props.link} alt="обложка фильма" className="movies__card-image" />
      </Link>

      <button className={
        `movies__card-button-save 
        ${isSaveMovie && props.movies ? 'movies__card-button-save_type_active'
          : ''}
        ${props.isSave ? 'movies__card-button-save_type_delete' : ''}`
      } onClick={clickSaveButton}>{
          isSaveMovie || props.isSave ? '' : 'Сохранить'
        }</button>
    </li>

  )
}

export default MoviesCard;