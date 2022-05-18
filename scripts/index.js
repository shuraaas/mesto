const page = document.querySelector('.page');
const editButton = page.querySelector('.btn_type_edit');
const popup = page.querySelector('.popup');
const closeButton = popup.querySelector('.btn_type_close');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formElement = page.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

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

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);