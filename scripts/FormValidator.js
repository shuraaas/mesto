export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

  _hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      this._hideInputError(formElement, inputElement, settings);
    }
  }

  _setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonList = Array.from(document.querySelectorAll(settings.submitButtonSelector));

    this._toggleButtonState(inputList, buttonList, settings);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, settings);
        this._toggleButtonState(inputList, buttonList, settings);
      });
    });
  }

  // проверяем, есть ли хоть одино не валидное поле
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonList, settings) {
    if(this._hasInvalidInput(inputList)) {
      buttonList.forEach((buttonElement) => {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
      });
    } else {
      buttonList.forEach((buttonElement) => {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
      });
    }
  }

  // валидация открытого попапа
  validatePopup(popup, settings) {
    const inputList = Array.from(popup.querySelectorAll(settings.inputSelector));
    const buttonList = Array.from(popup.querySelectorAll(settings.submitButtonSelector));

    this._toggleButtonState(inputList, buttonList, settings);
  }

  // публичный метод, включает валидацию формы
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._settings.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });

      const fieldset = formElement.querySelector('.form__content');
      this._setEventListeners(fieldset, this._settings);
    });
  }
} // class FormValidator



/*
const settings = {
  // селектор класса формы
  formSelector: '.form',
  // селектор поля ввода формы
  inputSelector: '.form__input',
  // селектор кнопки отправки формы
  submitButtonSelector: '.btn_type_save',
  // класс неактивной кнопки
  inactiveButtonClass: 'btn_inactive',
  // класс ошибки поля ввода
  inputErrorClass: 'form__input_type_error',
  // класс подсказки ошибки
  errorClass: 'form__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonList = Array.from(document.querySelectorAll(settings.submitButtonSelector));

  toggleButtonState(inputList, buttonList, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonList, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });

    const fieldset = formElement.querySelector('.form__content');
    setEventListeners(fieldset, settings);
  });
}

// проверяем, есть ли хоть одино не валидное поле
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonList, settings) => {
  if(hasInvalidInput(inputList)) {
    buttonList.forEach((buttonElement) => {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    });
  } else {
    buttonList.forEach((buttonElement) => {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    });
  }
};

// валидация открытого попапа
const validatePopup = (popup, settings) => {
  const inputList = Array.from(popup.querySelectorAll(settings.inputSelector));
  const buttonList = Array.from(popup.querySelectorAll(settings.submitButtonSelector));

  toggleButtonState(inputList, buttonList, settings);
}

enableValidation(settings);
*/