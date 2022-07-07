import {initialCards, settings} from './values.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const page = document.querySelector('.page');
// кнопки
const buttonEdit = page.querySelector('.btn_type_edit');
const buttonAdd = page.querySelector('.btn_type_add');
// попапы
const popupList = page.querySelectorAll('.popup');
const popupTypeEdit = page.querySelector('.popup_type_edit');
const popupTypeAdd = page.querySelector('.popup_type_new-card');
const popupTypeZoom = page.querySelector('.popup_type_zoom-img');

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

// для каждой формы свой экземпляр класса
const formEditValidator = new FormValidator(settings, formEdit);
const formAddCardValidator = new FormValidator(settings, formAddCard);

// элементы попапа открытия карточек
const popupImgElement = popupTypeZoom.querySelector('.popup__img');
const popupImgNameElement = popupTypeZoom.querySelector('.popup__img-name');


// отрисовка начальных карточек
function renderList(data) {
  data.forEach((item) => renderCardContainer(createCard(item, '.card-template')));
}

// вставка каточек в контейнер
function renderCardContainer(item) {
  return cardsListElement.prepend(item);
}

// создание карточки
function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector);

  return card.generateCard();
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
  openPopup(popupTypeEdit);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// открытие попап добавления карточки
function openAddCardPopup() {
  formAddCard.reset();
  openPopup(popupTypeAdd);
  // при открытии валидируем попап
  formAddCardValidator.validatePopup();
}

// открытие попапа просмотра карточки
export function openZoomImgPopup(link, name) {
  openPopup(popupTypeZoom);

  popupImgElement.src = link;
  popupImgElement.alt = name;
  popupImgNameElement.textContent = name;
}

// добавление новой карточки
function addCard(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = urlPlaceInput.value;

  renderCardContainer(createCard({name, link}, '.card-template'));
  closePopup(popupTypeAdd);
}

// при нажитии кнопки сохранить
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupTypeEdit);
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

// валидируем формы при загрузке страницы
formEditValidator.enableValidation();
formAddCardValidator.enableValidation();
// слушаем кнопки
buttonEdit.addEventListener('click', openEditPopup);
buttonAdd.addEventListener('click', openAddCardPopup);
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