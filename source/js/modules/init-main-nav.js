const mainNavToggle = () => {
  const mainNav = document.querySelector('.main-nav');
  const menuBtn = document.querySelector('.main-nav__toggle');
  const body = document.querySelector('body');
  const links = document.querySelectorAll('.main-nav__link');

  if (!mainNav) {
    return;
  }

  const breakpoint = window.matchMedia(`(max-width:1024px)`);
  const breakpointChecker = () => {
    if (!breakpoint.matches) {
      mainNav.classList.remove('active');
    }
  };

  breakpoint.addListener(breakpointChecker);

  const closeMenu = () => {
    if (mainNav.classList.contains('active')) {
      mainNav.classList.toggle('active');
      const scrollbarWidth = document.body.offsetWidth - document.body.clientWidth;

      body.style.overflow = 'auto';
      body.style.paddingRight = scrollbarWidth;
    }
  };

  const initMainNav = () => {
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        if (mainNav.classList.contains('active')) {
          const box = document.querySelector('.wrapper');
          const scrollbarWidth = box.offsetWidth - box.clientWidth;

          body.style.overflow = 'hidden';
          body.style.paddingRight = scrollbarWidth;
        } else {
          const scrollbarWidth = document.body.offsetWidth - document.body.clientWidth;

          body.style.overflow = 'auto';
          body.style.paddingRight = scrollbarWidth;
        }

      });
    }

    if (links) {
      links.forEach((link) => {
        link.addEventListener('click', closeMenu);
      });
    }
  };

  initMainNav();
  breakpointChecker();
};

export { mainNavToggle };
