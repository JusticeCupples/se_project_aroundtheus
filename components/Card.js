export default class Card {
  constructor({ name, link, alt }, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // ".card__like-button"
    const likeButton = this._cardElement.querySelector(".card__like-button");
    console.log(likeButton);
    // "#card-delete-button"
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // get the card view
    // set event listeners
    this._setEventListeners();
    // return the card
  }
}
