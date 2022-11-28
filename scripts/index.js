import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

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
  descriptionInput: ".popup__edit_type_description",
  placeTitleInput: ".popup__edit_type_place-title",
  placeLinkInput: ".popup__edit_type_place-link",
  profileName: ".profile__name",
  profileJob: ".profile__description",
  template: ".template-place",
  place: ".place",
  placeCard: ".places__grid",
  text: ".place__name",
  photo: ".place__photo",
  popupProfile: ".popup_type_edit",
  popupPlace: ".popup_type_new-card",
  buttonLikeCard: ".place__like",
  buttonDeleteCard: ".place__delete",
  popupList: ".popup",
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

const popupProfileForm = document.querySelector(selectors.popupProfileForm);
const popupProfilePlace = document.querySelector(selectors.popupProfilePlace);

const nameInput = popupProfileForm.querySelector(selectors.nameInput);
const descriptionInput = popupProfileForm.querySelector(
  selectors.descriptionInput
);

const placeCard = document.querySelector(selectors.placeCard);

// открытие попапа с картинкой

const popupImageCard = new PopupWithImage(".popup_type_image");

popupImageCard.setEventListeners();

function handleCardClick(name, link) {
  popupImageCard.open(name, link);
}

// функция создания карточки
const createCard = (name, link, template) => {
  const card = new Card(name, link, template, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

// функция рендера начальных карточек

const renderInitialCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderInitialCards.addItem(
        createCard(item.name, item.link, ".template-place"),
        "after"
      );
    },
  },
  ".places__grid"
);

renderInitialCards.renderCards();

// открытие popup добавления карточки

const popupAddCard = new PopupWithForm(".popup_type_new-card", (formObject) => {
  renderInitialCards.addItem(
    createCard({
      name: formObject.name,
      link: formObject.link,
    })
  );
  popupAddCard.close();
});

popupAddCard.setEventListeners();

// данные для редактирования профиля

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
});

// открытие popup редактирования профиля

const popupEditCard = new PopupWithForm(".popup_type_edit", (formObject) => {
  console.warn(formObject);
  userInfo.setUserInfo({
    profileName: formObject.profileName,
    description: formObject.description,
  });
  popupEditCard.close();
});

popupEditCard.setEventListeners();

// использование класса валидации

const profileFormValid = new FormValidator(
  validationSelectors,
  popupProfileForm
);
profileFormValid.enableValidation();

const placeFormValid = new FormValidator(
  validationSelectors,
  popupProfilePlace
);
placeFormValid.enableValidation();

//обработчики событий

buttonEdit.addEventListener("click", () => {
  profileFormValid.removeValidationErrors();

  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.profileName.trim();
  descriptionInput.value = currentUserInfo.description.trim();

  popupEditCard.open();
});

buttonAdd.addEventListener("click", () => {
  popupProfilePlace.reset();

  placeFormValid.removeValidationErrors();

  placeFormValid.disableSubmitButton();

  popupAddCard.open();
});

popupProfilePlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  placeCard.prepend(
    createCard(evt.target.title.value, evt.target.link.value, ".template-place")
  );

  popupAddCard.close();
});
