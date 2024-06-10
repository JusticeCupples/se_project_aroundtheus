class FormValidator {
  constructor(settings, formEl) {
    this.settings = settings;
    this.formEl = formEl;
    this.inputElms = [...formEl.querySelectorAll(settings.inputSelector)];
    this.submitButton = formEl.querySelector(settings.submitButtonSelector);
  }

  _showInputError(inputEl) {
    const errorMessageEl = this.formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this.settings.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this.settings.errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this.formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this.settings.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this.settings.errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButtonState() {
    const foundInvalid = this.inputElms.some(
      (inputEl) => !inputEl.validity.valid
    );

    if (foundInvalid) {
      this.submitButton.classList.add(this.settings.inactiveButtonClass);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(this.settings.inactiveButtonClass);
      this.submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this.inputElms.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.formEl.addEventListener("submit", (e) => e.preventDefault());
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

document.querySelectorAll(config.formSelector).forEach((formEl) => {
  const formValidator = new FormValidator(config, formEl);
  formValidator.enableValidation();
});
