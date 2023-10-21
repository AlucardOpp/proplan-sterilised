const chooseSlider = document.querySelector('.choose__quiz-content.swiper');

const initChooseSlider = () => {
  const nextBtn = chooseSlider.querySelector('.choose__pagination-button--next');
  const prevBtn = chooseSlider.querySelector('.choose__pagination-button--prev');

  const mySwiper = new Swiper(chooseSlider, {
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    breakpoints: {
      1024: {
        allowTouchMove: false,
      },
    },
  });

  setTimeout(() => {
    mySwiper.update();
    mySwiper.slideTo(0, 0);
    mySwiper.detachEvents();
  }, 10);

  return mySwiper;
};

export {initChooseSlider};
