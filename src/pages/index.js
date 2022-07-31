// импортируем стили
import './index.css';

// константы
import {
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

const userInfo = new UserInfo({ profileNameSelector, profileJobSelector });

// попапы
const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
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
  items: initialCards,
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