import FormValidator from './FormValidator.js';
import Card from './Card.js';

export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const editButton = document.querySelector('.profile__edit-button');
const closeButtonList = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const formProfile = document.querySelector('.popup__form_profile');
const formNewCard = document.querySelector('.popup__form_card');
const formCardBtn = formNewCard.querySelector('.popup__save');
const addButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const cardInputName = document.querySelector('.popup__input_card_name');
const cardInputLink = document.querySelector('.popup__input_card_link');
const elementContainer = document.querySelector('.element');
const popupView = document.querySelector('.popup_view');
const popupText = document.querySelector('.popup__view-text');
const popupImage = document.querySelector('.popup__image');
const popupElems = document.querySelectorAll('.popup');

//массив
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

function changeValue() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  clearErrors(popup);
}

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const currentOpenedPopup = document.querySelector('.popup_opened');
    closePopup(currentOpenedPopup);
  }
}

popupElems.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (
      event.target.classList.contains('popup__close')
      || event.target.classList.contains('popup_opened')
    ) {
      closePopup(popup);
    }
  });
});

closeButtonList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//РЕДАКТОР ПРОФИЛЯ
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  changeValue();
});

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupProfile);
}

//КАРТОЧКИ
addButton.addEventListener('click', () => {
  formCardBtn.disabled = true;
  formNewCard.reset();
  resetErrors(formNewCard);
  openPopup(popupCard);
})

const handleOpenPopup = (link, name) => {
  openPopup(popupView);
  popupImage.src = link;
  popupText.textContent = name;
  popupText.alt = name;
}

const createCard = (dataCard) => {
  const newCard = new Card(dataCard, '#element-template', handleOpenPopup);
  const cardElement = newCard.generateCard();
  return cardElement
}

const renderCard = (dataCard) => {
  const newCard = createCard(dataCard);
  elementContainer.prepend(newCard);
};

initialCards.forEach((dataCard) => {
  elementContainer.append(createCard(dataCard));
})

const handleSubmitAddCard = (event) => {
  event.preventDefault();
  renderCard({
    name: cardInputName.value,
    link: cardInputLink.value
  });
  formNewCard.reset();
  closePopup(popupCard);
}

function resetErrors(form) {
  const inputs = form.querySelectorAll('.form__input');
  inputs.forEach((input) => {
    hideInputError(form, input, configValidation);
  });
}

function clearErrors(enterPopup) {
  const errors = enterPopup.querySelectorAll("." + configValidation.errorClass);
  errors.forEach((error) => {
    error.classList.remove(configValidation.errorClass);
    error.textContent = "";
  });
  const borders = enterPopup.querySelectorAll("." + configValidation.inputErrorClass);
  borders.forEach((border) => {
    border.classList.remove(configValidation.inputErrorClass);
  });
}

const formNewCardValidator = new FormValidator(configValidation, formNewCard);
const formProfileValidator = new FormValidator(configValidation, formProfile);

formNewCardValidator.enableValidation();
formProfileValidator.enableValidation();

formNewCard.addEventListener('submit', handleSubmitAddCard);
formProfile.addEventListener('submit', handleFormSubmit);

