import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _windowElement = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');_
  _btnClose = document.querySelector('.btn--close-modal');

  constructor(){
    super();
    this._addhandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow(){
    this._overlay.classList.toggle('hidden');
    this._windowElement.classList.toggle('hidden');
  }

  _addhandlerShowWindow(){
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow(){
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addhandlerUpload(handler){
    this._parentElement.addEventListener('submit', function(e){
        e.preventDefault();
        const data = [...new FormData(this)];
        console.log(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
