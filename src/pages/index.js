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
  cardSelector,
  myId,
  formValidators
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
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupTypeEdit.close();
      })
      .catch(err => console.error(err))
      .finally(() => popupTypeEdit.renderLoading(false));
  }
});

const popupTypeEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (data) => {
    popupTypeEditAvatar.renderLoading(true);
    api.changeAvatar(data)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupTypeEditAvatar.close();
      })
      .catch(err => console.error(err))
      .finally(() => popupTypeEditAvatar.renderLoading(false));
  }
});

const popupTypeAdd = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (data) => {
    const cardInfo = {
      name: data['place-name'],
      link: data.url
    }

    popupTypeAdd.renderLoading(true);
    // отправляем карточку на сервер
    api.setNewCard(cardInfo)
      .then(cardData => {
        popupTypeAdd.close();
        cardList.addItem(createCard(cardData));
      })
      .catch(err => console.error(err))
      .finally(() => popupTypeAdd.renderLoading(false));
  }
});

const popupTypeZoom = new PopupWithImage('.popup_type_zoom-img');
const popupTypeDeleteCard = new PopupWithConfirmation('.popup_type_delete-card');

// создание новой карточки
const createCard = (cardData) => {
  const card = new Card({
    data: cardData,
    cardSelector: cardSelector,
    handleCardClick: (link, name) => popupTypeZoom.open(link, name),
    handleDeleteClick: (card) => {
      popupTypeDeleteCard.open();
      popupTypeDeleteCard.setSubmitHandler(() => {
        api.deleteCard(card.getId())
          .then(() => {
            popupTypeDeleteCard.close();
            card.deleteCard();
          })
          .catch(err => console.error(err));
      });
    },
    handleLikeClick: (card) => {
      api.likeCard(card.getId(), card.getStatus())
        .then((res) => card.updateLikes(res))
        .catch(err => console.error(err));
    }
  }, myId);

  return card.generateCard();
};

// рисуем начальные карточки из массива с данными
const cardList = new Section({
  renderer: (cardData) => cardList.addItem(createCard(cardData))
}, cardsListSelector);

// открытие попап редактирования
const openEditPopup = () => {
  formValidators['edit-profile'].validatePopup();
  popupTypeEdit.setInputValues(userInfo.getUserInfo());
  popupTypeEdit.open();
};

const openEditAvatarPopup = () => {
  formValidators['edit-avatar'].validatePopup();
  popupTypeEditAvatar.open();
};

// открытие попап добавления карточки
const openAddCardPopup = () => {
  formValidators['new-place'].validatePopup();
  popupTypeAdd.open();
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Включение валидации
enableValidation(settings);

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