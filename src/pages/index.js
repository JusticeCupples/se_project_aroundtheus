import { validationConfig } from "../utils/constants.js";
import { api } from "../components/Api.js";
import Card from "../components/card.js"; 
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import CustomPopupWithForm from "../components/CustomPopupWithForm.js";
import "./index.css";

// Selectors
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEclipse = document.querySelector(".profile__eclipse");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const isInitialCardsSynced = () => {
  return localStorage.getItem("initialCardsSynced") === "true";
};

const setInitialCardsSynced = () => {
  localStorage.setItem("initialCardsSynced", "true");
};

// Instances
const handleImageClick = (link, alt, name) => {
  imagePopup.open({ link, alt, name });
};

const handleDeleteClick = (cardInstance, cardId) => {
  confirmDeletePopup.open();
  const confirmDeleteButton = document.querySelector("#confirm-delete-button");

  confirmDeleteButton.onclick = () => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardInstance.removeCard();
        confirmDeletePopup.close();
      })
      .catch((err) => console.error(err));
  };
};

const handleLikeClick = (cardId, isLiked) => {
  if (isLiked) {
    return api.likeCard(cardId).then((data) => {
      return { ...data, isLiked: true };
    });
  } else {
    return api.dislikeCard(cardId).then((data) => {
      return { ...data, isLiked: false };
    });
  }
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
      likes: item.likes,
      isLiked: item.isLiked,
    },
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    userInfo
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

const addCardPopup = new CustomPopupWithForm("#modal-add-card", (formData) => {
  addCardPopup.setLoadingState(true);

  api
    .addCard({ name: formData.title, link: formData.url })
    .then((data) => {
      renderCard(data);
      addCardPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      addCardPopup.setLoadingState(false);
    });
});

const avatarPopup = new CustomPopupWithForm("#modal-edit-pfp", (formData) => {
  avatarPopup.setLoadingState(true);

  api
    .updateAvatar({ avatar: formData.url })
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      avatarPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      avatarPopup.setLoadingState(false);
    });
});

avatarPopup.setEventListeners();

profileEclipse.addEventListener("click", () => {
  avatarPopup.open();
});

addCardPopup.setEventListeners();

const editProfilePopup = new CustomPopupWithForm(
  "#modal-edit-profile",
  (formData) => {
    editProfilePopup.setLoadingState(true);

    api
      .updateUserInfo({ name: formData.name, about: formData.description })
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        editProfilePopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        editProfilePopup.setLoadingState(false);
      });
  }
);

editProfilePopup.setEventListeners();

const imagePopup = new PopupWithImage("#modal-image-inspect");
imagePopup.setEventListeners();

const confirmDeletePopup = new Popup("#modal-confirm-delete");
confirmDeletePopup.setEventListeners();

// Instantiate form validators for each modal form
const avatarFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#modal-edit-pfp .modal__form")
);
const editProfileFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#modal-edit-profile .modal__form")
);

avatarFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

// Event Listeners
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  editProfileFormValidator.toggleButtonState();
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

const syncInitialCards = async () => {
  if (isInitialCardsSynced()) {
    console.log("Initial cards are already synced");
    return;
  }

  setInitialCardsSynced();
  console.log("Initial cards synced successfully");
};

const renderInitialCards = async () => {
  try {
    const fetchedCards = await api.getInitialCards();
    cardList.renderItems(fetchedCards);
    console.log("Initial cards rendered successfully");
  } catch (error) {
    console.error("Error rendering initial cards:", error);
  }
};

const initialize = async () => {
  try {
    await syncInitialCards();
    const userData = await api.getUserInfo();
    userInfo.setUserInfo(userData.name, userData.about, userData._id);
    userInfo.setUserAvatar(userData.avatar);
    await renderInitialCards();
    console.log("Initialization complete");
  } catch (error) {
    console.error("Error initializing application:", error);
  }
};

initialize();

// Back to Top button functionality
const backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
