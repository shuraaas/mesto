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

const page = document.querySelector('.page');
const editButton = page.querySelector('.btn_type_edit');
const addButton = page.querySelector('.btn_type_add');
const editFormPopup = page.querySelector('.popup_type_edit');
const addFormPopup = page.querySelector('.popup_type_new-card');
// const closeButton = document.querySelector('.btn_type_close');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formElement = page.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

// карточки
const cardsListElement = page.querySelector('.cards__list');
const cardsTemplateElement = page.querySelector('.card-template');

function renderList(data) {
  data.forEach(item => renderItem(item));
}

// отрисовка начальных карточек
function renderItem(obj) {
  const templateElement = page.querySelector('.card-template').content;
  const listElement = templateElement.cloneNode(true);
  const cardImgElement = listElement.querySelector('.card__img');
  const cardPlaceElement = listElement.querySelector('.card__place');
  cardImgElement.src = obj.link;
  cardImgElement.alt = obj.name;
  cardPlaceElement.textContent = obj.name;
  cardsListElement.append(listElement);
}

// открытие попап
function openPopup(evt) {
  let a = evt.target.classList;
  // if (a === '')
  console.log(a);
  editFormPopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// закрытие попап
function closePopup(evt) {
  // editFormPopup.classList.remove("popup_opened");
  let button = evt.target;
  let popupElement = button.closest('.popup');
  popupElement.classList.toggle('popup_opened');
}

// добавление новой карточки
function addCard(evt) {
  // console.log(popupElement);
}

// при нажитии кнопки сохранить
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

renderList(initialCards);

// editButton.addEventListener('click', openPopup)
// addButton.addEventListener('click', openPopup);
editButton.addEventListener('click', (evt) => {
  editFormPopup.classList.toggle('popup_opened');
});
addButton.addEventListener('click', (evt) => {
  addFormPopup.classList.toggle('popup_opened');
});
// closeButton.addEventListener('click', closePopup);
document.querySelectorAll('.btn_type_close').forEach((button) => {
  button.addEventListener('click', closePopup);
});
formElement.addEventListener('submit', formSubmitHandler);