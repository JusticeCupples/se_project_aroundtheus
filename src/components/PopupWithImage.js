import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalImage = this._popup.querySelector(".modal__card_image");
    this._modalFooter = this._popup.querySelector(".modal__image_footer");
  }

  open({ link, alt, name }) {
    this._modalImage.src = link;
    this._modalImage.alt = alt;
    this._modalFooter.textContent = name;
    super.open();
  }
}
