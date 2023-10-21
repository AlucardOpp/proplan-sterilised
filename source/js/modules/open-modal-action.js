const openModalAction = () => {
  const activeButton = document.querySelector('button.is-active');
  if (!activeButton) {
    return;
  }

  const windowWidth = window.innerWidth;
  const mobileWidth = 767;

  if (activeButton.classList.contains('btn-with-img--video')) {
    const videoLink = activeButton.dataset.video;
    const modalVideo = document.querySelector('.modal--video.is-active');
    const video = modalVideo.querySelector('iframe');
    video.src = videoLink;
  } else if (activeButton.classList.contains('btn-with-img--check-list')) {
    const stepTitle = activeButton.dataset.name;
    const mobPdfLink = activeButton.dataset.mobilepdf;
    const desktopPdfLink = activeButton.dataset.desktoppdf;
    const modalChecklist = document.querySelector('.modal--check-list.is-active');
    const modalBtn = modalChecklist.querySelector('.modal-check-list__download-button');
    if (windowWidth > mobileWidth) {
      modalBtn.href = desktopPdfLink;
      modalBtn.dataset.name = stepTitle;
    } else {
      modalBtn.href = mobPdfLink;
      modalBtn.dataset.name = stepTitle;
    }
  }
};

export {openModalAction};
