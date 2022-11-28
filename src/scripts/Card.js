export class Card {
  constructor(name, link, template, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getCardTemplate();

    this._cardImage = this._cardElement.querySelector(".place__photo");
    this._cardLike = this._cardElement.querySelector(".place__like");

    this._cardElement.querySelector(".place__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".place__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardLike.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeCard() {
    this._cardLike.classList.toggle("place__like_active");
  }
}
