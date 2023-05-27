import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './constants.js';

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
  changeValue();
  formProfileValidator.removeValidationErrors();
  openPopup(popupProfile);
});

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupProfile);
}

//КАРТОЧКИ
addButton.addEventListener('click', () => {
  formNewCard.reset();
  formNewCardValidator.removeValidationErrors();
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

const formNewCardValidator = new FormValidator(configValidation, formNewCard);
const formProfileValidator = new FormValidator(configValidation, formProfile);

formNewCardValidator.enableValidation();
formProfileValidator.enableValidation();

formNewCard.addEventListener('submit', handleSubmitAddCard);
formProfile.addEventListener('submit', submitEditProfileForm);

