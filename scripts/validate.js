const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(configValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configValidation.errorClass);
};

const hideInputError = (formElement, inputElement, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configValidation.inputErrorClass);
    errorElement.classList.remove(configValidation.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, configValidation) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
    } else {
        hideInputError(formElement, inputElement, configValidation);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
};

function clearErrors(enterPopup) {
    const errors = enterPopup.querySelectorAll("." + configValidation.errorClass);
    errors.forEach((error) => {
        error.classList.remove(configValidation.errorClass);
        error.textContent = "";
    });
    const borders = enterPopup.querySelectorAll("." + configValidation.inputErrorClass);
    borders.forEach((border) => {
        border.classList.remove(configValidation.inputErrorClass);
    });
}

const setEventListeners = (formElement, configValidation) => {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, configValidation);

            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (configValidation) => {
    const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, configValidation);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});