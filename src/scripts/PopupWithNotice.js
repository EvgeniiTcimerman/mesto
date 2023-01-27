import { Popup } from "./Popup.js";

export class PopupWithNotice extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._submitForm = this._popupElement.querySelector(".popup__delete");
    this._formSubmit = formSubmit.formObject;
  }

  open(cardData, cardId) {
    this._card = cardData;
    this._cardId = cardId;
    super.open();
  }
  setEventListeners() {
    this._submitForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(this._card, this._cardId);
    });
    super.setEventListeners();
  }
}
