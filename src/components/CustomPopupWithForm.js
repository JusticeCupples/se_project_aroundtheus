import PopupWithForm from "./PopupWithForm.js";

export default class CustomPopupWithForm extends PopupWithForm {
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
