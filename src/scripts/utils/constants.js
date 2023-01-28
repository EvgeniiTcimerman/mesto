import { selectors } from "./selectors.js";

export {
  buttonEdit,
  buttonAdd,
  buttonEditProfilePhoto,
  popupProfileForm,
  popupProfilePlace,
  popupProfilePhoto,
  nameInput,
  descriptionInput,
};

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
