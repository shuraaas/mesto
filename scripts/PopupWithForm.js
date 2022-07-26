import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    // this._buttonFormSubmit = this._popup.querySelector('.btn_type_save');
    this._inputList = this._popup.querySelectorAll('.form__input');
  }

  // метод собирает данные всех полей формы
  _getInputValues() {
    this.inputValues = {};

    this._inputList.forEach((input) => {
      // this.inputValues[input.id] = input.value;
      this.inputValues[input.name] = input.value;
    });

    // console.log(this.inputValues);

    return this.inputValues;
  }

  close() {
    // вызываем родительский метод
    super.close();
    // сбрасываем форму
    this._form.reset();
  }

  setEventListeners() {
    // вызываем родительский метод
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      // console.log('sdsd')
      // TODO: превент дефолт возможно вешается дважды
      evt.preventDefault();
      // console.log(this._getInputValues())
      this._handleFormSubmit(this._getInputValues());
    });
  }
}