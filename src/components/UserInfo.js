export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._userName = document.querySelector(profileNameSelector);
    this._userJob = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    const user = {};

    user.name = this._userName.textContent;
    user.job = this._userJob.textContent;

    return user;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.about ? userData.about : userData.job;
  }
}