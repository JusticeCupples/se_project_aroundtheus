export default class Card {
  constructor({ name, link, alt }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    alert("You Did IT");
  }

  getView() {
    // get the card view
    // set event listeners
    this._setEventListeners();
    // return the card
  }
}
