const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const popup = page.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formElement = page.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__job');

const togglePopup = function () {
  popup.classList.toggle("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

editButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup);

document.addEventListener('keyup', function(evt) {
  if (evt.key === "Escape" && popup.classList.contains("popup_opened")) {
      togglePopup();
  }
})

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);