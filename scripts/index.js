// 6 карточек при открытии страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const page = document.querySelector('.page');
const editButton = page.querySelector('.btn_type_edit');
const addButton = page.querySelector('.btn_type_add');
const editFormPopup = page.querySelector('.popup_type_edit');
const addFormPopup = page.querySelector('.popup_type_new-card');
// const closeButton = document.querySelector('.btn_type_close');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formEdit = page.querySelector('.popup__form_type_edit');
const formAddCard = page.querySelector('.popup__form_type_add-card');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_job');
const placeNameInput = formAddCard.querySelector('.popup__input_type_place-name');
const urlPlaceInput = formAddCard.querySelector('.popup__input_type_url');

// карточки
const cardsListElement = page.querySelector('.cards__list');
const cardsTemplateElement = page.querySelector('.card-template');

function renderList(data) {
  data.forEach(item => renderItem(item));
}

// отрисовка начальных карточек
function renderItem(obj) {
  const templateElement = page.querySelector('.card-template').content;
  const listElement = templateElement.cloneNode(true);
  // const cardElement = listElement.querySelector('.card');
  const cardImgElement = listElement.querySelector('.card__img');
  const cardPlaceElement = listElement.querySelector('.card__place');
  const cardLikeElement = listElement.querySelector('.btn_type_like');

  const deleteButton = listElement.querySelector('.btn_type_delete').addEventListener('click', deleteCard);

  cardImgElement.src = obj.link;
  cardImgElement.alt = obj.name;
  cardPlaceElement.textContent = obj.name;
  cardsListElement.prepend(listElement);
  cardImgElement.addEventListener('click', openZoomImgPopup);

  // лайк на карточке
  cardLikeElement.addEventListener('click', function(evt) {
    evt.target.classList.toggle('btn_type_like-active');
  });
}

// открытие попап редактирования
function openEditPopup() {
  editFormPopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// открытие попап добавления карточки
function openAddCardPopup() {
  placeNameInput.value = '';
  urlPlaceInput.value = '';
  addFormPopup.classList.add("popup_opened");
}

// открытие попапа просмотра карточки
function openZoomImgPopup(evt) {
  const zoomImgPopup = page.querySelector('.popup_type_zoom-img');
  const popupImgElement = zoomImgPopup.querySelector('.popup__img');
  const popupImgNameElement = zoomImgPopup.querySelector('.popup__img-name');

  zoomImgPopup.classList.add('popup_opened');
  popupImgElement.src = evt.target.src;
  popupImgElement.alt = evt.target.alt;
  popupImgNameElement.textContent = evt.target.alt;
}

// закрытие попап
function closePopup(evt) {
  // editFormPopup.classList.remove("popup_opened");
  let button = evt.target;
  let popupElement = button.closest('.popup');
  popupElement.classList.toggle('popup_opened');
}

// добавление новой карточки
function addCard(evt) {
  evt.preventDefault();

  let name = placeNameInput.value;
  let link = urlPlaceInput.value;
  renderItem({name, link});

  closePopup(evt);
}

// удаление карточки
function deleteCard(evt) {
  let buttonElement = evt.target;
  let cardElement = buttonElement.closest(".card");
  cardElement.remove();
}

// при нажитии кнопки сохранить
function formSubmitHandler(evt) {
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
formEdit.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', addCard);