/**
 * Функция переопределяет стандартную валидацию браузера для всех форм на странице.
 * @param {string} formSelector - селектор класса формы
 * @param {string} inputSelector - селектор поля ввода формы
 * @param {string} submitButtonSelector - селектор кнопки отправки формы
 * @param {string} inactiveButtonClass - класс неактивной кнопки
 * @param {string} inputErrClass - класс для ошибки поля ввода
 * @param {string} errClass - класс для подсказки ошибки
 */
 const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrClass,
  errClass,
}) => {
  const hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid);

  /**
   * Функция меняет состояние кнопки отправки формы в зависимости от валидности полей ввода
   * @param {HTMLInputElement[]} inputList
   * @param {HTMLButtonElement} button
   */
  const toggleStateButton = (inputList, button) => {
    if (hasInvalidInput(inputList)) {
      button.classList.add(inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(inactiveButtonClass);
      button.disabled = false;
    }
  };

  /**
   * @param {HTMLFormElement} formElement
   * @param {HTMLInputElement} inputElement
   * @param {string} error
   */
  const showInputError = (formElement, inputElement, error) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrClass);
    errorElement.textContent = error;
    errorElement.classList.add(errClass);
  };

  /**
   * Функция скрытия ошибки поля ввода
   * @param {HTMLFormElement} formElement
   * @param {HTMLInputElement} inputElement
   */
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrClass);
    errorElement.classList.remove(errClass);
    errorElement.textContent = '';
  };

  /**
   * Функция проверяет поле ввода на валидность
   * В зависимости от результата показывает или скрывает ошибку
   * @param {HTMLFormElement} formElement
   * @param {HTMLInputElement} inputElement
   */
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  /**
   * Функция задает начальное состояние кнопки submit и устанавливает слушатели на поля ввода
   * @param {HTMLFormElement} formElement
   */
  const setListeners = formElement => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleStateButton(inputList, buttonElement);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleStateButton(inputList, buttonElement);
      });
    });
  };

  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(formElement => {
    setListeners(formElement);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrClass: 'popup__input_type_error',
  errClass: 'popup__error_visible',
});