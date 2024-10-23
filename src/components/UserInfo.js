class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      id: this._id
    };
  }

  setUserInfo(name, job, id) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    if (id) {
      this._id = id;
    }
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  getUserId() {
    return this._id;
  }
}

export default UserInfo;