import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Card from "../components/Card.js";

// Selectors
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEclipse = document.querySelector(".profile__eclipse");

// Instances

const handleImageClick = (link, alt, name) => {
  imagePopup.open({ link, alt, name });
};

const handleDeleteClick = (cardInstance) => {
  const confirmDeleteModal = document.querySelector("#modal-confirm-delete");
  const confirmDeleteButton = confirmDeleteModal.querySelector("#confirm-delete-button");

  confirmDeleteModal.classList.add("modal_opened");

  const closeModal = () => {
    confirmDeleteModal.classList.remove("modal_opened");
  };

  confirmDeleteButton.onclick = () => {
    cardInstance.removeCard();
    closeModal();
  };


  const closeButton = confirmDeleteModal.querySelector(".modal__close-button");
  closeButton.onclick = closeModal;
};

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const renderCard = (item) => {
  const card = new Card(item, "#card-template", handleImageClick, handleDeleteClick);
  const cardElement = card.getView();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: initialCards.reverse(),
    renderer: renderCard,
  },
  ".cards__list"
);

cardList.renderItems();

const addCardPopup = new PopupWithForm("#modal-add-card", (formData) => {
  renderCard({ name: formData.title, link: formData.url, alt: formData.title });
  addCardPopup.close();
});

const pfpEditButton = document.querySelector(".pfp__edit-button");

const editPfpPopup = new PopupWithForm("#modal-edit-pfp", (formData) => {
  document.querySelector(".profile__image").src = formData.url;
  editPfpPopup.close();
});

editPfpPopup.setEventListeners();

pfpEditButton.addEventListener("click", () => {
  editPfpPopup.open();
});

addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#modal-edit-profile",
  (formData) => {
    userInfo.setUserInfo(formData.name, formData.description);
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

const imagePopup = new PopupWithImage("#modal-image-inspect");
imagePopup.setEventListeners();

const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Event Listeners
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  editProfilePopup.open();
});

const addCardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#modal-add-card .modal__form")
);
addCardFormValidator.enableValidation();

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardPopup.open();
});

profileEclipse.addEventListener("click", () => {
  editPfpPopup.open();
});

// Form validation setup
document
  .querySelectorAll(validationConfig.formSelector)
  .forEach((formElement) => {
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
  });