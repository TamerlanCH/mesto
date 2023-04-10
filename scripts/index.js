
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
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element__item'); //шаблон
const elementContainer = document.querySelector('.element');
const popupView = document.querySelector('.popup_view');
const popupText = document.querySelector('.popup__view-text');
const popupImage = document.querySelector('.popup__image');


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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtonList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener ('click', () => closePopup(popup));
});

//РЕДАКТОР ПРОФИЛЯ
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  changeValue();
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupProfile);
}

formProfile.addEventListener('submit', handleFormSubmit);

//КАРТОЧКИ
addButton.addEventListener('click', () => {
  openPopup(popupCard);
})

const handleLikeCard = (event) => {
  event.target.classList.toggle('element__like_active');
}

const handleDeleteCard = (event) => {
  event.target.closest('.element__item').remove();
}


const createCard = (dataCard) => {
  const newCard = elementTemplate.cloneNode(true);
  const { name, link } = dataCard;
  const titleCard = newCard.querySelector('.element__title');
  const imageCard = newCard.querySelector('.element__image');
  titleCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;

  const likeButton = newCard.querySelector('.element__like');
  likeButton.addEventListener('click', handleLikeCard);

  const deleteButton = newCard.querySelector('.element__delete');
  deleteButton.addEventListener('click', handleDeleteCard);

  imageCard.addEventListener('click', () => {
    openPopup(popupView);

    popupImage.src = imageCard.src;
    popupImage.alt = imageCard.alt;
    popupText.textContent = titleCard.textContent;

  })

  return newCard;
}

const renderCard = (dataCard) => {
  elementContainer.prepend(createCard(dataCard));
}

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

formNewCard.addEventListener('submit', handleSubmitAddCard);


