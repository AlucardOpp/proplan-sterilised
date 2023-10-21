const openModalBtnAction = () => {
  const buttons = document.querySelectorAll('.btn-with-img');

  if (!buttons) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.add('is-active');
    });
  });
};

export {openModalBtnAction};
