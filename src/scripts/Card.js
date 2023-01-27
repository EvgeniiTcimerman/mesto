export class Card {
  constructor(cardData, template, userId, dataId, handleCardActions) {
    this._card = cardData;
    this._name = this._card.name;
    this._link = this._card.link;

    this._template = template;
    this._userId = userId;

    this._cardId = dataId.cardId;
    this._authorId = dataId.authorId;

    this._openPopupImage = handleCardActions.openPopupImage;
    this._deleteCard = handleCardActions.deleteCard;
    this._putLike = handleCardActions.putLike;
    this._removeLike = handleCardActions.removeLike;
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
    this._deleteButton = this._cardElement.querySelector(".place__delete");
    this.likeCount = this._cardElement.querySelector(".place__like-count");

    this._cardElement.querySelector(".place__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.renderCardLike(this._card);
    this._setEventListeners();

    return this._cardElement;
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  renderCardLike(card) {
    this._likes = card.likes;
    if (this._likes.length === 0) {
      this.likeCount.textContent = "";
    } else {
      this.likeCount.textContent = this._likes.length;
    }
    if (this._isLiked()) {
      this._cardLike.classList.add("place__like_active");
    } else {
      this._cardLike.classList.remove("place__like_active");
    }
  }

  _isLiked() {
    return this._likes.find((userLike) => userLike._id === this._userId);
  }

  _handleLikeCard() {
    if (this._isLiked()) {
      this._removeLike(this._cardId);
    } else {
      this._putLike(this._cardId);
    }
  }

  _setEventListeners() {
    if (this._userId === this._authorId) {
      this._deleteButton.addEventListener("click", () => {
        this._deleteCard(this, this._cardId);
      });
    } else {
      this._deleteButton.remove();
    }

    this._cardLike.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._openPopupImage(this._name, this._link);
    });
  }
}
