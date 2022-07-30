import { page } from '../utils/constants.js';

// класс отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._boundHandleEscClose = this._handleEscClose.bind(this)
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
    page.classList.add('page_no-scroll');
    document.addEventListener('keydown', this._boundHandleEscClose);
  }

  // закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    page.classList.remove('page_no-scroll');
    document.removeEventListener('keydown', this._boundHandleEscClose);
  }

  // добавляем слушатель клика иконке закрытия попапа
  setEventListeners() {
    // закрытие попапа по клику на оверлей и крестик
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