export default class Card {
  constructor({ name, link }, templateSelector, handleOpenPopup) {
    this._name = name;
    this._link = link;
    this._handleOpenPopup = handleOpenPopup;
    this._templateSelector = templateSelector;
  }

  // метод, который возвращает разметку карточки из шаблона
  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element__item')
      .cloneNode(true);
    return card;
  }

  // метод, который устанавливает значения для свойств карточки
  _setData() {
    this._cardName = this._newCard.querySelector('.element__title');
    this._cardName.textContent = this._name;

    this._cardImage = this._newCard.querySelector('.element__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null
  }

  //слушатели событий
  _setEventListeners() {
    this._likeButton = this._newCard.querySelector('.element__like');
    this._deleteButton = this._newCard.querySelector('.element__delete');

    //лайк
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    //удаление    
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    //открытие попапа с изображением
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup(this._link, this._name);
    });
  }

  // Публичный метод
  generateCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}