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
  buttonEdit: '.profile__edit-button',
  buttonAdd: '.profile__add-button',
  closePopupProfileButton: '.popup__close_type_edit',
  closePopupPlaceButton: '.popup__close_type_add',
  closePopupImageButton: '.popup__close_type_img',
  popupProfileForm: '.popup_type_edit .popup__form',
  popupProfilePlace: '.popup_type_new-card .popup__form',
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
  deleteButton: '.place__delete',
  popupWindow: '.popup'
}

// объявление переменных

const buttonEdit = document.querySelector(selectors.buttonEdit);
const buttonAdd = document.querySelector(selectors.buttonAdd);

const closePopupProfileButton = document.querySelector(selectors.closePopupProfileButton);
const closePopupPlaceButton = document.querySelector(selectors.closePopupPlaceButton);
const closePopupImageButton = document.querySelector(selectors.closePopupImageButton);

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

const templateCard = document.querySelector(selectors.template).content.querySelector(selectors.place);
const places = document.querySelector(selectors.places);

// функция открытия и закрытия popup

const handleEscUp = (evt) => {
   if (evt.key === 'Escape') {
    closePopup(popupProfile);
    closePopup(popupPlace);
    closePopup(popupImage);
  }
};

function openPopup(modal) {
  document.addEventListener('keydown', handleEscUp);
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  document.removeEventListener('keydown', handleEscUp);
  modal.classList.remove("popup_opened");
}

// функция редактирования имени профиля

function fillProfileFromInputs() {
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
}

function submitHandlerProfileForm(evt) {
  evt.preventDefault();
  fillProfileFromInputs();
  closePopup(popupProfile);
}

// функция создания начальных карточек

function createCard(card) {
  const {name, link} = card;
  const createPlace = templateCard.cloneNode(true);
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

  return createPlace;
} 

function addCard (data, container) {
  const newCard = createCard(data);
  container.prepend(newCard);
}

function createInitialsCards() {
  initialCards.forEach(item => addCard(item, places));
}

createInitialsCards();


// обработчики событий

  buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  openPopup(popupProfile)});

  buttonAdd.addEventListener('click', () => {
  popupProfilePlace.reset();
  openPopup(popupPlace)});

  closePopupProfileButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

closePopupPlaceButton.addEventListener('click', () => {
  closePopup(popupPlace);
});

closePopupImageButton.addEventListener('click', () => {
  closePopup(popupImage);
});

popupProfileForm.addEventListener('submit', submitHandlerProfileForm);

popupProfilePlace.addEventListener('submit', evt => {
  evt.preventDefault()
  addCard({
    name: evt.target.title.value,
    link: evt.target.link.value,
  }, places)
  closePopup(popupPlace);
});

  popupWindow.forEach(function (popupWindow) {
    popupWindow.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        closePopup(popupWindow);
      }
    });
  });


