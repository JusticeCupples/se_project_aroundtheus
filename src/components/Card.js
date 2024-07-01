export default class Card {
  constructor(
    { name, link, alt, _id, likes = [], isLiked = false },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    userInfo
  ) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._id = _id;
    this._likes = likes;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userInfo = userInfo;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this, this._id);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._link, this._alt, this._name);
      });
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _toggleLike() {
    const isLiked = this._likeButton.classList.contains(
      "card__like-button_active"
    );
    console.log(`Toggling like for card with ID: ${this._id}`);
    this._handleLikeClick(this._id, !isLiked)
      .then((updatedCard) => {
        console.log("Updated Card:", updatedCard);
        if (updatedCard && typeof updatedCard.isLiked !== "undefined") {
          this._isLiked = updatedCard.isLiked;
          this._likeButton.classList.toggle(
            "card__like-button_active",
            this._isLiked
          );
        } else {
          console.error("isLiked field not found in response");
        }
      })
      .catch((err) => {
        console.error("Error in _toggleLike:", err.status, err.data);
      });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTextEl = this._cardElement.querySelector(".card__text");
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    cardImageEl.setAttribute("src", this._link);
    cardImageEl.setAttribute("alt", this._alt);
    cardTextEl.textContent = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
