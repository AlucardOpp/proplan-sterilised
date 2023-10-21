const moreLink = document.querySelector('.intro__more');
const navChooseLink = document.querySelector('.main-nav__link--choose');
const videoLinks = document.querySelectorAll('.btn-with-img--video');
const checkListLinks = document.querySelectorAll('.btn-with-img--check-list');
const quizChooseLink = document.querySelector('.choose__button-choose');
const quizLookLink = document.querySelector('.choose__button-look');
const quizNextLink = document.querySelector('.choose__button-next');
const quizResultLink = document.querySelector('.choose__button-result');
const partnersLinks = document.querySelectorAll('.partners__link');
const articlesLinks = document.querySelectorAll('.articles__card');
const loadPdfLinks = document.querySelectorAll('.modal-check-list__download-button');

const onMoreLinkClick = () => {
  moreLink.addEventListener('click', () => {
    dataLayer.push({
      'event': 'customEvent',
      'category': 'ppc_sterilised',
      'action': 'show more button',
      'label': 'click',
    });
  });
};

const onNavChooseLinkClick = () => {
  navChooseLink.addEventListener('click', () => {
    dataLayer.push({
      'event': 'customEvent',
      'category': 'ppc_sterilised',
      'action': 'get_menu_top',
      'label': 'click',
    });
  });
};

const onVideoLinkClick = () => {
  videoLinks.forEach((link) => {
    const label = link.dataset.name;
    link.addEventListener('click', () => {
      dataLayer.push({
        'event': 'customEvent',
        'category': 'ppc_sterilised',
        'action': 'watch advice button',
        'label': label,
      });
    });
  });
};

const onCheckListLinkClick = () => {
  checkListLinks.forEach((link) => {
    const label = link.dataset.name;
    link.addEventListener('click', () => {
      dataLayer.push({
        'event': 'customEvent',
        'category': 'ppc_sterilised',
        'action': 'load checklist button',
        'label': label,
      });
    });
  });
};

const onQuizChooseLinkClick = () => {
  quizChooseLink.addEventListener('click', () => {
    dataLayer.push({
      'event': 'customEvent',
      'category': 'ppc_sterilised',
      'action': 'get_menu',
      'label': 'click',
    });
  });
};

const onQuizLookLinkClick = () => {
  quizLookLink.addEventListener('click', () => {
    dataLayer.push({
      'event': 'customEvent',
      'category': 'ppc_sterilised',
      'action': 'show_all_products',
      'label': 'click',
    });
  });
};

const onQuizNextLinkClick = () => {
  quizNextLink.addEventListener('click', () => {
    if (quizNextLink.classList.contains('show')) {
      dataLayer.push({
        'event': 'customEvent',
        'category': 'ppc_sterilised',
        'action': 'show_result',
        'label': 'click',
      });
    }
  });
};

const onQuizResultLinkClick = () => {
  quizResultLink.addEventListener('click', () => {
    dataLayer.push({
      'event': 'customEvent',
      'category': 'ppc_sterilised',
      'action': 'show_result',
      'label': 'click',
    });
  });
};

const onPartnersLinkClick = () => {
  partnersLinks.forEach((link) => {
    const label = link.dataset.partner;
    link.addEventListener('click', () => {
      dataLayer.push({
        'event': 'customEvent',
        'category': 'ppc_sterilised',
        'action': 'seller_logo',
        'label': label,
      });
    });
  });
};

const onArticlesLinkClick = () => {
  articlesLinks.forEach((link) => {
    const label = link.dataset.article;
    link.addEventListener('click', () => {
      dataLayer.push({
        'event': 'customEvent',
        'category': 'ppc_sterilised',
        'action': 'article',
        'label': label,
      });
    });
  });
};

const onLoadPdfLinkClick = () => {
  loadPdfLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const label = link.dataset.name;
      dataLayer.push({
        'event': 'customEvent',
        'category': 'ppc_sterilised',
        'action': 'load pdf button',
        'label': label,
      });
    });
  });
};

const initGoogleLayer = () => {
  onMoreLinkClick();
  onNavChooseLinkClick();
  onVideoLinkClick();
  onCheckListLinkClick();
  onQuizChooseLinkClick();
  onQuizLookLinkClick();
  onQuizNextLinkClick();
  onQuizResultLinkClick();
  onPartnersLinkClick();
  onArticlesLinkClick();
  onLoadPdfLinkClick();
};

export {initGoogleLayer};
