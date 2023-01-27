export class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    profilePhotoSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
    this._profilePhotoLink = document.querySelector(profilePhotoSelector);
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

  setUserPhoto(profilePhotoLink) {
    this._profilePhotoLink.src = profilePhotoLink;
  }
}
