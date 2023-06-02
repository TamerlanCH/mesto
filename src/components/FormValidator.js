
class FormValidator {

    constructor(formElement, configValidation) {
        this._configValidation = configValidation;
        this._formElement = formElement;

    }

    //показать элемент ошибки
    _showInputError = (inputElement, errorMessage) => {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._configValidation.inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._configValidation.errorClass);
    };

    //скрывает элемент ошибки
    _hideInputError = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._configValidation.inputErrorClass);
        this._errorElement.classList.remove(this._configValidation.errorClass);
        this._errorElement.textContent = '';
    };

    //проверить валидность
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.disabled = false;
        }
    };

    //добавление обработчиков
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._configValidation.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._configValidation.submitButtonSelector);

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);

                this._toggleButtonState();
            });
        });
    }

    resetValidation() {
        this._toggleButtonState();
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
        });
  
      }

    enableValidation() {
        this._setEventListeners();
    }

}

export default FormValidator;