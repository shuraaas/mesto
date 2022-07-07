import {openZoomImgPopup} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // возвращаем разметку карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // генерируем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = `Место: ${this._name}`;
    this._element.querySelector('.card__place').textContent = this._name;
    return this._element;
  }

  // лайк карточке
  _likeCard(card) {
    card.querySelector('.btn_type_like').classList.toggle('btn_type_like-active');
  }

  // удаление карточки
  _deleteCard(card) {
    card.remove();
  }

  // _handleOpenPopup() {
  //   popupImgElement.src = this._link;
  //   popupImgElement.alt = this._name;
  //   popupImgNameElement.textContent = this._name;
  //   zoomImgPopup.classList.add('popup_opened');
  //   document.addEventListener('keydown', closeByEscape);
  // }

  // _handleClosePopup() {
  //   popupImage.src = '';
  //   popupElement.classList.remove('popup_is-opened');
  // }

  // ставим все слушатели на карточку
  _setEventListeners() {
    this._element.querySelector('.card__img').addEventListener('click', () => openZoomImgPopup(this._link, this._name));
    this._element.querySelector('.btn_type_like').addEventListener('click', () => this._likeCard(this._element));
    this._element.querySelector('.btn_type_delete').addEventListener('click', () => this._deleteCard(this._element));
  }
} // Class CARD