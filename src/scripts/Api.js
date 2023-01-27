export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _readResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._readResponse(res);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._readResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._readResponse(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._readResponse(res);
    });
  }

  sendUserInfo(userData) {
    console.log(userData);
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: userData.profileName,
        about: userData.description,
      }),
    }).then((res) => {
      return this._readResponse(res);
    });
  }

  updateProfilePhoto(profilePhotoUrl) {
    return fetch(`${this._url}users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: profilePhotoUrl }),
    }).then((res) => {
      return this._readResponse(res);
    });
  }

  putCardLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => {
      return this._readResponse(res);
    });
  }

  removeCardLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._readResponse(res);
    });
  }
}
