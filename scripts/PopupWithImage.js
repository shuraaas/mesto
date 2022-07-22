import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, ) {
    super(popupSelector);
    this._popupImgElement = this._popup.querySelector('.popup__img');
    this._popupImgNameElement = this._popup.querySelector('.popup__img-name');
  }

  open(link, name) {
    // вызываем родительский метод
    super.open();

    // вставляем название и ссылку в попап
    this._popupImgElement.src = link;
    this._popupImgElement.alt = name;
    this._popupImgNameElement.textContent = name;
  }
}