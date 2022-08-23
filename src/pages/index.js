// импортируем стили
import './index.css';

// константы
import {
  settings,
  apiConfig,
  buttonEdit,
  buttonEditAvatar,
  buttonAdd,
  userData,
  cardsListSelector,
  formEdit,
  formAddCard,
  formEditAvatar,
  placeNameInput,
  urlPlaceInput,
  cardSelector,
  myId
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

const api = new Api(apiConfig);
const userInfo = new UserInfo(userData);

// TODO: тут возможно надо переместить это в другое место
// вставляем имя и описание профиля с сервера при загрузке страницы
api.getUserInfo()
  .then(data => {
    myId.id = data._id;
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

const popupTypeEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (data) => {
    api.changeAvatar(data)
    userInfo.setUserAvatar(data);
  }
});

const popupTypeAdd = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: () => {
    addCard();
  }
});

const popupTypeZoom = new PopupWithImage('.popup_type_zoom-img');
const popupTypeDeleteCard = new PopupWithConfirmation('.popup_type_delete-card');

// для каждой формы свой экземпляр класса
const formEditValidator = new FormValidator(settings, formEdit);
const formAddCardValidator = new FormValidator(settings, formAddCard);
const formEditAvatarValidator = new FormValidator(settings, formEditAvatar);


// создание новой карточки
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
    },
    handleLikeClick: (status, cardId) => status ? api.setLike(cardId) : api.deleteLike(cardId)
  },
  myId);

  return card.generateCard();
};


const promiseCards = api.getInitialCards();

// рисуем начальные карточки из массива с данными
const cardList = new Section({
  items: promiseCards,
  // renderer: ({ name, link, likes,  }) => cardList.addItem(createCard({ name, link, likes }))
  renderer: (data) => cardList.addItem(createCard(data))
}, cardsListSelector);

// открытие попап редактирования
const openEditPopup = () => {
  popupTypeEdit.open();
  userInfo.setUserInfo(userInfo.getUserInfo());
};

const openEditAvatarPopup = () => {
  popupTypeEditAvatar.open();
}

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
formEditAvatarValidator.enableValidation();

// Слушатели -----
// добавляем слушатели на попапы
popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeZoom.setEventListeners();
popupTypeDeleteCard.setEventListeners();
popupTypeEditAvatar.setEventListeners();
// слушаем кнопки
buttonEdit.addEventListener('click', openEditPopup);
buttonEditAvatar.addEventListener('click', openEditAvatarPopup);
buttonAdd.addEventListener('click', openAddCardPopup);