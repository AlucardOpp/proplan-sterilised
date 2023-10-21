const guideSliders = document.querySelectorAll('.guide__swiper');

const initSlider = (slider) => {
  const nextBtn = slider.querySelector('.guide__pagination-button--next');
  const prevBtn = slider.querySelector('.guide__pagination-button--prev');

  if (slider) {
    const mySwiper = new Swiper(slider, {
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        1024: {
          allowTouchMove: false,
        },
      },
    });
  }
};

const initGuideSlider = () => {
  if (guideSliders.length) {
    guideSliders.forEach(initSlider);
  }
};

export {initGuideSlider};
