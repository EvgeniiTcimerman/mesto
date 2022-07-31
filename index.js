const editButton = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");

let popupForm = popupContainer.querySelector(".popup__form");
let nameInput = popupForm.querySelector(".popup__edit_name");
let jobInput = popupForm.querySelector(".popup__edit_description");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__description");

function editProfile() {
  defaultPopupInputValue();
  popupContainer.classList.add("popup_opened");
}

editButton.addEventListener('click', editProfile);


function closeProfile() {
  popupContainer.classList.remove("popup_opened");
}

closePopup.addEventListener('click', closeProfile);

function defaultPopupInputValue() {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
}

function editInputValue() {
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  editInputValue();
  closeProfile();
}

popupForm.addEventListener('submit', formSubmitHandler);
