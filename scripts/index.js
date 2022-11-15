import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";

// создание начальных карточек

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// объявление селекторов

const selectors = {
  buttonEdit: ".profile__edit-button",
  buttonAdd: ".profile__add-button",
  buttonCloseEditProfile: ".popup__close_type_edit",
  buttonCloseEditPlace: ".popup__close_type_add",
  buttonCloseImagePopup: ".popup__close_type_img",
  popupProfileForm: ".popup_type_edit .popup__form",
  popupProfilePlace: ".popup_type_new-card .popup__form",
  popupImage: ".popup_type_image",
  popupPhoto: ".popup__img",
  popupPhotoText: ".popup__subtitle",
  nameInput: ".popup__edit_type_name",
  jobInput: ".popup__edit_type_description",
  placeTitleInput: ".popup__edit_type_place-title",
  placeLinkInput: ".popup__edit_type_place-link",
  profileName: ".profile__name",
  profileJob: ".profile__description",
  template: ".template-place",
  place: ".place",
  places: ".places__grid",
  text: ".place__name",
  photo: ".place__photo",
  popupProfile: ".popup_type_edit",
  popupPlace: ".popup_type_new-card",
  buttonLikeCard: ".place__like",
  buttonDeleteCard: ".place__delete",
  popupWindow: ".popup",
};

const validationSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__edit",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: ".popup__submit-button_disabled",
  inputErrorClass: ".popup__item-error",
  errorClass: ".popup__edit_invalid",
};

// объявление переменных

const buttonEdit = document.querySelector(selectors.buttonEdit);
const buttonAdd = document.querySelector(selectors.buttonAdd);

const buttonCloseEditProfile = document.querySelector(
  selectors.buttonCloseEditProfile
);
const buttonCloseEditPlace = document.querySelector(
  selectors.buttonCloseEditPlace
);
const buttonCloseImagePopup = document.querySelector(
  selectors.buttonCloseImagePopup
);

const popupWindow = document.querySelectorAll(selectors.popupWindow);
const popupProfileForm = document.querySelector(selectors.popupProfileForm);
const popupProfilePlace = document.querySelector(selectors.popupProfilePlace);
const popupProfile = document.querySelector(selectors.popupProfile);
const popupPlace = document.querySelector(selectors.popupPlace);
const popupImage = document.querySelector(selectors.popupImage);
const popupPhoto = popupImage.querySelector(selectors.popupPhoto);
const popupPhotoText = popupImage.querySelector(selectors.popupPhotoText);

const nameInput = popupProfileForm.querySelector(selectors.nameInput);
const jobInput = popupProfileForm.querySelector(selectors.jobInput);
const placeTitleInput = document.querySelector(selectors.placeTitleInput);
const placeLinkInput = document.querySelector(selectors.placeLinkInput);

const profileName = document.querySelector(selectors.profileName);
const profileJob = document.querySelector(selectors.profileJob);

const places = document.querySelector(selectors.places);

// функция открытия и закрытия popup

function openPopup(modal) {
  document.addEventListener("keydown", handleEscUp);
  modal.classList.add("popup_opened");
}

function closePopup(modal) {
  document.removeEventListener("keydown", handleEscUp);
  modal.classList.remove("popup_opened");
}

const handleEscUp = (evt) => {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
};

// функция редактирования имени профиля

function fillProfileFromInputs() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function submitHandlerProfileForm(evt) {
  evt.preventDefault();
  fillProfileFromInputs();
  closePopup(popupProfile);
}

// функция создания начальных карточек

function addCard(item) {
  const card = new Card(item.name, item.link, openPopup);
  const cardElement = card.createCard();

  document.querySelector(selectors.places).append(cardElement);
}

initialCards.forEach((item) => {
  addCard(item);
});

// обработчики событий

buttonEdit.addEventListener("click", () => {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();

  const formValid = new FormValidator(validationSelectors, popupProfileForm);

  formValid.enableValidation();

  openPopup(popupProfile);
});

buttonAdd.addEventListener("click", () => {
  popupProfilePlace.reset();

  const formValid = new FormValidator(validationSelectors, popupProfilePlace);

  formValid.enableValidation();

  openPopup(popupPlace);
});

popupProfilePlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCard(
    {
      name: evt.target.title.value,
      link: evt.target.link.value,
    },
    places
  );
  closePopup(popupPlace);
});

buttonCloseEditProfile.addEventListener("click", () => {
  closePopup(popupProfile);
});

buttonCloseEditPlace.addEventListener("click", () => {
  closePopup(popupPlace);
});

buttonCloseImagePopup.addEventListener("click", () => {
  closePopup(popupImage);
});

popupProfileForm.addEventListener("submit", submitHandlerProfileForm);

popupWindow.forEach(function (popupWindow) {
  popupWindow.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popupWindow);
    }
  });
});
