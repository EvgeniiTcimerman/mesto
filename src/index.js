import "./pages/index.css";
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";
import {
  initialCards,
  validationSelectors,
  selectors,
} from "./scripts/utils/constants.js";

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
    createCard(formObject.title, formObject.link, ".template-place")
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
