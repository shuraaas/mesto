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
  myId,
  newCardId
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

const api = new Api(apiConfig);
const userInfo = new UserInfo(userData);

// попапы
const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    popupTypeEdit.renderLoading(true);
    api.setUserInfo(data)
      .catch(err => console.error(err))
      .finally(() => popupTypeEdit.renderLoading(false));
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
    popupTypeEditAvatar.renderLoading(true);
    api.changeAvatar(data)
      .catch(err => console.error(err))
      .finally(() => popupTypeEditAvatar.renderLoading(false));
    userInfo.setUserAvatar(data);
  }
});

const popupTypeAdd = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: () => {
    addCard();
    // console.log(newCardId)
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
    data: cardData,
    cardSelector: cardSelector,
    handleCardClick: (link, name) => popupTypeZoom.open(link, name),
    handleDeleteClick: (cardId, newCardId) => {

      const currentCardId = cardId || newCardId;

      // console.log(`cardId ${cardId}`)
      // console.log(`newCardId ${newCardId}`)
      // console.log(`currentCardId ${currentCardId}`)

      popupTypeDeleteCard.open();
      popupTypeDeleteCard.onSubmit(() => {


        api.deleteCard(currentCardId)
          .then(() => {
            popupTypeDeleteCard.close();

            // console.log(newCardId)

            card.deleteCard();
          })
          .catch(err => console.error(err));
      });
    },
    handleLikeClick: (status, cardId) => {

      // debugger;

      // console.log('hi')

      // api.getInitialCards().then(data => {
        // data.forEach(item => console.log(item));
      // });

      if (status) {
        api.setLike(cardId)
        // TODO: сюда наверное передать кнопку лайка и менять ее состяние
          .catch(err => console.error(err));
      } else {
        api.deleteLike(cardId)
          .catch(err => console.error(err));
      }
    }
  }, myId, newCardId);

  // console.log(newCardId)

  return card.generateCard();
};

// рисуем начальные карточки из массива с данными
const cardList = new Section({
  items: api.getInitialCards().catch(err => console.error(err)),
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

  popupTypeAdd.renderLoading(true);
  // отправляем карточку на сервер
  api.setNewCard({ name, link })
    // todo: тут сервер возвращает объект с данными новой карточки, тут есть ее ID
    .then(cardData => newCardId.id = cardData._id)
    // .then(cardData => console.log(typeof cardData._id))
    .catch(err => console.error(err))
    .finally(() => popupTypeAdd.renderLoading(false));

  cardList.addItem(createCard({ name, link }));
  popupTypeAdd.close();

  return newCardId;
};

// вставляем имя и описание профиля с сервера при загрузке страницы
api.getUserInfo()
  .then(data => {
    myId.id = data._id;
    userInfo.setUserInfo(data);
  })
  .catch(err => console.error(err));

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