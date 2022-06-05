const page = document.querySelector('.page');
const editButton = page.querySelector('.btn_type_edit');
const addButton = page.querySelector('.btn_type_add');
const editFormPopup = page.querySelector('.popup_type_edit');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formEdit = page.querySelector('.popup__form_type_edit');
const formAddCard = page.querySelector('.popup__form_type_add-card');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_job');
const placeNameInput = formAddCard.querySelector('.popup__input_type_place-name');
const urlPlaceInput = formAddCard.querySelector('.popup__input_type_url');

function renderList(data) {
  data.forEach(item => renderItem(item));
}

// отрисовка начальных карточек
function renderItem(obj) {
  // карточки
  const cardsListElement = page.querySelector('.cards__list');
  const templateElement = page.querySelector('.card-template').content;
  const listElement = templateElement.cloneNode(true);
  const cardImgElement = listElement.querySelector('.card__img');
  const cardPlaceElement = listElement.querySelector('.card__place');
  const cardLikeElement = listElement.querySelector('.btn_type_like');

  listElement.querySelector('.btn_type_delete').addEventListener('click', deleteCard);

  cardImgElement.src = obj.link;
  cardImgElement.alt = obj.name;
  cardPlaceElement.textContent = obj.name;
  renderCardContainer(cardsListElement, listElement);
  // cardsListElement.prepend(listElement);
  cardImgElement.addEventListener('click', () => openZoomImgPopup(obj));
  cardLikeElement.addEventListener('click', likeCard);
}

// вставка каточек в контейнер
function renderCardContainer(cardsListElement, listElement) {
  return cardsListElement.prepend(listElement);
}

// лайк карточке
function likeCard(evt) {
  evt.target.classList.toggle('btn_type_like-active');
}

// открытие попап редактирования
function openEditPopup() {
  editFormPopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// открытие попап добавления карточки
function openAddCardPopup() {
  const addFormPopup = page.querySelector('.popup_type_new-card');

  formAddCard.reset();
  addFormPopup.classList.add("popup_opened");
}

// открытие попапа просмотра карточки
function openZoomImgPopup(obj) {
  const zoomImgPopup = page.querySelector('.popup_type_zoom-img');
  const popupImgElement = zoomImgPopup.querySelector('.popup__img');
  const popupImgNameElement = zoomImgPopup.querySelector('.popup__img-name');

  zoomImgPopup.classList.add('popup_opened');
  popupImgElement.src = obj.link;
  popupImgElement.alt = obj.name;
  popupImgNameElement.textContent = obj.name;
}

// закрытие попап
function closePopup(evt) {
  const button = evt.target;
  const popupElement = button.closest('.popup');
  popupElement.classList.toggle('popup_opened');
}

// добавление новой карточки
function addCard(evt) {
  evt.preventDefault();

  // TODO тут вызвать функцию добавления карточки в контейнер

  const name = placeNameInput.value;
  const link = urlPlaceInput.value;
  renderItem({name, link});

  closePopup(evt);
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
  closePopup(evt);
}

renderList(initialCards);

editButton.addEventListener('click', openEditPopup)
addButton.addEventListener('click', openAddCardPopup);
document.querySelectorAll('.btn_type_close').forEach((button) => {
  button.addEventListener('click', closePopup);
});
formEdit.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', addCard);