import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = document.querySelector(".popup__img");
    this._cardImageText = document.querySelector(".popup__subtitle");
  }

  open(name, link) {
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardImageText.textContent = name;

    super.open();
  }
}
