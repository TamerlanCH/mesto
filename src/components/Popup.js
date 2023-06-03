class Popup {
    constructor({ popupSelector }) {
        this._popup = document.querySelector(popupSelector);
        this._popupSave = this._popup.querySelector('.popup__button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (event) => {
            if (
                event.target.classList.contains('popup__close-button')
                || event.target.classList.contains('popup_opened')
            ) {
                this.close();
            }
        });
    }
}

export default Popup;