import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, handleFormPrefill }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormPrefill = handleFormPrefill;
    this._boundGetInputValues = this._getInputValues.bind(this);
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._submitBtn = this._popup.querySelector('.btn_type_save');
    this._submitBtnText = this._submitBtn.textContent;
  }

  // метод собирает данные всех полей формы
  _getInputValues() {
    this.inputValues = {};

    this._inputList.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });

    return this.inputValues;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
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

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}