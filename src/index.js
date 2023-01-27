import "./pages/index.css";
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { Api } from "./scripts/Api";
import { PopupWithNotice } from "./scripts/PopupWithNotice";
import { validationSelectors, selectors } from "./scripts/utils/constants.js";

// объявление переменных

const buttonEdit = document.querySelector(selectors.buttonEdit);
const buttonAdd = document.querySelector(selectors.buttonAdd);
const buttonEditProfilePhoto = document.querySelector(
  selectors.buttonEditProfilePhoto
);

const popupProfileForm = document.querySelector(selectors.popupProfileForm);
const popupProfilePlace = document.querySelector(selectors.popupProfilePlace);
const popupProfilePhoto = document.querySelector(selectors.popupProfilePhoto);

const nameInput = popupProfileForm.querySelector(selectors.nameInput);
const descriptionInput = popupProfileForm.querySelector(
  selectors.descriptionInput
);

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-57/",
  headers: {
    authorization: "f5c580e2-e8c5-430e-b0a5-325ce27ff0f0",
    "content-type": "application/json",
  },
});

let userId;

// данные для редактирования профиля

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
  profilePhotoSelector: ".profile__photo",
});

// открытие попапа с картинкой

const popupImageCard = new PopupWithImage(".popup_type_image");

popupImageCard.setEventListeners();

// функция создания карточки
const createCard = (cardData) => {
  const cardElement = new Card(
    cardData,
    ".template-place",
    userId,
    { cardId: cardData._id, authorId: cardData.owner._id },
    {
      openPopupImage: (name, link) => {
        popupImageCard.open(name, link);
      },

      deleteCard: (cardItem, cardId) => {
        popupWithNoticeDelete.open(cardItem, cardId);
      },

      putLike: (cardId) => {
        api
          .putCardLike(cardId)
          .then((res) => {
            cardElement.renderCardLike(res);
          })
          .catch((err) => {
            console.log(`Не удалось поставить лайк из-за ошибки: ${err}`);
          });
      },
      removeLike: (cardId) => {
        api
          .removeCardLike(cardId)
          .then((res) => {
            cardElement.renderCardLike(res);
          })
          .catch((err) => {
            console.log(`Не удалось убрать лайк из-за ошибки: ${err}`);
          });
      },
    }
  );

  return cardElement.generateCard();
};

// функция рендера начальных карточек

const renderInitialCards = new Section(
  {
    renderer: (cardData) => {
      renderInitialCards.addItem(createCard(cardData));
    },
  },
  ".places__grid"
);

api.getInitialCards().then((cards) => {
  renderInitialCards.renderCards(cards);
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      profileName: userData.name,
      description: userData.about,
    });
    userInfo.setUserPhoto(userData.avatar);
    renderInitialCards.renderCards(cardData.reverse());
  })
  .catch((err) => {
    console.log(`Что-то пошло не так ${err}`);
  });

// открытие popup добавления карточки

const popupAddCard = new PopupWithForm(".popup_type_new-card", {
  formObject: (formInput) => {
    popupAddCard.putSavingText();
    api
      .addNewCard({ name: formInput.title, link: formInput.link })
      .then((cardData) => {
        renderInitialCards.addItem(createCard(cardData));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err} при добавлении новой карточки`);
      })
      .finally(() => {
        popupAddCard.putDefaultText();
      });
  },
});

popupAddCard.setEventListeners();

// открытие popup редактирования профиля

const popupEditProfile = new PopupWithForm(".popup_type_edit", {
  formObject: (userData) => {
    popupEditProfile.putSavingText();
    api
      .sendUserInfo(userData)
      .then((res) => {
        userInfo.setUserInfo({
          profileName: res.name,
          description: res.about,
        });
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err} при редактировании профиля`);
      })
      .finally(() => {
        popupEditProfile.putDefaultText();
      });
  },
});

popupEditProfile.setEventListeners();

const popupEditProfilePhoto = new PopupWithForm(".popup_type_edit-photo", {
  formObject: (userData) => {
    popupEditProfilePhoto.putSavingText();
    api
      .updateProfilePhoto(userData.link)
      .then((res) => {
        userInfo.setUserPhoto(res.avatar);
        popupEditProfilePhoto.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err} при обновлении фото профиля`);
      })
      .finally(() => {
        popupEditProfilePhoto.putDefaultText();
      });
  },
});

popupEditProfilePhoto.setEventListeners();

const popupWithNoticeDelete = new PopupWithNotice(".popup_type_delete", {
  formObject: (cardItem, cardId) => {
    console.log("dadada");
    api
      .deleteCard(cardId)
      .then(() => {
        cardItem.handleDeleteCard();
        popupWithNoticeDelete.close();
      })
      .catch((err) => {
        console.log(`При удалении карточки возникла ошибка ${err}`);
      });
  },
});

popupWithNoticeDelete.setEventListeners();

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

const profilePhotoFormValid = new FormValidator(
  validationSelectors,
  popupProfilePhoto
);
profilePhotoFormValid.enableValidation();

//обработчики событий

buttonEdit.addEventListener("click", () => {
  profileFormValid.removeValidationErrors();

  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.profileName.trim();
  descriptionInput.value = currentUserInfo.description.trim();

  popupEditProfile.open();
});

buttonAdd.addEventListener("click", () => {
  popupProfilePlace.reset();

  placeFormValid.removeValidationErrors();

  placeFormValid.disableSubmitButton();

  popupAddCard.open();
});

buttonEditProfilePhoto.addEventListener("click", () => {
  profilePhotoFormValid.disableSubmitButton();
  profilePhotoFormValid.removeValidationErrors();
  popupEditProfilePhoto.open();
});
