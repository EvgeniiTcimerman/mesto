export class FormValidator {
  constructor(validationSelectors, formElement) {
    this._validationSelectors = validationSelectors;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(
      this._validationSelectors.inputSelector
    );
    this._submitButton = this._formElement.querySelector(
      this._validationSelectors.submitButtonSelector
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this.disableSubmitButton();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
      return;
    }

    this._showInputError(inputElement, inputElement.validationMessage);
  }

  // метод отображения ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._validationSelectors.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSelectors.inputErrorClass);
  }

  // метод скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._validationSelectors.errorClass);
    errorElement.classList.remove(this._validationSelectors.inputErrorClass);
    errorElement.textContent = "";
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  removeValidationErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  disableSubmitButton() {
    this._submitButton.classList.add(
      this._validationSelectors.inactiveButtonClass
    );
    this._submitButton.setAttribute("disabled", "disabled");
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(
      this._validationSelectors.inactiveButtonClass
    );
    this._submitButton.removeAttribute("disabled");
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some(
      (inputElement) => !inputElement.validity.valid
    );
  }
}
