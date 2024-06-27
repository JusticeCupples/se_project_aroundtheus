export default class Card {
  constructor({ name, link, alt }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._link, this._alt, this._name);
      });
  }

  _handleDeleteCard() {
    const confirmDeleteButton = document.querySelector("#confirm-delete-button");
  
    confirmDeleteButton.onclick = () => {
      this._cardElement.remove();
      this._cardElement = null;
      document.querySelector("#modal-confirm-delete").classList.remove("modal_open");
    };
    document.querySelector("#modal-confirm-delete").classList.add("modal_open");
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
