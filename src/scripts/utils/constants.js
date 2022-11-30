export { initialCards, validationSelectors, selectors };

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

const validationSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__edit",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: ".popup__submit-button_disabled",
  inputErrorClass: ".popup__item-error",
  errorClass: ".popup__edit_invalid",
};

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
