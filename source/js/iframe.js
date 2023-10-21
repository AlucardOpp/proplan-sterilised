import {Map} from './modules/map/map';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {

    setTimeout(() => {
      const map = new Map();
      map.init();
    }, 1000);

  });
});
