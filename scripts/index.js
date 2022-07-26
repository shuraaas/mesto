import { initialCards, settings } from './values.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';

// const testForm = new PopupWithForm('.popup_type_edit');
// console.log(testForm);
// testForm.setEventListeners();

const page = document.querySelector('.page');
// кнопки
const buttonEdit = page.querySelector('.btn_type_edit');
const buttonAdd = page.querySelector('.btn_type_add');

// попапы
// const popupTypeEdit = new Popup('.popup_type_edit');
const popupTypeEdit = new PopupWithForm(
  '.popup_type_edit',
  (obj) => {
    console.log(obj);
    // const data = {
    //   name: place,
    //   link: link
    // };
  }
);

// console.log(popupTypeEdit);
popupTypeEdit.setEventListeners();


// const popupTypeAdd = new PopupWithForm('.popup_type_new-card');

const popupTypeAdd = new PopupWithForm(
  '.popup_type_new-card',
  (obj) => {
    // console.log(this);
    addCard();
  }
);

// console.log(popupTypeAdd);
popupTypeAdd.setEventListeners();


const popupTypeZoom = new PopupWithImage('.popup_type_zoom-img');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');

// контейрер для карточек
const cardsListSelector = '.cards__list';

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
// const popupImgElement = popupTypeZoom.querySelector('.popup__img');
// const popupImgNameElement = popupTypeZoom.querySelector('.popup__img-name');

// рисуем начальные карточки из массива с данными
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardsListSelector);

// открытие попап редактирования
function openEditPopup() {
  popupTypeEdit.open();

  // nameInput.value = profileName.textContent;
  // jobInput.value = profileJob.textContent;
}

// открытие попап добавления карточки
function openAddCardPopup() {
  formAddCard.reset();
  popupTypeAdd.open();
  formAddCardValidator.validatePopup();
}

// открытие попапа просмотра карточки
export function openZoomImgPopup(link, name) {
  popupTypeZoom.open(link, name);
}

// добавление новой карточки
function addCard() {
  // evt.preventDefault();

  const name = placeNameInput.value;
  const link = urlPlaceInput.value;

  const newCard = new Section({
    items: [{ name, link }],
    renderer: (item) => {
      const card = new Card(item, '.card-template');
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
  }, cardsListSelector);
  newCard.renderItems();

  popupTypeAdd.close();
}

// при нажитии кнопки сохранить
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // profileName.textContent = nameInput.value;
  // profileJob.textContent = jobInput.value;

  popupTypeEdit.close();
}




// рендерим начальные карточки
defaultCardList.renderItems();

// добавляем слушатели на попапы
// popupTypeEdit.setEventListeners();
// popupTypeAdd.setEventListeners();
popupTypeZoom.setEventListeners();

// валидируем формы при загрузке страницы
formEditValidator.enableValidation();
formAddCardValidator.enableValidation();

// слушаем кнопки
buttonEdit.addEventListener('click', openEditPopup);
buttonAdd.addEventListener('click', openAddCardPopup);
// formEdit.addEventListener('submit', handleProfileFormSubmit);
// formAddCard.addEventListener('submit', addCard);