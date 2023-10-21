const rationsSliders = document.querySelectorAll('.rations__swiper');

const initSlider = (slider) => {
  if (slider) {
    const mySwiper = new Swiper(slider, {
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      breakpoints: {
        1024: {
          allowTouchMove: false,
        },
      },
    });
  }
};

const initRationsSlider = () => {
  if (rationsSliders.length) {
    rationsSliders.forEach(initSlider);
  }
};

export {initRationsSlider};
