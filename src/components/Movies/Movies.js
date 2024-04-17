import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';
import Footer from '../Footer/Footer';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useResize } from '../../utils/useResize';

function Movies(props) {
  const [isButtonActive, setIsButtonActive] = React.useState(false);
  const [next, setNext] = React.useState(JSON.parse(localStorage.getItem('next')));
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [isTab, setIsTab] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [visibleCards, setVisibleCards] = React.useState(JSON.parse(localStorage.getItem('visible-cards')));
  const { isScreenLg, isScreenMd, isScreenSm } = useResize();
  const [numVisDesktop, setNumVisDesktop] = React.useState(JSON.parse(localStorage.getItem('visible-cards-desktop')));
  const [numVisTab, setNumVisTab] = React.useState(JSON.parse(localStorage.getItem('visible-cards-tab')));
  const [numVisMob, setNumVisMob] = React.useState(JSON.parse(localStorage.getItem('visible-cards-mobile')));

  const handleChangeScreenWidth = React.useEffect(() => {

    if (next === 0) {
      setNumVisDesktop(11);
      setNumVisTab(7);
      setNumVisMob(4);
      localStorage.setItem('visible-cards-desktop', JSON.stringify(numVisDesktop));
      localStorage.setItem('visible-cards-mobile', JSON.stringify(numVisMob));
      localStorage.setItem('visible-cards-tab', JSON.stringify(numVisTab));
    }

    if (isScreenLg && next !== null && visibleCards > 10) {
      setNumVisTab(numVisDesktop);
      setNumVisMob(numVisDesktop);
      localStorage.setItem('visible-cards-mobile', JSON.stringify(numVisMob));
      localStorage.setItem('visible-cards-tab', JSON.stringify(numVisTab));
    }

    if (isScreenMd && !isScreenSm && next !== null && visibleCards > 8) {
      setNumVisDesktop(numVisTab);
      setNumVisMob(numVisTab);
      localStorage.setItem('visible-cards-mobile', JSON.stringify(numVisMob));
      localStorage.setItem('visible-cards-desktop', JSON.stringify(numVisDesktop));
    }

    if (isScreenSm && next !== null && visibleCards > 5) {
      setNumVisTab(numVisMob);
      setNumVisDesktop(numVisMob);
      localStorage.setItem('visible-cards-desktop', JSON.stringify(numVisDesktop));
      localStorage.setItem('visible-cards-tab', JSON.stringify(numVisTab));
    }

    if (isScreenLg) {
      setVisibleCards(numVisDesktop + next);
      setIsDesktop(true);
      setIsMobile(false);
      setIsTab(false);
    } else if (isScreenMd && !isScreenSm) {
      setVisibleCards(numVisTab + next)
      setIsTab(true);
      setIsDesktop(false);
      setIsMobile(false);
    } else if (isScreenSm) {
      setVisibleCards(numVisMob + next)
      setIsMobile(true);
      setIsDesktop(false);
      setIsTab(false);
    }
  }, [next, isScreenLg, isScreenMd, isScreenSm, visibleCards, numVisDesktop, numVisMob, numVisTab])

  React.useEffect(() => {
    if (props.filteredCards.length > visibleCards) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false)
    }
  }, [props.filteredCards, visibleCards]);

  const changeOnClickArr = () => {
    let step;
    if (isDesktop) {
      step = 3;
    } else if (isTab) {
      step = 2;
    } else if (isMobile) {
      step = 2;
    }
    setNext(next + step);
  }

  React.useEffect(() => {
    if (props.isLogout) {
      localStorage.removeItem('next');
      localStorage.removeItem('visible-cards');
      localStorage.removeItem('visible-cards-desktop');
      localStorage.removeItem('visible-cards-tab');
      localStorage.removeItem('visible-cards-mob');
    }
    localStorage.setItem('next', JSON.stringify(next));
    localStorage.setItem('visible-cards', JSON.stringify(visibleCards));
  }, [props.isLogout, visibleCards, next])

  return (
    <>
      <Header loggedIn={props.loggedIn} isPageMovie={true} />
      <main className="movies" onResize={handleChangeScreenWidth}>
        <SearchForm
          value={props.value}
          isValidSubmit={props.isValidSubmit}
          isValueError={props.isValueError}
          onSubmit={props.onSubmit}
          onChange={props.onChange}
          onClickCheckbox={props.onClickCheckbox}
          isCheckbox={props.isCheckbox}
          cards={props.cards}
          setCards={props.setCards}
          setNext={setNext}
          movies={true}
          setVisibleCards={setVisibleCards}
        />

        <MoviesCardList>
          {
            props.isLoading
              ? <Preloader />
              : props.isSubmitError
                ? (<p className="movies__card-list-text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>)
                : props.isNotFound
                  ? (<p className="movies__card-list-text">Ничего не найдено</p>)
                  : props.filteredCards.map((card, index) => (
                    <MoviesCard
                      handleAddMovies={props.handleAddMovies}
                      handleMovieDelete={props.handleMovieDelete}
                      key={card.id}
                      card={card}
                      index={index}
                      link={`https://api.nomoreparties.co/${card.image.url}`}
                      savedCards={props.savedCards}
                      visibleCards={visibleCards}
                      movies={true}
                    />
                  ))
          }
        </MoviesCardList>
        <ShowMore
          isButton={isButtonActive}
          onClick={changeOnClickArr}
        />
      </main>
      <Footer />
    </>
  )
}

export default Movies;