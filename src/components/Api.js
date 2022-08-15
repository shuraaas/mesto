export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;

    // console.log(this._headers.authorization);
  }

  // запрашиваем инфу о пользователе с сервера (аватар, имя, описание)
  getUserInfo() {
    return fetch(`${this._url}users/me`,
      {
        headers: {
          authorization: this._headers.authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  // запрашиваем начальные карточки с сервера
  getInitialCards() {
    return fetch(`${this._url}cards`,
      {
        headers: {
          authorization: this._headers.authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}