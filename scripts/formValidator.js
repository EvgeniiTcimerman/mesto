export class FormValidator {
  constructor(validationSelectors, formElement) {
    this._validationSelectors = validationSelectors;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(
      this._validationSelectors.inputSelector
    );
  }

  enableValidation() {
    this._setEventListeners();
    this._disableSubmitButton();
  }

  _setEventListeners() {
    this._disableSubmitButton();

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
    const inputList = this._formElement.querySelectorAll(
      this._validationSelectors.inputSelector
    );

    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _disableSubmitButton() {
    const submitButton = this._formElement.querySelector(
      this._validationSelectors.submitButtonSelector
    );
    submitButton.classList.add(this._validationSelectors.inactiveButtonClass);
    submitButton.setAttribute("disabled", "disabled");
  }

  _enableSubmitButton() {
    const submitButton = this._formElement.querySelector(
      this._validationSelectors.submitButtonSelector
    );
    submitButton.classList.remove(
      this._validationSelectors.inactiveButtonClass
    );
    submitButton.removeAttribute("disabled");
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some(
      (inputElement) => !inputElement.validity.valid
    );
  }
}
