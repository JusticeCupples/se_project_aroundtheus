export default class Card {
  constructor({ name, link, alt, _id }, cardSelector, handleImageClick, handleDeleteClick) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick; 
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
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

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTextEl = this._cardElement.querySelector(".card__text");

    cardImageEl.setAttribute("src", this._link);
    cardImageEl.setAttribute("alt", this._alt);
    cardTextEl.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}