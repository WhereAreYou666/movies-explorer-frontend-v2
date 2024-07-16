export default class Api {
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
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(this._baseUrl).then(res => this._getCheck(res));
  }
}

export const api = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});
