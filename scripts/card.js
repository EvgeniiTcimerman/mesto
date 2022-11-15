export class Card {
  constructor(name, link, openPopup) {
    this._name = name;
    this._link = link;
    this._openPopup = openPopup;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(".template-place")
      .content.querySelector(".place")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._cardElement = this._getCardTemplate();
    this._cardElement.querySelector(".place__name").textContent = this._name;
    this._cardElement.querySelector(".place__photo").src = this._link;
    this._cardElement.querySelector(".place__photo").alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".place__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".place__like")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });

    this._cardElement
      .querySelector(".place__photo")
      .addEventListener("click", () => {
        this._openPopup(document.querySelector(".popup_type_image"));
        document.querySelector(".popup__img").src = this._link;
        document.querySelector(".popup__subtitle").textContent = this._name;
        document.querySelector(".popup__img").alt = `Фото ${this._name}`;
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeCard() {
    this._cardElement
      .querySelector(".place__like")
      .classList.toggle("place__like_active");
  }
}
