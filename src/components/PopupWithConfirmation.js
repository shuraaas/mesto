import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._boundSubmitHandler = this._submitHandler.bind(this);
  }

  // TODO: тут разобраться что вообще происходит
  onSubmit(confirmCallback) {
    this._confirmCallback = confirmCallback;
  }

  _submitHandler(e) {
    e.preventDefault();
    this._confirmCallback();
  }

  // добавляем слушатели попапу
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._boundSubmitHandler);
  }
}