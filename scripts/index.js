const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 


// объявление селекторов

const selectors = {
  editButton: '.profile__edit-button',
  addButton: '.profile__add-button',
  popupContainer: '.popup',
  closePopupProfile: '.popup__close_type_edit',
  closePopupPlace: '.popup__close_type_add',
  closePopupImage: '.popup__close_type_img',
  popupFormEdit: '.popup_type_edit .popup__form',
  popupFormAdd: '.popup_type_new-card .popup__form',
  popupImage: '.popup_type_image',
  popupPhoto: '.popup__img',
  popupPhotoText: '.popup__subtitle',
  nameInput: '.popup__edit_type_name',
  jobInput: '.popup__edit_type_description',
  placeTitleInput: '.popup__edit_type_place-title',
  placeLinkInput: '.popup__edit_type_place-link',
  profileName: '.profile__name',
  profileJob: '.profile__description',
  template: '.template-place',
  place: '.place',
  places: '.places__grid',
  text: '.place__name',
  photo: '.place__photo',
  popupProfile: '.popup_type_edit',
  popupPlace: '.popup_type_new-card',
  likeButton: '.place__like',
  deleteButton: '.place__delete'
}

// объявление переменных

const editButton = document.querySelector(selectors.editButton);
const addButton = document.querySelector(selectors.addButton);

const popupContainer = document.querySelector(selectors.popupContainer);
const closePopupProfile = document.querySelector(selectors.closePopupProfile);
const closePopupPlace = document.querySelector(selectors.closePopupPlace);
const closePopupImage = document.querySelector(selectors.closePopupImage);

const popupFormEdit = popupContainer.querySelector(selectors.popupFormEdit);
const popupFormAdd = document.querySelector(selectors.popupFormAdd);
const popupProfile = document.querySelector(selectors.popupProfile);
const popupPlace = document.querySelector(selectors.popupPlace);
const popupImage = document.querySelector(selectors.popupImage);
const popupPhoto = popupImage.querySelector(selectors.popupPhoto);
const popupPhotoText = popupImage.querySelector(selectors.popupPhotoText);

const nameInput = popupFormEdit.querySelector(selectors.nameInput);
const jobInput = popupFormEdit.querySelector(selectors.jobInput);
const placeTitleInput = document.querySelector(selectors.placeTitleInput);
const placeLinkInput = document.querySelector(selectors.placeLinkInput);

const profileName = document.querySelector(selectors.profileName);
const profileJob = document.querySelector(selectors.profileJob);

const template = document.querySelector(selectors.template).content.querySelector(selectors.place);
const places = document.querySelector(selectors.places);

// функция открытия и закрытия popup

function openPopup(modal) {
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove("popup_opened");
}

// функция редактирования имени профиля

function editInputValue() {
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  editInputValue();
  closePopup(popupProfile);
}

// функция создания начальных карточек

function createCard(card) {
  const {name, link} = card;
  const createPlace = template.cloneNode(true);
  const placeText = createPlace.querySelector(selectors.text);
  const placePhoto = createPlace.querySelector(selectors.photo);
  const likeButton = createPlace.querySelector(selectors.likeButton);
  const deleteButton = createPlace.querySelector(selectors.deleteButton);

  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle("place__like_active");
  });

  deleteButton.addEventListener('click', function() {
    createPlace.remove();
  })

  placeText.textContent = name;
  placePhoto.src = link;
  placePhoto.alt = `Фото ${name}`;

  placePhoto.addEventListener('click', () => {
    popupPhoto.src = link;
    popupPhotoText.textContent = name;
    popupPhoto.alt = `Фото ${name}`;
    openPopup(popupImage);
  });

  places.prepend(createPlace);
} 

function createInitialsCards() {
  initialCards.forEach(createCard);
}

createInitialsCards();



// обработчики событий

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  openPopup(popupProfile)});

addButton.addEventListener('click', () => {
  placeTitleInput.value = "";
  placeLinkInput.value = "";
  openPopup(popupPlace)});

closePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

closePopupPlace.addEventListener('click', () => {
  closePopup(popupPlace);
});

closePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});

popupFormEdit.addEventListener('submit', formSubmitHandler);

popupFormAdd.addEventListener('submit', e => {
  e.preventDefault()
  createCard({
    name: e.target.title.value,
    link: e.target.link.value,
  })
  closePopup(popupPlace);
})