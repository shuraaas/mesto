export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;

    // console.log(this._headers.authorization);
  }

  // проверяем рузультат запроса
  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // запрашиваем инфу о пользователе с сервера (аватар, имя, описание)
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
        headers: {
          authorization: this._headers.authorization
        }
      })
      .then(this._checkResult);
  }

  //  сохраняем отредактированные данные профиля на сервере
  setUserInfo(userData) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.job
      })
    })
    .then(this._checkResult);
  }

  // запрашиваем начальные карточки с сервера
  getInitialCards() {
    return fetch(`${this._url}cards`, {
        headers: {
          authorization: this._headers.authorization
        }
      })
      .then(this._checkResult);
  }
}