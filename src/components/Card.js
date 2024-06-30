export default class Card {
  constructor(
    { name, link, alt, _id, likes = [] },
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
    this._handleLikeClick(this._id, !isLiked)
      .then((updatedLikes) => {
        this._likes = updatedLikes;
        this._likeButton.classList.toggle("card__like-button_active");
      })
      .catch((err) => console.error(err));
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

    const userId = this._userInfo.getUserId();
    if (this._likes && this._likes.some((like) => like._id === userId)) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
