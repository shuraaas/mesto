export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._tokenId = config.tokenId;
    this._headers = {
      authorization: this._tokenId,
      'Content-Type': 'application/json'
    };
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
        headers: this._headers
      })
      .then(this._checkResult);
  }

  //  сохраняем отредактированные данные профиля на сервере
  setUserInfo(userData) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
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
        headers: this._headers
      })
      .then(this._checkResult);
  }

  // загружаем новую карточку на сервер
  setNewCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResult);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResult);
  }

  // ставим лайк
  likeCard(cardId, status) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: status ? 'DELETE' : 'PUT',
      headers: this._headers
    })
    .then(this._checkResult);
  }

  // загружаем новый аватар на сервер
  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._checkResult);
  }
}