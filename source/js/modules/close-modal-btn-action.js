const closeModalBtnAction = () => {
  const buttons = document.querySelectorAll('button[data-open-modal]');
  if (!buttons.length) {
    return;
  }

  buttons.forEach((btn) => {
    btn.classList.remove('is-active');
  });
};

export {closeModalBtnAction};
