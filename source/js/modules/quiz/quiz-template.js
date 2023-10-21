const quizTemplate = (props) => {
  return (
    `<div class="swiper-slide choose__slide pd-3-top pd-3-bottom pd-3-left pd-3-right mg-2-bottom">
    <div class="choose__slide-content">
      <p class="choose__food-title title title-3 title-3-caps mg-0-bottom">${props.title}</p>
      <p class="choose__food-description paragraph paragraph-3 paragraph-3-low mg-5-bottom">${props.description}</p>
      <a class="btn choose__food-buy btn--gold paragraph paragraph-3 paragraph-3-caps mg-0-bottom" target="_blank" href="${props.link}" aria-label="Перейти к покупке рациона">Купить рацион</a><a class="choose__button-look btn btn--arrow btn--arrow-right paragraph paragraph-3 paragraph-3-caps" href="https://shop.purina.ru/koshki/suhie-korma/pro-plan/shopby/prn_seria-sterilised-sterilised_kitten" target="_blank" aria-label="Перейти на страницу линейки" data-text="Посмотреть всю линейку"><span>Посмотреть всю линейку</span>
      <span class="btn__arrow btn__arrow--right btn__arrow--default">
      <svg width="8" height="8" aria-hidden="true">
        <use xlink:href="#icon-arrow-right"></use>
      </svg>
    </span>
    <span class="btn__arrow btn__arrow--right btn__arrow--gold">
      <svg width="8" height="8" aria-hidden="true">
        <use xlink:href="#icon-arrow-right-gold"></use>
      </svg>
    </span></a>
    </div>
    <div class="choose__slide-image mg-3-bottom">
      <picture>
        <source type="image/webp" srcset="img/content/choose/result/${props.image}.webp">
        <img src="img/content/choose/result/${props.image}.png" width="210" height="210" alt="Изображение корма">
      </picture>
    </div>
  </div>`
  );
};

export {quizTemplate};
