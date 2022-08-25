export default class Card {
  constructor({
    data,
    cardSelector,
    handleCardClick, // обрабатываем клик по картинке
    handleDeleteClick, // обрабатываем клик по иконке удаления
    handleLikeClick // обрабатываем клик по лайку
  }, myId, newCardId ) {

    // console.log(newCardId)

    this.data = data;

    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes ? data.likes : 0;
    this._myId = myId.id;
    this._newCardId = newCardId;
    // console.log(this._newCardId)

    this._cardId = data._id;
    this._cardOwnerId = data.owner ? data.owner._id : null;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector('.card__img');
    this._cardLikeElement = this._element.querySelector('.btn_type_like');
    this._cardDescriptionElement = this._element.querySelector('.card__place');
    this._cardLikesCounterElement = this._element.querySelector('.card__like-counter');
    this._cardDeleteBtnElement = this._element.querySelector('.btn_type_delete');
  }

  _checkCardOwner() {
    if (this._cardOwnerId) {
      if (this._cardOwnerId != this._myId) {
        this._cardDeleteBtnElement.classList.add('btn_hidden');
      }
    }
  }

  // проверяем перед отрисовкой карточки наличие моего лайка
  _checkMyLikes() {
    if (this._likes.length > 0) { // если у карточки есть хотя бы один лайк
      this._likes.forEach(item => { // проходимся по массиву объектов лайков это карточки
        if (item._id === this._myId) { // если id лайка мой, меняем кнопку на активную
          this._cardLikeElement.classList.add('btn_type_like-active');
        }
      });
    }

    // если условие не прошло, возвращаемся
    return;
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
    this._checkCardOwner();
    this._checkMyLikes();
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = `Место: ${this._name}`;
    this._cardDescriptionElement.textContent = this._name;
    this._cardLikesCounterElement.textContent = this._likes.length > 0 ? this._likes.length : '';
    return this._element;
  }

  // лайк карточке
  _likeCard(cardId) {
    const count = Number(this._cardLikesCounterElement.textContent);

    // если вообще накаких лайков нет
    if (!this._cardLikesCounterElement.textContent) {
      // пока ставим в текст 1 и меняем иконку на активную
      this._cardLikesCounterElement.textContent = '1';
      this._cardLikesCounterElement.textContent = count + 1;


      if (!cardId) {
        // console.log(this._newCardId.id)
        this._handleLikeClick(true, this._newCardId.id, this._cardLikeElement);
      } else {
        this._handleLikeClick(true, this._cardId, this._cardLikeElement);
      }

      // если есть мой лайк есть
    } else if (this._cardLikeElement.classList.contains('btn_type_like-active')) {
      // меняем иконку на неактивную

      if (!cardId) {
        this._handleLikeClick(false, this._newCardId.id, this._cardLikeElement);
      } else {
        this._handleLikeClick(false, this._cardId, this._cardLikeElement);
      }


      // если стотит только 1 лайк, проверяем
      this._cardLikesCounterElement.textContent = count - 1 > 0 ? count - 1 : '';

      // если лайки есть, плюсуем к ним свой
    } else {
      this._cardLikesCounterElement.textContent = count + 1;

      if (!cardId) {
        this._handleLikeClick(true, this._newCardId.id, this._cardLikeElement);
      } else {
        this._handleLikeClick(true, this._cardId, this._cardLikeElement);
      }

    }
  }

  // удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // ставим все слушатели на карточку
  _setEventListeners() {
    this._cardImageElement.addEventListener('click', () => this._handleCardClick(this._link, this._name));
    this._cardLikeElement.addEventListener('click', () => this._likeCard(this._cardId));
    this._cardDeleteBtnElement.addEventListener('click', () => this._handleDeleteClick(this._cardId, this._newCardId.id));
  }
} // Class CARD