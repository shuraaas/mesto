// импортируем стили
import './index.css';

// константы
import {
  settings,
  buttonEdit,
  buttonAdd,
  profileNameSelector,
  profileJobSelector,
  cardsListSelector,
  formEdit,
  formAddCard,
  placeNameInput,
  urlPlaceInput,
  cardSelector
} from '../utils/constants.js';

// классы
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48/',
  headers: {
    authorization: '1a0fcad2-374c-4a16-bc60-ad5ac7325d61',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({ profileNameSelector, profileJobSelector });

// TODO: тут возможно надо переместить это в другое место
// вставляем имя и описание профиля с сервера при загрузке страницы
api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data);
  })
  .catch(err => console.error(err));

// попапы
const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    api.setUserInfo(data);
    userInfo.setUserInfo(data);
  },
  handleFormPrefill: (inputs) => {
    const values = userInfo.getUserInfo();
    inputs.forEach(input => input.value = values[input.name]);
  }
});

const popupTypeAdd = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: () => {
    addCard();
  }
});

const popupTypeZoom = new PopupWithImage('.popup_type_zoom-img');

// для каждой формы свой экземпляр класса
const formEditValidator = new FormValidator(settings, formEdit);
const formAddCardValidator = new FormValidator(settings, formAddCard);

// создание новой карточки
const createCard = ({ name, link }) => {
  const card = new Card({
    data: { name, link },
    cardSelector: cardSelector,
    handleCardClick: (link, name) => popupTypeZoom.open(link, name)
  });

  return card.generateCard();
}

// рисуем начальные карточки из массива с данными
const cardList = new Section({
  items: api.getInitialCards(),
  renderer: ({ name, link }) => cardList.addItem(createCard({ name, link }))
}, cardsListSelector);

// открытие попап редактирования
const openEditPopup = () => {
  popupTypeEdit.open();
  userInfo.setUserInfo(userInfo.getUserInfo());
}

// открытие попап добавления карточки
const openAddCardPopup = () => {
  formAddCard.reset();
  popupTypeAdd.open();
  formAddCardValidator.validatePopup();
}

// добавление новой карточки
const addCard = () => {
  const name = placeNameInput.value;
  const link = urlPlaceInput.value;

  cardList.addItem(createCard({ name, link }));
  popupTypeAdd.close();
}

// рендерим начальные карточки
cardList.renderItems();

// валидируем формы при загрузке страницы
formEditValidator.enableValidation();
formAddCardValidator.enableValidation();

// Слушатели -----
// добавляем слушатели на попапы
popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeZoom.setEventListeners();
// слушаем кнопки
buttonEdit.addEventListener('click', openEditPopup);
buttonAdd.addEventListener('click', openAddCardPopup);