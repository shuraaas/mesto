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
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Popup from '../components/Popup.js';

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

const myId = {id: ''};

api.getUserInfo()
.then(data => {
    myId.id = data._id;

    // console.log(data._id)

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

// const popupTypeZoom = new PopupWithImage('.popup_type_zoom-img');
const popupTypeZoom = new PopupWithImage({
  popupSelector: '.popup_type_zoom-img'
});

const popupTypeDeleteCard = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-card'
});


// для каждой формы свой экземпляр класса
const formEditValidator = new FormValidator(settings, formEdit);
const formAddCardValidator = new FormValidator(settings, formAddCard);


// создание новой карточки
// const createCard = ({ name, link, likes, myId, cardOwnerId }) => {
const createCard = (cardData) => {
  const card = new Card({
    // data: { name, link, likes, myId, cardOwnerId },
    data: cardData,
    cardSelector: cardSelector,
    handleCardClick: (link, name) => popupTypeZoom.open(link, name),
    handleDeleteClick: (cardId) => {
      popupTypeDeleteCard.open();


      popupTypeDeleteCard.onSubmit(() => {
        // popupTypeDeleteCard.togglePreloaderOnSubmit(true);

        api.deleteCard(cardId)
          .then(() => {
            popupTypeDeleteCard.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(err);
          });
          // .finally(() => {
          //   confirmationModal.togglePreloaderOnSubmit(false)
          // });
      });

      // popupTypeDeleteCard.onSubmit(() => console.log('qwe'));

      // popupTypeDeleteCard.setCardId(cardId);
      // popupTypeDeleteCard.deleteCard(cardId);
      // console.log(`cardId: ${currentCardId.id}`);
    }
  },
  myId);

  return card.generateCard();
};


const promiseCards = api.getInitialCards();
// console.log(promiseCards)

// рисуем начальные карточки из массива с данными
const cardList = new Section({
  // items: api.getInitialCards(),
  items: promiseCards,
  // renderer: ({ name, link, likes,  }) => cardList.addItem(createCard({ name, link, likes }))
  renderer: (data) => cardList.addItem(createCard(data))
}, cardsListSelector);

// открытие попап редактирования
const openEditPopup = () => {
  popupTypeEdit.open();
  userInfo.setUserInfo(userInfo.getUserInfo());
};

// открытие попап добавления карточки
const openAddCardPopup = () => {
  formAddCard.reset();
  popupTypeAdd.open();
  formAddCardValidator.validatePopup();
};

// добавление новой карточки
const addCard = () => {
  const name = placeNameInput.value;
  const link = urlPlaceInput.value;

  // отправляем карточку на сервер
  api.setNewCard({ name, link });

  // cardList.addItem(createCard({ name, link, likes }));
  cardList.addItem(createCard({ name, link }));
  popupTypeAdd.close();
};

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
popupTypeDeleteCard.setEventListeners();
// слушаем кнопки
buttonEdit.addEventListener('click', openEditPopup);
buttonAdd.addEventListener('click', openAddCardPopup);