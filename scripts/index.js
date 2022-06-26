const page = document.querySelector('.page');
// кнопки
const editButton = page.querySelector('.btn_type_edit');
const addButton = page.querySelector('.btn_type_add');
// попапы
const popupList = page.querySelectorAll('.popup');
const editFormPopup = page.querySelector('.popup_type_edit');
const addFormPopup = page.querySelector('.popup_type_new-card');
const zoomImgPopup = page.querySelector('.popup_type_zoom-img');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');

// контейрер для карточек
const cardsListElement = page.querySelector('.cards__list');

// формы
const formEdit = page.querySelector('.form_type_edit');
const formAddCard = page.querySelector('.form_type_add-card');

const nameInput = formEdit.querySelector('.form__input_type_name');
const jobInput = formEdit.querySelector('.form__input_type_job');
const placeNameInput = formAddCard.querySelector('.form__input_type_place-name');
const urlPlaceInput = formAddCard.querySelector('.form__input_type_url');

// элементы попапа открытия карточек
const popupImgElement = zoomImgPopup.querySelector('.popup__img');
const popupImgNameElement = zoomImgPopup.querySelector('.popup__img-name');




class Card {
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
    this._element.querySelector('.card__img').alt = this._link;
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

  _handleOpenPopup() {
    popupImgElement.src = this._link;
    popupImgElement.alt = this._name;
    popupImgNameElement.textContent = this._name;
    zoomImgPopup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }

  // _handleClosePopup() {
  //   popupImage.src = '';
  //   popupElement.classList.remove('popup_is-opened');
  // }

  // ставим все слушатели на карточку
  _setEventListeners() {
    // this._element.addEventListener('click', () => this._handleOpenPopup());
    // popupCloseButton.addEventListener('click', () => this._handleClosePopup());
    this._element.querySelector('.card__img').addEventListener('click', () => this._handleOpenPopup());
    this._element.querySelector('.btn_type_like').addEventListener('click', () => this._likeCard(this._element));
    this._element.querySelector('.btn_type_delete').addEventListener('click', () => this._deleteCard(this._element));
  }
} // Class CARD



// отрисовка начальных карточек
function renderList(data) {
  data.forEach((item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generateCard();

    // Добавляем в DOM
    renderCardContainer(cardElement);
  });
}

// вставка каточек в контейнер
function renderCardContainer(item) {
  return cardsListElement.prepend(item);
}

// открытие любого попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// закрытие любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// открытие попап редактирования
function openEditPopup() {
  openPopup(editFormPopup);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// открытие попап добавления карточки
function openAddCardPopup() {
  formAddCard.reset();
  openPopup(addFormPopup);
  // при открытии валидируем попап
  validatePopup(addFormPopup, settings);
}

// добавление новой карточки
function addCard(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = urlPlaceInput.value;

  const card = new Card({name, link}, '.card-template');
  const cardElement = card.generateCard();

  renderCardContainer(cardElement);
  closePopup(addFormPopup);
}

// при нажитии кнопки сохранить
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editFormPopup);
}

// закрытие попап по нажатию Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// добавляем изначально 6 карточек
renderList(initialCards);

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddCardPopup);
formEdit.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', addCard);

// закрытие попапа по клику на оверлей и крестик
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    // закрываем при клике на оверлей
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    // закрываем при клике на крестик
    if (evt.target.classList.contains('btn_type_close')) {
      closePopup(popup);
    }
  });
});


// БЫЛО
/*
const page = document.querySelector('.page');
// кнопки
const editButton = page.querySelector('.btn_type_edit');
const addButton = page.querySelector('.btn_type_add');
// попапы
const popupList = page.querySelectorAll('.popup');
const editFormPopup = page.querySelector('.popup_type_edit');
const addFormPopup = page.querySelector('.popup_type_new-card');
const zoomImgPopup = page.querySelector('.popup_type_zoom-img');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');

// контейрер для карточек
const cardsListElement = page.querySelector('.cards__list');

// формы
const formEdit = page.querySelector('.form_type_edit');
const formAddCard = page.querySelector('.form_type_add-card');

const nameInput = formEdit.querySelector('.form__input_type_name');
const jobInput = formEdit.querySelector('.form__input_type_job');
const placeNameInput = formAddCard.querySelector('.form__input_type_place-name');
const urlPlaceInput = formAddCard.querySelector('.form__input_type_url');

// элементы попапа открытия карточек
const popupImgElement = zoomImgPopup.querySelector('.popup__img');
const popupImgNameElement = zoomImgPopup.querySelector('.popup__img-name');

// отрисовка начальных карточек
function renderList(data) {
  data.forEach(item => renderCardContainer(renderCard(item)));
}

// рендерим начальные карточки
function renderCard(obj) {
  const templateElement = page.querySelector('.card-template').content;
  const listElement = templateElement.querySelector('.card').cloneNode(true);
  const cardImgElement = listElement.querySelector('.card__img');
  const cardPlaceElement = listElement.querySelector('.card__place');
  const cardLikeElement = listElement.querySelector('.btn_type_like');

  listElement.querySelector('.btn_type_delete').addEventListener('click', deleteCard);

  cardImgElement.src = obj.link;
  cardImgElement.alt = obj.name;
  cardPlaceElement.textContent = obj.name;
  cardImgElement.addEventListener('click', () => openZoomImgPopup(obj));
  cardLikeElement.addEventListener('click', likeCard);

  return listElement;
}

// вставка каточек в контейнер
function renderCardContainer(item) {
  return cardsListElement.prepend(item);
}

// лайк карточке
function likeCard(evt) {
  evt.target.classList.toggle('btn_type_like-active');
}

// открытие любого попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// закрытие любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// открытие попап редактирования
function openEditPopup() {
  openPopup(editFormPopup);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// открытие попап добавления карточки
function openAddCardPopup() {
  formAddCard.reset();
  openPopup(addFormPopup);
  // при открытии валидируем попап
  validatePopup(addFormPopup, settings);
}

// открытие попапа просмотра карточки
function openZoomImgPopup(obj) {
  openPopup(zoomImgPopup);

  popupImgElement.src = obj.link;
  popupImgElement.alt = obj.name;
  popupImgNameElement.textContent = obj.name;
}

// добавление новой карточки
function addCard(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = urlPlaceInput.value;

  renderCardContainer(renderCard({name, link}));
  closePopup(addFormPopup);
}

// удаление карточки
function deleteCard(evt) {
  const buttonElement = evt.target;
  const cardElement = buttonElement.closest(".card");

  cardElement.remove();
}

// при нажитии кнопки сохранить
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editFormPopup);
}

// закрытие попап по нажатию Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

renderList(initialCards);

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddCardPopup);
formEdit.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', addCard);

// закрытие попапа по клику на оверлей и крестик
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    // закрываем при клике на оверлей
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    // закрываем при клике на крестик
    if (evt.target.classList.contains('btn_type_close')) {
      closePopup(popup);
    }
  });
});
*/