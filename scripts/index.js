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
const imageSelect = document.querySelectorAll("#card-image");
const imageCloseButton = document.querySelector("#modal-close-button");
const modalImage = document.querySelector("#modal-card-image")
const imageFooter = document.querySelector(".modal__image_footer")

//template creator
const addCardFormElement = modalAddCard.querySelector("#add-card-form");
const profileEditForm = profileEditModal.querySelector("#add-profile-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardFormElement.querySelector("#profile-title-input");
const cardUrlInput = addCardFormElement.querySelector("#profile-url-input");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

//open/close function

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}


//render cards

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// card elements function

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTextEl = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector("#card-delete-button");


  cardImageEl.addEventListener("click", () => {
    openModal(imageModal);
    imageFooter.textContent = cardData.name;
    modalImage.setAttribute("src", cardData.link);
    modalImage.setAttribute("alt", cardData.alt);
  });
  

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.alt);
  cardTextEl.textContent = cardData.name;
  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(modalAddCard);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//Form Listeners

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

//edit profile button

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

//Add New Card Button

addNewCardButton.addEventListener("click", () => {
  openModal(modalAddCard);
});

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(modalAddCard)
);

//Image close button

imageCloseButton.addEventListener("click", () => {
  imageModal.classList.remove("modal_opened");
});

//Card Formating
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
