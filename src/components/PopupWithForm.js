import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, handleFormPrefill }) {
    // super(popupSelector);
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormPrefill = handleFormPrefill;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
  }

  // метод собирает данные всех полей формы
  _getInputValues() {
    this.inputValues = {};

    this._inputList.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });

    return this.inputValues;
  }

  open() {
    if(this._handleFormPrefill) {
      this._handleFormPrefill(this._inputList);
    }
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}