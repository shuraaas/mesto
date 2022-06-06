const page = document.querySelector('.page');
const editButton = page.querySelector('.btn_type_edit');
const addButton = page.querySelector('.btn_type_add');
// const closeButton = page.querySelectorAll('.btn_type_close');
// console.log(closeButton)

// попапы
const editFormPopup = page.querySelector('.popup_type_edit');
const addFormPopup = page.querySelector('.popup_type_new-card');
const zoomImgPopup = page.querySelector('.popup_type_zoom-img');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formEdit = page.querySelector('.popup__form_type_edit');
const formAddCard = page.querySelector('.popup__form_type_add-card');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_job');
const placeNameInput = formAddCard.querySelector('.popup__input_type_place-name');
const urlPlaceInput = formAddCard.querySelector('.popup__input_type_url');

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
  cardImgElement.addEventListener('click', () => ZoomImgPopup(obj));
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
  const button = popup.target;
  const popupElement = button.closest('.popup');
  popupElement.classList.remove('popup_opened');
  // popup.classList.remove('popup_opened');
}

// открытие попап редактирования
function EditPopup() {
  openPopup(editFormPopup);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// открытие попап добавления карточки
function AddCardPopup() {
  formAddCard.reset();
  openPopup(addFormPopup);
}

// открытие попапа просмотра карточки
function ZoomImgPopup(obj) {
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

editButton.addEventListener('click', EditPopup)
addButton.addEventListener('click', AddCardPopup);
// closeButton.addEventListener('click', (evt) => closePopup(evt));
document.querySelectorAll('.btn_type_close').forEach((button) => {
  button.addEventListener('click', closePopup);
});
formEdit.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', addCard);