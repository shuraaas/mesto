export default class Card {
  constructor({
    data,
    cardSelector,
    handleCardClick, // обрабатываем клик по картинке
    handleDeleteClick, // обрабатываем клик по иконке удаления
    handleLikeClick // обрабатываем клик по лайку
  }, myId ) {
    this.data = data;
    this._name = data.name;
    this._link = data.link;
    this.likes = data.likes ? data.likes : 0;
    this._myId = myId.id;
    this._cardId = data._id;
    this._cardOwnerId = data.owner ? data.owner._id : null;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector('.card__img');
    this._cardLikeButton = this._element.querySelector('.btn_type_like');
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

  getId() {
    return this._cardId;
  }

  // проверяем стоит ли наш лайк на карточке
  getStatus() {
    return this.likes.some(item => item._id === this._myId);
  }

  // проверяем перед отрисовкой карточки наличие моего лайка
  _checkMyLikes() {
    if (this.likes.length > 0) { // если у карточки есть хотя бы один лайк
      this.likes.forEach(item => { // проходимся по массиву объектов лайков это карточки
        if (item._id === this._myId) { // если id лайка мой, меняем кнопку на активную
          this._cardLikeButton.classList.add('btn_type_like-active');
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
    this._cardLikesCounterElement.textContent = this.likes.length > 0 ? this.likes.length : '';
    return this._element;
  }

  _checkActiveLike(element) {
    if (element.classList.contains('btn_type_like-active')) return true;
    return false;
  }

  // лайк карточке
  updateLikes(card) {
    this.likes = card.likes;
    this._cardLikeButton.classList.toggle('btn_type_like-active');
    this._cardLikesCounterElement.textContent = card.likes.length || '';
  }

  // удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // ставим все слушатели на карточку
  _setEventListeners() {
    this._cardImageElement.addEventListener('click', () => this._handleCardClick(this._link, this._name));
    this._cardLikeButton.addEventListener('click', () => this._handleLikeClick(this));
    this._cardDeleteBtnElement.addEventListener('click', () => this._handleDeleteClick(this));
  }
} // Class CARD