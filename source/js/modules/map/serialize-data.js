import {data} from './data';

const changeCitiesPosition = (cities) => {
  const itemSpb = cities.splice(cities.findIndex((a) => a === 'Санкт-Петербург'), 1);
  cities.splice(0, 0, ...itemSpb);
  const itemMoscow = cities.splice(cities.findIndex((a) => a === 'Москва'), 1);
  cities.splice(0, 0, ...itemMoscow);
  return cities;
};

export const serializePinsData = () => {
  return data.reduce((acc, item) => {
    if (typeof acc[item.city] !== 'object') {
      acc[item.city] = [];
      acc[item.city].push(item);
      return acc;
    }
    acc[item.city].push(item);
    return acc;
  }, {});
};

export const serializeCitiesData = () => {
  const cities = [];
  data.forEach((element) => {
    cities.push(element.city);
  });
  return changeCitiesPosition([...new Set(cities.sort())]);
};
