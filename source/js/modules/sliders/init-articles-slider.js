const sliderBlocks = document.querySelectorAll('.articles__swiper');

const initArticlesSlider = () => {
  if (!sliderBlocks) {
    return;
  }

  sliderBlocks.forEach((sliderBlock) => {
    const sliderContainer = sliderBlock.querySelector('.articles__container');

    const sliderPhoto = new Swiper(sliderContainer, {
      observer: true,

      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 26,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 80,
        },

      },

      navigation: {
        nextEl: '.articles__slider-button--right',
        prevEl: '.articles__slider-button--left',
      },
    });
  });
};

export {initArticlesSlider};
