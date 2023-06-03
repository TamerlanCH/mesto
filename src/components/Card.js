class Card {
    constructor(data, myId, templateSelector, handleCardClick, { handleDeleteCard, handleLike }) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._myId = myId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLike = handleLike;
    }

    //получение шаблона
    _getTemplateCard() {
        const card = document
            .querySelector(this._templateSelector)
            .content.querySelector('.element__item')
            .cloneNode(true);

        return card;
    }

    _setData() {

        this._cardName = this._newCard.querySelector('.element__title');
        this._cardName.textContent = this._name;

        this._cardImage = this._newCard.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._cardElementDelete = this._newCard.querySelector('.element__delete');
        if (this._ownerId !== this._myId) {
            this._cardElementDelete.style.display = 'none';
        };

        this._cardElementLikeCounter = this._newCard.querySelector('.element__like-counter');
    }

    //слушатели
    _setEventListeners() {
        //удаление
        this._cardElementDelete = this._newCard.querySelector('.element__delete');
        this._cardElementDelete.addEventListener('click', () => { this._handleDeleteCard(this._cardId); })

        //лайк
        this._likeCard = this._newCard.querySelector('.element__like');
        this._likeCard.addEventListener('click', () => {
            this._handleLike(this.chekLikes())
        })

        //открытие изображения
        this._cardImage.addEventListener('click', () => { this._handleCardClick(this._link, this._name); })
    }

    _delete() {
        this._newCard.remove();
        this._newCard = null;
    }

    getId() {
        return this._cardId;
    }

    removeCard() {
        return this._delete();
    }

    setLikes(likesArray) { 
        this._likes = likesArray; 
        this._cardElementLikeCounter.textContent = this._likes.length; 
        let returnResult = false; 
        if (this._likes.length > 0) {
            for (let i = 0; i < this._likes.length; i++) { 
                if (this._likes[i]._id === this._myId) { 
                    this._likeCard.classList.add('element__like_active'); 
                    returnResult = undefined;
                    break; 
                } else { 
                    this._likeCard.classList.remove('element__like_active'); 
                } 
            }
        } else {
            this._likeCard.classList.remove('element__like_active'); 
        }
        return returnResult; 
    }    

    chekLikes() {
        return this._likeCard.classList.contains('element__like_active')
    }

    //публичный метод
    getView() {
        this._newCard = this._getTemplateCard();
        this._setData();
        this._setEventListeners();
        this.setLikes(this._likes)

        return this._newCard;
    }
}

export default Card;