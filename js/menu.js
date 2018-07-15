/**
 * @namespace Menu
 */

(function () {
  var menuButton = document.querySelector('.page-header__menu-button');
  var navElement = document.querySelector('.main-nav');

  var deleteListeners = function () {
    document.removeEventListener('keydown', menuEscCloseListener);
    document.removeEventListener('mousedown', menuClickCloseListener);
  };

  var closeMenu = function () {
    navElement.classList.remove('main-nav--opened');
    deleteListeners();
  };

  var menuClickCloseListener = function (evt) {
    if (!evt.target.classList.contains('main-nav__link') && !evt.target.classList.contains('page-header__menu-button')){
      closeMenu();
    }
  };

  var menuEscCloseListener = function (evt) {
    if (evt.keyCode === 27) {
      closeMenu();
    }
  };

  menuButton.addEventListener('click', function () {
    if (navElement.classList.contains('main-nav--opened')) {
      navElement.classList.remove('main-nav--opened');
    } else {
      navElement.classList.add('main-nav--opened');
    }
    document.addEventListener('keydown', menuEscCloseListener);
    document.addEventListener('mousedown', menuClickCloseListener);
  });
})();
