import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submitCallback}) {
        super({popupSelector});
        
        this._popupForm = popupSelector.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._submitCallback = submitCallback;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }


    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitCallback(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}