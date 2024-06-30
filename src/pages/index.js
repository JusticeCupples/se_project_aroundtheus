import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { validationConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { api } from "../components/Api.js";
import { initialCards } from "../utils/constants.js";
import "./index.css";

// Selectors
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEclipse = document.querySelector(".profile__eclipse");

// Instances
const handleImageClick = (link, alt, name) => {
  imagePopup.open({ link, alt, name });
};

const handleDeleteClick = (cardInstance, cardId) => {
  const confirmDeleteModal = document.querySelector("#modal-confirm-delete");
  const confirmDeleteButton = confirmDeleteModal.querySelector("#confirm-delete-button");

  confirmDeleteModal.classList.add("modal_opened");

  const closeModal = () => {
    confirmDeleteModal.classList.remove("modal_opened");
  };

  confirmDeleteButton.onclick = () => {
    api.deleteCard(cardId)
      .then(() => {
        cardInstance.removeCard();
        closeModal();
      })
      .catch(err => console.error(err));
  };

  const closeButton = confirmDeleteModal.querySelector(".modal__close-button");
  closeButton.onclick = closeModal;
};

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: "#profile-image",
});

const renderCard = (item) => {
  const card = new Card(
    { 
      name: item.name, 
      link: item.link, 
      alt: item.alt,
      _id: item._id, 
      likes: item.likes 
    }, 
    "#card-template", 
    handleImageClick, 
    handleDeleteClick
  );
  const cardElement = card.getView();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: [],
    renderer: renderCard,
  },
  ".cards__list"
);

// Extend PopupWithForm for loading state handling
class CustomPopupWithForm extends PopupWithForm {
  setLoadingState(isLoading) {
    const saveButton = this._popup.querySelector(".modal__button");

    if (isLoading) {
      saveButton.textContent = "Saving...";
      saveButton.disabled = true;
    } else {
      saveButton.textContent = "Save";
      saveButton.disabled = false;
    }
  }
}

const addCardPopup = new CustomPopupWithForm("#modal-add-card", (formData) => {
  // Update button text and disable it
  addCardPopup.setLoadingState(true);

  api.addCard({ name: formData.title, link: formData.url })
    .then(data => {
      renderCard(data);
      addCardPopup.close();
    })
    .catch(err => console.error(err))
    .finally(() => {
      // Reset button text and enable it
      addCardPopup.setLoadingState(false);
    });
});

const editPfpPopup = new CustomPopupWithForm("#modal-edit-pfp", (formData) => {
  // Update button text and disable it
  editPfpPopup.setLoadingState(true);

  api.updateAvatar({ avatar: formData.url })
    .then(data => {
      userInfo.setUserAvatar(data.avatar);
      editPfpPopup.close();
    })
    .catch(err => console.error(err))
    .finally(() => {
      // Reset button text and enable it
      editPfpPopup.setLoadingState(false);
    });
});

editPfpPopup.setEventListeners();

profileEclipse.addEventListener("click", () => {
  editPfpPopup.open();
});

addCardPopup.setEventListeners();

const editProfilePopup = new CustomPopupWithForm(
  "#modal-edit-profile",
  (formData) => {
    // Update button text and disable it
    editProfilePopup.setLoadingState(true);

    api.updateUserInfo({ name: formData.name, about: formData.description })
      .then(data => {
        userInfo.setUserInfo(data.name, data.about);
        editProfilePopup.close();
      })
      .catch(err => console.error(err))
      .finally(() => {
        // Reset button text and enable it
        editProfilePopup.setLoadingState(false);
      });
  }
);

editProfilePopup.setEventListeners();

const imagePopup = new PopupWithImage("#modal-image-inspect");
imagePopup.setEventListeners();

const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");

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

document
  .querySelectorAll(validationConfig.formSelector)
  .forEach((formElement) => {
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
  });

// Fetch initial data
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, fetchedCards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    
    initialCards.forEach(card => renderCard(card));

    fetchedCards.forEach(card => renderCard(card));
  });