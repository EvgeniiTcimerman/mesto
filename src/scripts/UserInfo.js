export class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo({ profileName, description }) {
    this._profileName.textContent = profileName;
    this._profileDescription.textContent = description;
  }
}
