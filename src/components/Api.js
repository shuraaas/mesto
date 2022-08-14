export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;

    // console.log(this._headers.authorization);
  }

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
      });
      // .then(data => {

      //   console.log(data)
      //   // return data;
      // });
  }

  // setUserInfo() {
  //   console.log(this.getUserInfo());
  // }

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
      });
      // .then(data => console.log(data));
  }
}