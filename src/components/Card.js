class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    

    //получение карточки
    _getTemplateCard() {
        const card = document
            .querySelector(this._templateSelector)
            .content.querySelector('.element__item')
            .cloneNode(true);

        return card;
    }

    //удаление
    _handleDelete() {
        this._newCard.remove();
        this._newCard = null;
    }

    //лайк
    _handerLikeCard() {
        this._likeCard.classList.toggle('element__like_active');
    }

    _setData() {
        this._cardName = this._newCard.querySelector('.element__title');
        this._cardName.textContent = this._name;

        this._cardImage = this._newCard.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
    }



    //слушатели
    _setEventListeners() {

        //удаление
        this._deleteCard = this._newCard.querySelector('.element__delete');
        this._deleteCard.addEventListener('click', () => { this._handleDelete(); })

        //лайк
        this._likeCard = this._newCard.querySelector('.element__like');
        this._likeCard.addEventListener('click', () => { this._handerLikeCard(); })

        //открытие изображения
        this._cardImage.addEventListener('click', () => { this._handleCardClick(this._link, this._name); })

    }

    //публичный метод
    getView() {
        this._newCard = this._getTemplateCard();
        this._setData();
        this._setEventListeners();

        return this._newCard;
    }

}

export default Card;