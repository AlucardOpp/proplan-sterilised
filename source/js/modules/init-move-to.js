import {MoveTo} from '../vendor/moveTo';

// const breakpointSM = window.matchMedia('(max-width: 767px)');

const calcHeaderHeight = () => {
  const header = document.querySelector('.header');

  if (header) {
    let headerOffset = Number(header.offsetHeight);

    const ro = new ResizeObserver(() => {
      headerOffset = Number(header.offsetHeight);
    });

    ro.observe(header);

    return headerOffset;
  }

  return null;
};

const initMoveTo = () => {
  const triggers = document.querySelectorAll('[data-move-to');

  const moveTo = new MoveTo({
    tolerance: calcHeaderHeight(),
    duration: 600,
    // container: window,
  });

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      moveTo.options.tolerance = calcHeaderHeight();

      const target = document.querySelector(trigger.dataset.moveTo);
      setTimeout(() => {
        moveTo.move(target);
      }, 0);
    });
  });
};

export {initMoveTo};
