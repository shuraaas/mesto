export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._button = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // проверяем, есть ли хоть одино не валидное поле
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // изменяем состояние кнопки
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._button.classList.add(this._settings.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._settings.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  // валидация формы попапа при открытии
  validatePopup() {
    this._toggleButtonState();
    this._inputList.forEach(input => this._hideInputError(input));
  }

  // публичный метод, включает валидацию формы
  enableValidation() {
    this._setEventListeners();
  }
} // class FormValidator