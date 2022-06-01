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
const popup = page.querySelector('.popup');
const closeButton = popup.querySelector('.btn_type_close');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formElement = page.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

// карточки
const cardsListElement = page.querySelector('.cards__list');
const cardsTemplateElement = page.querySelector('.card-template');
// console.log(cardsTemplateElement);

function renderList(data) {
  data.forEach(item => renderItem(item));
}

function renderItem(obj) {
  // console.log("obj", obj.name);
  const templateElement = page.querySelector('.card-template').content;
  const listElement = templateElement.cloneNode(true);
  // console.log('as', listElement);
  const cardImgElement = listElement.querySelector('.card__img');
  const cardPlaceElement = listElement.querySelector('.card__place');
  cardImgElement.src = obj.link;
  cardImgElement.alt = obj.name;
  cardPlaceElement.textContent = obj.name;
  // console.log('as', cardImgElement);
  cardsListElement.append(listElement);
}

// открытие попап
function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// закрытие попап
function closePopup() {
  popup.classList.remove("popup_opened");
}

// при нажитии кнопки сохранить
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

renderList(initialCards);

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);