export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._closeButton = this._popup.querySelector('.modal__close');
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    setEventListeners() {
      this._closeButton.addEventListener('click', () => {
        this.close();
      });
  
      this._popup.addEventListener('mousedown', (event) => {
        if (event.target === this._popup) {
          this.close();
        }
      });
    }
  
    open() {
      this.setEventListeners();
      this._popup.classList.add('modal_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove('modal_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }