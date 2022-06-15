const page = document.querySelector('.page');
// кнопки
const editButton = page.querySelector('.btn_type_edit');
const addButton = page.querySelector('.btn_type_add');
// попапы
const popupList = page.querySelectorAll('.popup');
const editFormPopup = page.querySelector('.popup_type_edit');
const addFormPopup = page.querySelector('.popup_type_new-card');
const zoomImgPopup = page.querySelector('.popup_type_zoom-img');
// кнопки закрытия
const editFormCloseButton = editFormPopup.querySelector('.btn_type_close');
const addFormCloseButton = addFormPopup.querySelector('.btn_type_close');
const zoomImgCloseButton = zoomImgPopup.querySelector('.btn_type_close');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');

// формы
const formEdit = page.querySelector('.form_type_edit');
const formAddCard = page.querySelector('.form_type_add-card');
// const formButton = page.querySelector('.btn_type_save');
// console.log(formButton);
// console.log(formEdit);
// console.log(formAddCard);

const nameInput = formEdit.querySelector('.form__input_type_name');
const jobInput = formEdit.querySelector('.form__input_type_job');
const placeNameInput = formAddCard.querySelector('.form__input_type_place-name');
const urlPlaceInput = formAddCard.querySelector('.form__input_type_url');

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
  const cardsListElement = page.querySelector('.cards__list');

  return cardsListElement.prepend(item);
}

// лайк карточке
function likeCard(evt) {
  evt.target.classList.toggle('btn_type_like-active');
}

// открытие любого попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// закрытие любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
}

// открытие попапа просмотра карточки
function openZoomImgPopup(obj) {
  openPopup(zoomImgPopup);

  const popupImgElement = zoomImgPopup.querySelector('.popup__img');
  const popupImgNameElement = zoomImgPopup.querySelector('.popup__img-name');

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

renderList(initialCards);

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddCardPopup);
editFormCloseButton.addEventListener('click', () => closePopup(editFormPopup));
addFormCloseButton.addEventListener('click', () => closePopup(addFormPopup));
zoomImgCloseButton.addEventListener('click', () => closePopup(zoomImgPopup));
formEdit.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', addCard);
// закрытие попапа по клику на оверлей
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  });
});