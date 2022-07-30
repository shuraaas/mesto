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
  urlPlaceInput
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

// рисуем начальные карточки из массива с данными
const defaultCardList = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
    const card = new Card({
      data: { name, link },
      cardSelector: '.card-template',
      handleCardClick: (link, name) => {
        popupTypeZoom.open(link, name);
      }
    });
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardsListSelector);

// открытие попап редактирования
function openEditPopup() {
  popupTypeEdit.open();
  userInfo.setUserInfo(userInfo.getUserInfo());
}

// открытие попап добавления карточки
function openAddCardPopup() {
  formAddCard.reset();
  popupTypeAdd.open();
  formAddCardValidator.validatePopup();
}

// добавление новой карточки
function addCard() {
  const name = placeNameInput.value;
  const link = urlPlaceInput.value;

  const newCard = new Section({
    items: [{ name, link }],
    renderer: ({ name, link }) => {
      const card = new Card({
        data: { name, link },
        cardSelector: '.card-template',
        handleCardClick: (link, name) => {
          popupTypeZoom.open(link, name);
        }
      });
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
  }, cardsListSelector);
  newCard.renderItems();

  popupTypeAdd.close();
}

// рендерим начальные карточки
defaultCardList.renderItems();

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