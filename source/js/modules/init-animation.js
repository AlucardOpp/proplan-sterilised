/* data-animate-height="n", где n = [0, 100]
   определяет в какой части экрана будет появляться элемент
   n = 0 -- блок достиг верхней части экрана
   n = 50 -- по дефолту. центр экрана
   n = 100 -- блок достиг нижней части экрана*/

const screens = [...document.querySelectorAll('[data-animate]')];
const VP767 = window.matchMedia('(max-width:767px)');

let elTop;
let windowHeight;

const returnAnimatePoint = (el) => {
  elTop = el.getBoundingClientRect().top;
  windowHeight = window.innerHeight;
  const offsetHeight = el.dataset.animateHeight && !VP767.matches
    ? el.dataset.animateHeight
    : 50;

  return windowHeight / (100 / offsetHeight) - elTop;
};

const trackingScreenBlock = () => {
  screens.forEach((screen) => {
    if (returnAnimatePoint(screen) > 0 && !screen.classList.contains('show')) {
      screen.classList.add('show');
    }
  });
};

const initAnimation = () => {
  if (screens.length) {
    trackingScreenBlock();
    window.addEventListener('scroll', trackingScreenBlock);
    window.addEventListener('orientationchange', trackingScreenBlock);
  }
};

export {initAnimation};
