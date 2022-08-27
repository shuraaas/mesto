export default class UserInfo {
  constructor(userData) {
    this._userAvatar = document.querySelector(userData.profileAvatarSelector);
    this._userName = document.querySelector(userData.profileNameSelector);
    this._userJob = document.querySelector(userData.profileJobSelector);
  }

  getUserInfo() {
    const user = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };

    return user;
  }

  setUserInfo(userData) {
    this._userAvatar.src = userData.avatar;
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.about ? userData.about : userData.job;
  }
}