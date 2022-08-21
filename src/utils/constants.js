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

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48/',
  tokenId: '1a0fcad2-374c-4a16-bc60-ad5ac7325d61'
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

// шаблон карточки
const cardSelector = '.card-template';

export {
  settings,
  apiConfig,
  buttonEdit,
  buttonAdd,
  profileNameSelector,
  profileJobSelector,
  cardsListSelector,
  formEdit,
  formAddCard,
  placeNameInput,
  urlPlaceInput,
  page,
  cardSelector
};