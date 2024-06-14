import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "A picture of Yosemite Valley",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "A picture of Lake Louise",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "A picture of the Bald Mountians",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "A picture of Latemar",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "A picture of the Vanoise National Park",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "A picture of Lago di Braies",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
//all modals
const modals = document.querySelectorAll(".modal");

//add card modal
const addNewCardButton = document.querySelector(".profile__add-button");
const modalAddCard = document.querySelector("#modal-add-card");
const addCardModalCloseButton = modalAddCard.querySelector(".modal__close");


// edit modal
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#modal-edit-profile");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// image modal
const imageModal = document.querySelector("#modal-image-inspect");
const imageCloseButton = document.querySelector("#modal-close-button");
const modalImage = document.querySelector("#modal-card-image");
const imageFooter = document.querySelector(".modal__image_footer");

//template creator
const addCardFormElement = modalAddCard.querySelector("#add-card-form");
const profileEditForm = profileEditModal.querySelector("#add-profile-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardFormElement.querySelector("#profile-title-input");
const cardUrlInput = addCardFormElement.querySelector("#profile-url-input");

// Validation configuration
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
const createCard = (cardData) => { 
  const card = new Card(cardData, "#card-template", openImageModal);
  return card.getView();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", () => {
      });
      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// UserInfo instance
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

// Popup instances
const editProfilePopup = new PopupWithForm("#modal-edit-profile", (formData) => {
  console.log(formData);
});

const addCardPopup = new PopupWithForm("#modal-add-card", (formData) => {
  // Handle form submission here
  console.log(formData);
});

const imagePopup = new PopupWithImage("#modal-image-inspect");

//open/close function

function openModal(popup) {
  popup.open();
}
function closeModal(popup) {
  popup.close();
}


function openImageModal(link, alt, name) {
  modalImage.setAttribute("src", link);
  modalImage.setAttribute("alt", alt);
  imageFooter.textContent = name;
  openModal(imageModal);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

function renderCardElement(cardElement, cardListEl) {
  cardListEl.appendChild(cardElement);
}

function closeModalOnEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Function to enable validation for each form
function enableFormValidation(formEl) {
  const formValidator = new FormValidator(validationConfig, formEl);
  formValidator.enableValidation();
  formEl.formValidator = formValidator;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function clearCardInputValues() {
  cardTitleInput.value = "";
  cardUrlInput.value = "";
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit() {
  const name = document.querySelector("#profile-title-input").value;
  const link = document.querySelector("#profile-url-input").value;
  const newCard = createCard({ name, link });
  cardSection.addItem(newCard);
  addCardPopup.close();
}

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formValidator = profileEditForm.formValidator;

  // Form Validation

  if (formValidator) {
    formValidator.inputElms.forEach((inputEl) => {
      formValidator._checkInputValidity(inputEl);
    });

    formValidator._toggleButtonState();
  }

  handleProfileEditSubmit(e);
});

// Edit profile modal button

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
  const formValidator = profileEditForm.formValidator;
  if (formValidator) {
    formValidator.resetValidation();
  }
});

// Close edit profile modal button
profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

// Close add card modal button
addCardModalCloseButton.addEventListener("click", () => {
  closeModal(modalAddCard);
});

// Add New Card Button
addNewCardButton.addEventListener("click", () => {
  clearCardInputValues();
  openModal(modalAddCard);
  const formValidator = addCardFormElement.formValidator;
  if (formValidator) {
    formValidator.resetValidation();
  }
});

// Close add card modal button
addCardModalCloseButton.addEventListener("click", () => {
  closeModal(modalAddCard);
});

// Apply validation to all forms
document.querySelectorAll(validationConfig.formSelector).forEach((formEl) => {
  const formValidator = new FormValidator(validationConfig, formEl);
  formValidator.enableValidation();
  formEl.formValidator = formValidator;
});
//Image close button

imageCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});
