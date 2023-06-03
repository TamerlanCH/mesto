import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__button').addEventListener('click', (event) => {
            event.preventDefault();
            this._submitCallback();
        });
    }

    setSubmitAction(submitAction) {
        this._submitCallback = submitAction;
    }
}