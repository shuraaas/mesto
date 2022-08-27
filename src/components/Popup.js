// класс отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  // закрытие попапа по Escape
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._boundHandleEscClose);
  }

  // закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._boundHandleEscClose);
  }

  // добавляем слушатели попапу
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      // закрываем при клике на оверлей
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      // закрываем при клике на крестик
      if (evt.target.classList.contains('btn_type_close')) {
        this.close();
      }
    });
  }
}