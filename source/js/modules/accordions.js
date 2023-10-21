import {widthDesktop, remWidth, widthTablet} from './constants';
export class Accordions {
  constructor() {
    this._windowWidth = window.innerWidth;
    if (this._windowWidth >= remWidth) {
      if (!(this._minHeight === 5.5)) {
        this._minHeight = 5.5;
        this._openHeight = 5.5;
      }
    } else if (this._windowWidth >= widthTablet) {
      if (!(this._minHeight === 88)) {
        this._minHeight = 88;
        this._openHeight = 88;
      }
    } else {
      if (!(this._minHeight === 64)) {
        this._minHeight = 64;
        this._openHeight = 64;
      }
    }
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._windowResizeHandler = this._windowResizeHandler.bind(this);
    this._init();
  }

  _init() {
    this.fullUpdate();
    document.addEventListener('click', this._documentClickHandler);
    window.addEventListener('resize', this._windowResizeHandler);
  }

  _documentClickHandler(evt) {
    const target = evt.target;
    if (!target.closest('[data-accordion="element"]')) {
      return;
    }

    evt.preventDefault();
    const element = target.closest('[data-accordion="element"]');
    if (element.classList.contains('is-active') && !(element.classList.contains('guide__step'))) {
      this.closeAccordion(element);
      return;
    }
    this.openAccordion(element);
  }

  _windowResizeHandler() {
    if (this._windowWidth === window.innerWidth) {
      return;
    }
    this._windowWidth = window.innerWidth;
    if (this._windowWidth >= remWidth) {
      if (!(this._minHeight === 5.5)) {
        this._minHeight = 5.5;
        this._openHeight = 5.5;
      }
    } else if (this._windowWidth >= widthTablet) {
      if (!(this._minHeight === 88)) {
        this._minHeight = 88;
        this._openHeight = 88;
      }
    } else {
      if (!(this._minHeight === 64)) {
        this._minHeight = 64;
        this._openHeight = 64;
      }
    }
    this.updateAccordionsHeight();
  }

  closeAllAccordion(parent) {
    const elements = parent.querySelectorAll('[data-accordion="element"]');
    elements.forEach((element) => {
      const currentParent = element.closest('[data-accordion="parent"]');
      if (currentParent === parent) {
        this.closeAccordion(element);
      }
    });
  }

  updateAccordionsHeight(element = null) {
    if (element) {
      const content = element.querySelector('[data-accordion="content"]');
      element.style.transition = 'none';
      element.style.minHeight = `${content.offsetHeight}px`;
      setTimeout(() => {
        element.style.transition = null;
      });
      return;
    }
    const elements = document.querySelectorAll('[data-accordion="element"]');
    elements.forEach((elem) => {
      if (!(elem.classList.contains('is-active'))) {
        elem.style.transition = 'none';
        if (this._windowWidth >= remWidth) {
          elem.style.minHeight = `${this._minHeight}rem`;
        } else {
          elem.style.minHeight = `${this._minHeight}px`;
        }
        setTimeout(() => {
          elem.style.transition = null;
        });
      } else if ((elem.classList.contains('is-active'))) {
        const content = elem.querySelector('[data-accordion="content"]');
        elem.style.transition = 'none';
        elem.style.minHeight = `${content.offsetHeight}px`;
        setTimeout(() => {
          elem.style.transition = null;
        });
      }
    });
  }

  fullUpdate(parent = null, transition = false) {
    let openElements;
    if (parent) {
      openElements = parent.querySelectorAll('[data-accordion="element"].is-active');
    } else {
      openElements = document.querySelectorAll('[data-accordion="element"].is-active');
    }
    openElements.forEach((openElement) => {
      const innerParent = openElement.querySelector('[data-accordion="parent"]');
      if (innerParent) {
        return;
      }
      this.openAccordion(openElement, transition);
    });
  }

  openAccordion(element, transition = true) {
    const parentElement = element.closest('[data-accordion="parent"]');
    const contentElement = element.querySelector('[data-accordion="content"]');
    this._openHeight = contentElement.offsetHeight;

    if (parentElement.hasAttribute('data-single')) {
      this.closeAllAccordion(parentElement);
    }

    element.classList.add('is-active');
    if (transition) {
      element.style.minHeight = `${this._openHeight}px`;
    } else {
      element.style.transition = 'none';
      element.style.minHeight = `${this._openHeight}px`;
      setTimeout(() => {
        element.style.transition = null;
      });
    }

    if (parentElement.closest('[data-accordion="element"]')) {
      this.openAccordion(parentElement.closest('[data-accordion="element"]'), transition);
      return;
    }

    this._openHeight = this._minHeight;
  }

  closeAccordion(element, transition = true) {
    this._windowWidth = window.innerWidth;
    const contentElement = element.querySelector('[data-accordion="content"]');
    if (!contentElement) {
      return;
    }
    element.classList.remove('is-active');
    if (transition) {
      if (this._windowWidth >= remWidth) {
        element.style.minHeight = `${this._minHeight}rem`;
      } else {
        element.style.minHeight = `${this._minHeight}px`;
      }
    } else {
      element.style.transition = 'none';
      if (this._windowWidth >= remWidth) {
        element.style.minHeight = `${this._minHeight}rem`;
      } else {
        element.style.minHeight = `${this._minHeight}px`;
      }
      setTimeout(() => {
        element.style.transition = null;
      });
    }
  }
}
