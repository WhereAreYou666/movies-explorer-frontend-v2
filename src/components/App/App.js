import React from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundError from "../NotFoundError/NotFoundError";
import { api } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SHORT_DURATION } from "../../utils/constants.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState(JSON.parse(localStorage.getItem('cards')));
  const [savedCards, setSavedCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [authBlocked, setAuthBlocked] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [isValidSubmit, setIsValidSubmit] = React.useState(false);
  const [isValueError, setIsValueError] = React.useState('Фильм');
  const [isSubmitError, setIsSubmitError] = React.useState(false);
  const [valueFilter, setValueFilter] = React.useState(JSON.parse(localStorage.getItem('input')));
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCheckedCheckbox, setIsCheckedCheckbox] = React.useState(JSON.parse(localStorage.getItem('checkbox')));
  const [isSaveCheckedCheckbox, setIsSaveCheckedCheckbox] = React.useState(JSON.parse(localStorage.getItem('save-checkbox')));
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [errorProfile, setErrorProfile] = React.useState(false);
  const [errUnathorized, setErrUnathorized] = React.useState(false);
  const [errBadRequest, setErrBadRequest] = React.useState(false);
  const [errBadRequestProfile, setErrBadRequestProfile] = React.useState(false);
  const [errConflict, setErrConflict] = React.useState(false);
  const [isLogout, setIsLogout] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck();
  }, [])

  const tokenCheck = () => {
    mainApi
      .checkToken()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setAuthBlocked(true);
        } else {
          setIsLoggedIn(false);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      })
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getSavedCards(), mainApi.getProfileContent()])
        .then(([movies, info]) => {
          setSavedCards(movies);
          setCurrentUser(info);
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  function handleClickShortCutCheckbox() {
    if (isCheckedCheckbox) {
      setIsCheckedCheckbox(false);
    } else {
      setIsCheckedCheckbox(true);
    }
  }

  function handleClickSaveShortCutCheckbox() {
    if (isSaveCheckedCheckbox) {
      setIsSaveCheckedCheckbox(false);
    } else {
      setIsSaveCheckedCheckbox(true);
    }
  }

  React.useEffect(() => {
    localStorage.setItem('checkbox', JSON.stringify(isCheckedCheckbox))
    localStorage.setItem('save-checkbox', JSON.stringify(isSaveCheckedCheckbox))
  }, [isCheckedCheckbox, isSaveCheckedCheckbox])

  function handleChangeValue(evt) {
    setValue(evt.target.value);
  }

  const handleSearchSubmit = () => {
    if (value === '') {
      setIsValidSubmit(true);
      setIsValueError('Нужно ввести ключевое слово');
    } else {
      setIsValidSubmit(false);
      setIsValueError('Фильм');
      setValueFilter(value.slice());
      localStorage.setItem('input', JSON.stringify(value.slice()))
      setIsLoading(true);
      api.getInitialCards()
        .then((cards) => {
          setCards(cards);
          localStorage.setItem('cards', JSON.stringify(cards));
        })
        .catch(err => {
          console.log(err);
          setIsSubmitError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  React.useEffect(() => {
    if (cards === null) {
      setCards([]);
      setValueFilter(null)
    }

    if (cards !== null && cards.length > 0 && valueFilter !== null) {
      setValue(JSON.parse(localStorage.getItem('input')));
      if (isCheckedCheckbox) {
        setFilteredCards(cards.filter((card) => {
          return (card.duration <= SHORT_DURATION) && (card.nameRU.toLowerCase().includes(valueFilter.toLowerCase())
            || card.nameEN.toLowerCase().includes(valueFilter.toLowerCase()))
        }))
      } else {
        setFilteredCards(cards.filter((card) => {
          return (
            card.nameRU.toLowerCase().includes(valueFilter.toLowerCase())
            || card.nameEN.toLowerCase().includes(valueFilter.toLowerCase())
          );
        }))
      }
    }

  }, [cards, valueFilter, isCheckedCheckbox]);

  React.useEffect(() => {
    if ((valueFilter !== null && cards !== null && filteredCards.length === 0)) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [valueFilter, filteredCards, cards]);

  function handleAddMovies(card) {
    mainApi
      .addNewCard(card)
      .then(newCard => {
        setSavedCards([newCard, ...savedCards]);
      })
      .catch(err => console.log(err))
  }

  function handleMovieDelete(card) {
    const savedMovie = savedCards.find(savedCard => {
      return savedCard.owner === currentUser._id ? (savedCard.movieId === card.movieId) || (savedCard.movieId === card.id) : savedCard
    })
    mainApi
      .deleteCard(savedMovie._id)
      .then(() => {
        setSavedCards(cards => cards.filter(movie => movie._id !== savedMovie._id))
      })
      .catch((err) => console.log(err))
  }

  function handleSubmitRegister(password, email, name) {
    setIsLoading(true);
    mainApi
      .register(password, email, name)
      .then((res) => {
        navigate('/sign-in', { replace: true });
        if (res) {
          setErrBadRequest(false);
          setErrConflict(false);
          handleSubmitAuth(password, email);
        }
      })
      .catch((err) => {
        if (err === 400) {
          setErrBadRequest(true);
        } else if (err === 409) {
          setErrConflict(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleSubmitAuth(password, email) {
    setIsLoading(true);
    mainApi
      .authorization(password, email)
      .then((res) => {
        setIsLoggedIn(true);
        navigate('/movies', { replace: true });
        if (res) {
          setErrUnathorized(false);
          setErrBadRequestProfile(false);
        }
        return res;
      })
      .catch((err) => {
        if (err === 401) {
          setErrUnathorized(true);
        } else if (err === 400) {
          setErrBadRequestProfile(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateUser(profileData) {
    setIsLoading(true);
    mainApi
      .submitProfileData(profileData)
      .then((newData) => {
        if (newData) {
          setCurrentUser(newData);
          setErrorProfile(false);
        }
      })
      .catch(err => {
        console.log(err);
        setErrorProfile(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleClearCookie = () => {
    mainApi
      .clearCookie()
      .then((res) => {
        setIsLoggedIn(false);
        navigate('/');
        localStorage.removeItem('cards');
        localStorage.removeItem('input');
        localStorage.removeItem('checkbox');
        setFilteredCards([]);
        setValueFilter(JSON.parse(localStorage.getItem('input')));
        setValue('');
        setIsCheckedCheckbox(JSON.parse(localStorage.getItem('checkbox')));
        setIsSaveCheckedCheckbox(JSON.parse(localStorage.getItem('checkbox')));
        setIsLogout(true);
        setAuthBlocked(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          {!authBlocked && <Route
            path="/sign-up"
            element={
              <Register
                onSubmit={handleSubmitRegister}
                errBadRequest={errBadRequest}
                errConflict={errConflict}
                isLoading={isLoading}
              />
            }
          />}
          {!authBlocked && <Route
            path="/sign-in"
            element={
              <Login
                onSubmit={handleSubmitAuth}
                errUnathorized={errUnathorized}
                errBadRequestLogin={errBadRequestProfile}
                isLoading={isLoading}
              />

            }
          />}
          <Route
            path="/"
            element={
              <Main
                loggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLoading={isLoading}
                loggedIn={isLoggedIn}
                value={value}
                isNotFound={isNotFound}
                isValidSubmit={isValidSubmit}
                isValueError={isValueError}
                isSubmitError={isSubmitError}
                onSubmit={handleSearchSubmit}
                onChange={handleChangeValue}
                isCheckbox={isCheckedCheckbox}
                onClickCheckbox={handleClickShortCutCheckbox}
                filteredCards={filteredCards}
                cards={cards}
                setCards={setCards}
                handleAddMovies={handleAddMovies}
                handleMovieDelete={handleMovieDelete}
                savedCards={savedCards}
                isLogout={isLogout}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={isLoggedIn}
                savedCards={savedCards}
                handleMovieDelete={handleMovieDelete}
                isCheckbox={isSaveCheckedCheckbox}
                onClickCheckbox={handleClickSaveShortCutCheckbox}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
                onLogoutProfile={handleClearCookie}
                errorProfile={errorProfile}
                setErrorProfile={setErrorProfile}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn && <Navigate to="/404" replace />
            }
          />
          <Route
            path="/404"
            element={
              <NotFoundError />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
