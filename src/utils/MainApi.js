export default class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._headers = options.headers;
    this._contentType = options.headers['Content-Type'];
  }

  _getCheck(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getSavedCards() {
    return fetch(this._baseUrl + '/movies', {
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  addNewCard({ country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId }) {
    return fetch(this._baseUrl + '/movies', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      })
    }).then(res => this._getCheck(res));
  }

  getProfileContent() {
    return fetch(this._baseUrl + '/users/me', {
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  submitProfileData({ name, email }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    }).then(res => this._getCheck(res));
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + `/movies/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._getCheck(res));
  }

  register(password, email, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
        name,
      }),
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  authorization(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  clearCookie() {
    return fetch(`${this._baseUrl}/signout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

}

export const mainApi = new MainApi({
  baseUrl: 'https://api.rpmovies.nomoredomainswork.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});
