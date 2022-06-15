const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.btn_type_save',
  inactiveButtonClass: 'btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonList = Array.from(document.querySelectorAll(config.submitButtonSelector));

  toggleButtonState(inputList, buttonList);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonList);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });

    const fieldset = formElement.querySelector('.form__content');
    setEventListeners(fieldset);
  });
}

// проверяем, есть ли хоть одино не валидное поле
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonList) => {

  if(hasInvalidInput(inputList)) {
    buttonList.forEach((buttonElement) => {
      buttonElement.classList.add(config.inactiveButtonClass);
    });
  } else {
    buttonList.forEach((buttonElement) => {
      buttonElement.classList.remove(config.inactiveButtonClass);
    });
  }
};

enableValidation();