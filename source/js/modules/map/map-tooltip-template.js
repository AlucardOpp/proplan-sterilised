export const createPinTooltipTemplate = ({name, link, address}) => {
  return `<div class="map-tooltip">
            <button class="map-tooltip__close-button" type="button" aria-label="Закрыть окно">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2263 3.32686L12.5192 2.61975L7.94649 7.19243L3.32674 2.57268L2.61963 3.27979L7.23938 7.89954L2.61967 12.5192L3.32678 13.2264L7.94649 8.60664L12.5191 13.1793L13.2262 12.4722L8.65359 7.89954L13.2263 3.32686Z" fill="white"/>
              </svg>
            </button>
            ${name ? `<h3 class="map-tooltip__title">${name}</h3>` : ''}
            ${address ? `<address class="map-tooltip__address">${address}</address>` : ''}
            ${link ? `<a class="map-tooltip__link" href="${link}" target="_blank" rel="nofollow noopener noreferrer">${link}</a>` : ''}
         </div>`;
};
