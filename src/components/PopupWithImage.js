import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({popupSelector}) {
        super({popupSelector});
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupPictureText = this._popup.querySelector('.popup__picture-text');

    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupPictureText.textContent = name;
        this._popupImage.alt = name;
        super.open();
    }

}