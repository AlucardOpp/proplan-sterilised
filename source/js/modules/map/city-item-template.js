const createCityItemMarkup = (data) => {
  return data
      .map((element) => {
        return `<li data-city-value="${element}" tabindex="0">${element}</li>`;
      })
      .join('\n');
};

export const createCityListTemplate = (data) => {
  return `<ul class="map__search-list" data-search-list>${createCityItemMarkup(data)}</ul>`;
};
