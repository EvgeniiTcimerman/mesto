
// селекторы
const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: '.popup__submit-button_disabled',
  inputErrorClass: '.popup__item-error',
  errorClass: '.popup__edit_invalid'
}; 

// функция отображения ошибки
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationSelectors.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSelectors.inputErrorClass);
}
// функция скрытия ошибки
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
  inputElement.classList.remove(validationSelectors.errorClass);
  errorElement.classList.remove(validationSelectors.inputErrorClass);
  errorElement.textContent = '';
}


function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationSelectors.inputSelector));
  const submitButton = formElement.querySelector(validationSelectors.submitButtonSelector);

  toggleButtonState(formElement, validationSelectors.inputSelector, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(formElement, validationSelectors.inputSelector, submitButton);
    });
  });
}

function enableValidation () {
  const formList = Array.from(document.querySelectorAll(validationSelectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();

function hasInvalidInput (inputList) {
  return Array.from(inputList).some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState (formElement, inputSelector, submitButton) {
  const inputList = formElement.querySelectorAll(inputSelector)

  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(validationSelectors.inactiveButtonClass);
    submitButton.setAttribute('disabled', 'disabled'); 
  } else {
    submitButton.classList.remove(validationSelectors.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}
