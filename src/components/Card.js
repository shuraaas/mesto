export default class Card {
  constructor({ data, cardSelector, handleCardClick, handleDeleteClick} ) {

    // console.log(data)

    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;

    // console.log(data.likes)

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector('.card__img');
    this._cardDescriptionElement = this._element.querySelector('.card__place');
    this._cardLikesCounterElement = this._element.querySelector('.card__like-counter');

    // console.log(this._cardLikesCounterElement)
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
    this._setEventListeners();
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = `Место: ${this._name}`;
    this._cardDescriptionElement.textContent = this._name;

    // console.log(this._likes);

    if (this._likes) {
      this._cardLikesCounterElement.textContent = this._likes.length;
    } else {
      this._cardLikesCounterElement.textContent = '';
    }

    // this._cardLikesCounterElement.textContent = this._likes.length > 0 ? this._likes.length : '';
    // this._cardLikesCounterElement.textContent = this._likes.length ? this._likes.length : '';
    return this._element;
  }

  // лайк карточке
  _likeCard(card) {
    // const count = Number(this._cardLikesCounterElement.textContent);
    // const cardLikeBtn = card.querySelector('.btn_type_like');

    // // если лайков нет
    // if (!this._cardLikesCounterElement.textContent) {

    //   // пока ставим в текст 1 и меняем иконку на активную
    //   this._cardLikesCounterElement.textContent = '1';
    //   this._cardLikesCounterElement.textContent = count + 1;
    //   cardLikeBtn.classList.add('btn_type_like-active');

    //   // если лайк есть
    // } else if (cardLikeBtn.classList.contains('btn_type_like-active')) {

    //   // меняем иконку на неактивную
    //   cardLikeBtn.classList.remove('btn_type_like-active');

    //   // если стотит только 1 лайк, проверяем
    //   if (count - 1 > 0) {
    //     this._cardLikesCounterElement.textContent = count - 1;
    //   } else {
    //     this._cardLikesCounterElement.textContent = '';
    //   }

    //   // если лайки есть, плюсуем к ним свой
    // } else {

    //   this._cardLikesCounterElement.textContent = count + 1;
    //   cardLikeBtn.classList.add('btn_type_like-active');

    // }
  }

  // удаление карточки
  _deleteCard(card) {
    card.remove();
    card = null;
  }

  // ставим все слушатели на карточку
  _setEventListeners() {
    this._element.querySelector('.card__img').addEventListener('click', () => this._handleCardClick(this._link, this._name));
    this._element.querySelector('.btn_type_like').addEventListener('click', () => this._likeCard(this._element));
    // this._element.querySelector('.btn_type_delete').addEventListener('click', () => this._deleteCard(this._element));
    this._element.querySelector('.btn_type_delete').addEventListener('click', () => this._handleDeleteClick(this._element));
  }
} // Class CARD