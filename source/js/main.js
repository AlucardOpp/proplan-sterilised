import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {initCustomSelect} from './modules/form/init-custom-select';
import {initFormValidate} from './modules/form/init-form-validate';
import {mainNavToggle} from './modules/init-main-nav';
import {initAccordions} from './modules/init-accordion';
import {initAnimation} from './modules/init-animation';
import {initGuideSlider} from './modules/sliders/init-guide-slider';
import {toggleQuiz, setCheckButtonListener, initResultContent} from './modules/quiz/content-controller';
import {initChooseSlider} from './modules/sliders/init-choose-slider';
import {initTabs} from './modules/tabs/init-tabs';
import {initRationsSlider} from './modules/sliders/init-rations-slider';
import {initArticlesSlider} from './modules/sliders/init-articles-slider';
import {openModalBtnAction} from './modules/open-modal-btn-action';
import {initMoveTo} from './modules/init-move-to';
import {initGoogleLayer} from './modules/init-google-layer';

// ---------------------------------

const map = new Map();

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  mainNavToggle();
  initAccordions();
  initGuideSlider();
  toggleQuiz();
  setCheckButtonListener();
  initResultContent();
  initChooseSlider();
  initTabs();
  initRationsSlider();
  initArticlesSlider();
  openModalBtnAction();
  initAnimation();
  initMoveTo();
  initGoogleLayer();
  initModals();
  initCustomSelect();
  initFormValidate();
  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✔️

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
