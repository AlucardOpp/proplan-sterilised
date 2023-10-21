// import {getJson} from './api';
import {quizTemplate} from './quiz-template';
import {initChooseSlider} from './../sliders/init-choose-slider';
import {checkNumbers} from './check-numbers';
import data from './data';

const choose = document.querySelector('.choose');
let answers = {
  age: '',
  needs: [],
};

let result = [];
let swiper;

const pushIntoResult = (array) => {
  array.forEach((element) => {
    result.push(element);
  });
};

const renderSlide = (slide) => {
  const chooseSwiperWrapper = choose.querySelector('.choose__swiper-wrapper');
  chooseSwiperWrapper.insertAdjacentHTML('beforeend', quizTemplate(slide));
};

const enableSlider = (arr) => {
  arr.forEach((slide) => {
    renderSlide(slide);
  });
  swiper = initChooseSlider();
  const choosePaginationTotal = choose.querySelector('.choose__pagination-total');
  const sliderPaginationTotal = choose.querySelector('.swiper-pagination-total');
  const chooseRations = choose.querySelector('.choose__rations');
  choosePaginationTotal.textContent = sliderPaginationTotal.textContent;
  chooseRations.textContent = checkNumbers(choosePaginationTotal.textContent);
  const quizFoodBuyLinks = choose.querySelectorAll('.choose__food-buy');
  quizFoodBuyLinks.forEach((link) => {
    link.addEventListener('click', () => {
      dataLayer.push({
        'event': 'customEvent',
        'category': 'ppc_sterilised',
        'action': 'buy_product',
        'label': 'click',
      });
    });
  });
};

const toggleQuiz = () => {
  if (!choose) {
    return;
  }

  const chooseContainer = choose.querySelector('.choose__container');
  const chooseQuiz = choose.querySelector('.choose__quiz');
  const quizContents = choose.querySelectorAll('.choose__quiz-content');
  const quizFirstQuestion = choose.querySelector('.choose__quiz-content--first');
  const showButton = choose.querySelector('.choose__button-choose');
  const hideButton = choose.querySelector('.choose__button-back');
  const nextButton = choose.querySelector('.choose__button-next');
  const resultButton = choose.querySelector('.choose__button-result');
  const inputs = choose.querySelectorAll('input');
  showButton.addEventListener('click', () => {
    chooseContainer.classList.add('is-hide');
    chooseQuiz.classList.add('is-show');
    quizFirstQuestion.classList.add('is-show');
  });
  hideButton.addEventListener('click', () => {
    quizContents.forEach((content) => {
      content.classList.remove('is-show');
    });
    chooseContainer.classList.remove('is-hide');
    chooseQuiz.classList.remove('is-show');
    nextButton.classList.remove('is-active');
    nextButton.classList.remove('show');
    nextButton.classList.remove('next');
    nextButton.textContent = 'следующий вопрос';
    resultButton.classList.remove('is-active');
    inputs.forEach((input) => {
      input.checked = false;
    });
    answers.age = '';
    answers.needs = [];
    result = [];
    if (swiper) {
      const swiperSlides = swiper.slides;
      swiper.destroy();
      if (swiperSlides) {
        swiperSlides.forEach((slide) => {
          slide.remove();
        });
      }
    }
  });
};

const setCheckButtonListener = () => {
  if (!choose) {
    return;
  }

  const radioInputs = choose.querySelectorAll('input[type="radio"]');
  const checkboxInputs = choose.querySelectorAll('input[type="checkbox"');
  const nextButton = choose.querySelector('.choose__button-next');
  const resultButton = choose.querySelector('.choose__button-result');
  const quizFirstQuestion = choose.querySelector('.choose__quiz-content--first');
  const quizSecondQuestion = choose.querySelector('.choose__quiz-content--second');
  const quizResult = choose.querySelector('.choose__quiz-content--result');

  const nextButtonActionNext = () => {
    quizSecondQuestion.classList.add('is-show');
    quizFirstQuestion.classList.remove('is-show');
    radioInputs.forEach((input) => {
      if (input.checked) {
        answers.age = input.id;
      }
    });
  };

  const nextButtonActionResult = () => {
    quizResult.classList.add('is-show');
    quizFirstQuestion.classList.remove('is-show');
    radioInputs.forEach((input) => {
      if (input.checked) {
        answers.age = input.id;
      }
    });

    if (!data) {
      throw new Error('данные не загрузились');
    }

    let lowArray = [];
    let wetArray = [];
    let mainArray = [];
    let mainPromoArray = [];
    let wetPromoArray = [];

    data.forEach((el) => {
      if (el.age === answers.age) {
        if (el.weight <= 400 && !(el.needs === 'wet') && !(el.promo)) {
          lowArray.push(el);
        }

        if (el.needs === 'wet' && !(el.promo)) {
          wetArray.push(el);
        }

        if (el.weight > 400 && !(el.needs === 'wet') && !(el.promo)) {
          mainArray.push(el);
        }

        if (!(el.needs === 'wet') && (el.promo)) {
          mainPromoArray.push(el);
        }

        if ((el.needs === 'wet') && (el.promo)) {
          wetPromoArray.push(el);
        }
      }
    });

    lowArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);
    wetArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);
    mainArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);
    mainPromoArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);
    wetPromoArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);

    pushIntoResult(lowArray);
    pushIntoResult(wetArray);
    pushIntoResult(mainArray);
    pushIntoResult(mainPromoArray);
    pushIntoResult(wetPromoArray);

    enableSlider(result);
  };

  const resultButtonAction = () => {
    quizSecondQuestion.classList.remove('is-show');
    quizResult.classList.add('is-show');

    checkboxInputs.forEach((input) => {
      if (input.checked) {
        answers.needs.push(input.id);
      }
    });

    if (!data) {
      throw new Error('данные не загрузились');
    }

    let lowArray = [];
    let wetArray = [];
    let mainArray = [];
    let mainPromoArray = [];
    let wetPromoArray = [];

    data.forEach((el) => {
      if (answers.needs.some((element) => element === el.needs)) {
        if (el.weight <= 400 && !(el.needs === 'wet') && !(el.promo) && !(el.age === 'kitten') && !(el.age === 'old')) {
          lowArray.push(el);
        }

        if (el.needs === 'wet' && !(el.promo) && !(el.age === 'kitten') && !(el.age === 'old')) {
          wetArray.push(el);
        }

        if (el.weight > 400 && !(el.needs === 'wet') && !(el.promo) && !(el.age === 'kitten') && !(el.age === 'old')) {
          mainArray.push(el);
        }

        if (!(el.needs === 'wet') && (el.promo) && !(el.age === 'kitten') && !(el.age === 'old')) {
          mainPromoArray.push(el);
        }

        if ((el.needs === 'wet') && (el.promo) && !(el.age === 'kitten') && !(el.age === 'old')) {
          wetPromoArray.push(el);
        }
      }
    });

    lowArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);
    wetArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);
    mainArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);
    mainPromoArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);
    wetPromoArray.sort((firstEl, secondEl) => firstEl.weight - secondEl.weight);

    pushIntoResult(lowArray);
    pushIntoResult(wetArray);
    pushIntoResult(mainArray);
    pushIntoResult(mainPromoArray);
    pushIntoResult(wetPromoArray);

    enableSlider(result);
  };

  resultButton.addEventListener('click', resultButtonAction);

  const validateRadioInputs = () => {
    if (!radioInputs) {
      return;
    }

    radioInputs.forEach((input) => {
      input.addEventListener('click', () => {
        if (input.checked) {
          if (!(nextButton.classList.contains('is-active'))) {
            nextButton.classList.add('is-active');
          }
        }
        let checkedInputs = [];
        radioInputs.forEach((inp) => {
          if (inp.checked) {
            checkedInputs.push(1);
          }
        });
        if (!(checkedInputs.find((el) => el === 1))) {
          if ((nextButton.classList.contains('is-active'))) {
            nextButton.classList.remove('is-active');
          }
        }
        if (!(input.id === 'adult')) {
          nextButton.textContent = 'показать результат';
          nextButton.addEventListener('click', nextButtonActionResult);
          nextButton.removeEventListener('click', nextButtonActionNext);
          nextButton.classList.add('show');
          nextButton.classList.remove('next');
        } else {
          nextButton.textContent = 'следующий вопрос';
          nextButton.removeEventListener('click', nextButtonActionResult);
          nextButton.addEventListener('click', nextButtonActionNext);
          nextButton.classList.add('next');
          nextButton.classList.remove('show');
        }
      });
    });
  };

  const validateCheckboxInputs = () => {

    if (!checkboxInputs) {
      return;
    }

    checkboxInputs.forEach((input) => {
      input.addEventListener('click', () => {
        if (input.checked) {
          if (!(resultButton.classList.contains('is-active'))) {
            resultButton.classList.add('is-active');
          }
        }
        let checkedInputs = [];
        checkboxInputs.forEach((inp) => {
          if (inp.checked) {
            checkedInputs.push(1);
          }
        });
        if (!(checkedInputs.find((el) => el === 1))) {
          if ((resultButton.classList.contains('is-active'))) {
            resultButton.classList.remove('is-active');
          }
        }
      });
    });
  };
  validateRadioInputs();
  validateCheckboxInputs();
};

const initResultContent = () => {
  // console.log(food);
  // const setJson = (json) => {
  //   data = json.foods;
  // };
  // getJson(setJson);
};

export {setCheckButtonListener, toggleQuiz, initResultContent};
