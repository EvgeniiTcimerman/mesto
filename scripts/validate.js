// селекторы
const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: '.popup__submit-button_disabled',
  inputErrorClass: '.popup__item-error',
  errorClass: '.popup__edit_invalid'
}; 

enableValidation(validationSelectors);


function enableValidation (validationSelectors) {
  const formList = Array.from(document.querySelectorAll(validationSelectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}


function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationSelectors.inputSelector));
  const submitButton = formElement.querySelector(validationSelectors.submitButtonSelector);

  disableSubmitButton (validationSelectors, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(formElement, validationSelectors.inputSelector, submitButton);
    });
  });
}


function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}


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


function toggleButtonState (formElement, inputSelector, submitButton) {
  const inputList = formElement.querySelectorAll(inputSelector)

  if (hasInvalidInput(inputList)) {
    disableSubmitButton  (validationSelectors, submitButton); 
  } else {
    enableSubmitButton (validationSelectors, submitButton);
  }
}


function disableSubmitButton (validationSelectors, submitButton) {
  submitButton.classList.add(validationSelectors.inactiveButtonClass);
  submitButton.setAttribute('disabled', 'disabled');
}

function enableSubmitButton (validationSelectors, submitButton) {
  submitButton.classList.remove(validationSelectors.inactiveButtonClass);
  submitButton.removeAttribute('disabled');
}


function hasInvalidInput (inputList) {
  return Array.from(inputList).some((inputElement) => !inputElement.validity.valid);
}


