import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit.formObject;
    this._popupFormElement = this._popupElement.querySelector(".popup__form");
    this._inputList = Array.from(
      this._popupFormElement.querySelectorAll(".popup__edit")
    );
    this._submitButton = this._popupElement.querySelector(
      ".popup__submit-button"
    );
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formObject = {};
    this._inputList.forEach((input) => {
      formObject[input.name] = input.value;
    });

    return formObject;
  }

  close() {
    super.close();

    this._popupFormElement.reset();
  }

  setEventListeners() {
    this._popupFormElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());

      this.close();
    });

    super.setEventListeners();
  }

  putSavingText() {
    this._submitButton.textContent = "Сохранение...";
  }

  putDefaultText() {
    this._submitButton.textContent = this._submitButtonText;
  }
}
