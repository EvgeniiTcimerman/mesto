export class Card {
  constructor(name, link, template, openPopup) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._openPopup = openPopup;
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

    this._likeButton().addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup();
    });
  }

  _handleOpenPopup() {
    this._openPopup(document.querySelector(".popup_type_image"));
    this._handlePopupImage().src = this._link;
    this._handlePopupName().textContent = this._name;
    this._handlePopupImage().alt = `Фото ${this._name}`;
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeCard() {
    this._likeButton().classList.toggle("place__like_active");
  }

  _likeButton() {
    const like = this._cardElement.querySelector(".place__like");
    return like;
  }

  _handlePopupImage() {
    const popupImage = document.querySelector(".popup__img");
    return popupImage;
  }

  _handlePopupName() {
    const popupName = document.querySelector(".popup__subtitle");
    return popupName;
  }
}
