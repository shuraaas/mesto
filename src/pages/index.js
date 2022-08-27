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

// получаем инфу пользователя и начальные карточки одновременно,
// чтобы корректно отображались лайки и кнопка удаления
const promiseUserInfo = api.getUserInfo();
const promiseInitialCards = api.getInitialCards();

Promise.all([promiseUserInfo, promiseInitialCards])
  .then(([userData, cards]) => {
    // вставляем имя и описание профиля с сервера при загрузке страницы
    myId.id = userData._id;
    userInfo.setUserInfo(userData);
    // отрисовка начальных карточек
    cardList.renderItems(cards);
  })
  .catch(err => console.error(err));

// попапы
const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    popupTypeEdit.renderLoading(true);
    api.setUserInfo(data)
      .then(() => popupTypeEdit.close())
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
      .then(() => popupTypeEditAvatar.close())
      .catch(err => console.error(err))
      .finally(() => popupTypeEditAvatar.renderLoading(false));
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
    data: cardData,
    cardSelector: cardSelector,
    handleCardClick: (link, name) => popupTypeZoom.open(link, name),
    handleDeleteClick: (cardId, newCardId) => {
      const currentCardId = cardId || newCardId;

      popupTypeDeleteCard.open();
      popupTypeDeleteCard.onSubmit(() => {
        api.deleteCard(currentCardId)
          .then(() => {
            popupTypeDeleteCard.close();
            card.deleteCard();
          })
          .catch(err => console.error(err));
      });
    },
    handleLikeClick: (status, cardId, cardLikeElement, cardLikesCounterElement) => {
      if (status) {
        api.setLike(cardId)
          .then((card) => {
            cardLikeElement.classList.add('btn_type_like-active');
            cardLikesCounterElement.textContent = card.likes.length;
          })
          .catch(err => console.error(err));
      } else {
        api.deleteLike(cardId)
          .then((card) => {
            cardLikeElement.classList.remove('btn_type_like-active');
            cardLikesCounterElement.textContent = card.likes.length || '';
          })
          .catch(err => console.error(err));
      }
    }
  }, myId, newCardId);

  return card.generateCard();
};

// рисуем начальные карточки из массива с данными
const cardList = new Section({
  renderer: (cardData) => cardList.addItem(createCard(cardData))
}, cardsListSelector);

// открытие попап редактирования
const openEditPopup = () => {
  formEditValidator.validatePopup();
  popupTypeEdit.open();
  userInfo.setUserInfo(userInfo.getUserInfo());
};

const openEditAvatarPopup = () => {
  formEditAvatarValidator.validatePopup();
  popupTypeEditAvatar.open();
};

// открытие попап добавления карточки
const openAddCardPopup = () => {
  formAddCardValidator.validatePopup();
  formAddCard.reset();
  popupTypeAdd.open();
};

// добавление новой карточки
const addCard = () => {
  const name = placeNameInput.value;
  const link = urlPlaceInput.value;

  popupTypeAdd.renderLoading(true);
  // отправляем карточку на сервер
  api.setNewCard({ name, link })
    // todo: тут сервер возвращает объект с данными новой карточки, тут есть ее ID
    .then(cardData => {
      newCardId.id = cardData._id;
      popupTypeAdd.close();
    })
    .catch(err => console.error(err))
    .finally(() => popupTypeAdd.renderLoading(false));

  cardList.addItem(createCard({ name, link }));

  return newCardId;
};

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