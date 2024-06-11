export default class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
    this.inputElms = [...this._formEl.querySelectorAll(settings.inputSelector)];
    this.submitButton = this._formEl.querySelector(
      settings.submitButtonSelector
    );
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._settings.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButtonState() {
    const foundInvalid = this._checkFormValidity();

    if (foundInvalid) {
      this.submitButton.classList.add(this._settings.inactiveButtonClass);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(this._settings.inactiveButtonClass);
      this.submitButton.disabled = false;
    }
  }

  _checkFormValidity() {
    return this.inputElms.some((inputEl) => !this._checkInputValidity(inputEl));
  }

  _checkInputValidity(inputEl) {
    return inputEl.validity.valid;
  }

  _setEventListeners() {
    this.inputElms.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this.inputElms.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._toggleButtonState();
  }
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
