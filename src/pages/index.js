import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css"

// Selectors
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

// Instances
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const addCardPopup = new PopupWithForm("#modal-add-card", (formData) => {
  
});

const editProfilePopup = new PopupWithForm(
  "#modal-edit-profile",
  (formData) => {
    userInfo.setUserInfo(formData.name, formData.description);
    editProfilePopup.close();
  }
);

const imagePopup = new PopupWithImage("#modal-image-inspect");

// Event Listeners
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Form validation setup
document
  .querySelectorAll(validationConfig.formSelector)
  .forEach((formElement) => {
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
  });
