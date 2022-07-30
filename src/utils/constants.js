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

// Объект настроек формы
const settings = {
  // селектор класса формы
  formSelector: '.form',
  // селектор поля ввода формы
  inputSelector: '.form__input',
  // селектор кнопки отправки формы
  submitButtonSelector: '.btn_type_save',
  // класс неактивной кнопки
  inactiveButtonClass: 'btn_inactive',
  // класс ошибки поля ввода
  inputErrorClass: 'form__input_type_error',
  // класс подсказки ошибки
  errorClass: 'form__input-error_active'
};

const page = document.querySelector('.page');
// кнопки
const buttonEdit = page.querySelector('.btn_type_edit');
const buttonAdd = page.querySelector('.btn_type_add');

const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';

// контейрер для карточек
const cardsListSelector = '.cards__list';

// формы
const formEdit = page.querySelector('.form_type_edit');
const formAddCard = page.querySelector('.form_type_add-card');

const placeNameInput = formAddCard.querySelector('.form__input_type_place-name');
const urlPlaceInput = formAddCard.querySelector('.form__input_type_url');

export {
  initialCards,
  settings,
  buttonEdit,
  buttonAdd,
  profileNameSelector,
  profileJobSelector,
  cardsListSelector,
  formEdit,
  formAddCard,
  placeNameInput,
  urlPlaceInput
};