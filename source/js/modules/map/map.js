import {serializePinsData, serializeCitiesData} from './serialize-data';
import {createElement, renderElement} from '../../utils/render';
import {iosChecker} from '../../utils/ios-checker';
import {createCityListTemplate} from './city-item-template';
import {createPinTooltipTemplate} from './map-tooltip-template';

export class Map {
  constructor() {
    this._mapInteractiveBlock = document.querySelector('[data-map-interactive-block]');
    this._mapContainer = document.querySelector('[data-map-container]');
    this._searchBlock = document.querySelector('[data-map-search]');
    this._searchListBlock = document.querySelector('[data-search-list]');
    this._searchToggler = document.querySelector('[data-search-toggler]');
    this._searchChanger = document.querySelector('[data-search-changer]');
    this._searchInput = document.querySelector('[data-search-input] input');
    this._zoomControls = document.querySelector('[data-zoom-controls]');
    this._zoomInControl = document.querySelector('[data-zoom-in]');
    this._zoomOutControl = document.querySelector('[data-zoom-out]');
    this._errorText = 'Клиник-партнёров не найдено';
    this._zoom = 10;
    this._map = null;
    this._searchValue = null;
    this._currentPins = null;
    this._pinCollection = null;
    this._ctrlKey = null;
    this._ctrlMessVisible = null;
    this._timer = null;
    this._pinsData = serializePinsData();
    this._citiesData = serializeCitiesData();
    this._onSearchTogglerClick = this._onSearchTogglerClick.bind(this);
    this._onSearchInputInput = this._onSearchInputInput.bind(this);
    this._onSearchListBlockClick = this._onSearchListBlockClick.bind(this);
    this._onSearchChangerClick = this._onSearchChangerClick.bind(this);
    this._onSearchListBlockKeydown = this._onSearchListBlockKeydown.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onDocumentKeydown = this._onDocumentKeydown.bind(this);
    this._onTooltipCloseButtonClick = this._onTooltipCloseButtonClick.bind(this);
    this._onDocumentWithTooltipKeydown = this._onDocumentWithTooltipKeydown.bind(this);
    this._onDocumentWithTooltipClick = this._onDocumentWithTooltipClick.bind(this);
    this._onZoomInControlClick = this._onZoomInControlClick.bind(this);
    this._onZoomOutControlClick = this._onZoomOutControlClick.bind(this);
  }

  _onZoomInControlClick(evt) {
    evt.preventDefault();
    this._zoom += 1;
    this._map.setZoom(this._zoom);
  }

  _onZoomOutControlClick(evt) {
    evt.preventDefault();
    this._zoom -= 1;
    this._map.setZoom(this._zoom);
  }

  _onSearchInputInput(evt) {
    evt.preventDefault();
    this._searchValue = evt.target.value;
    this._searchInput.dataset.id = '';
    this._searchChanger.disabled = true;
    this._createList();
  }

  _onSearchTogglerClick(evt) {
    evt.preventDefault();
    this._showSearch();
    setTimeout(() => {
      this._searchInput.focus();
    }, 100);
    dataLayer.push({
      'event': 'customEvent',
      'category': 'ppc_sterilised',
      'action': 'change city button',
      'label': 'click',
    });
  }

  _onSearchListBlockClick(evt) {
    if (evt.target.closest('li')) {
      this._searchListAction(evt);
    }
  }

  _onSearchListBlockKeydown(evt) {
    if (evt.key === 'Enter') {
      this._searchListAction(evt);
    }
  }

  _onSearchChangerClick(evt) {
    evt.preventDefault();
    this._currentPins = this._pinsData[this._searchInput.dataset.id];
    this._hideSearch();
    dataLayer.push({
      'event': 'customEvent',
      'category': 'ppc_sterilised',
      'action': 'city accept button',
      'label': this._searchInput.dataset.id,
    });
  }

  _onDocumentClick(evt) {
    if (!evt.target.closest('[data-map-search]')) {
      this._hideSearch();
    }
  }

  _onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._hideSearch();
    }
  }

  _onTooltipCloseButtonClick(evt) {
    this._tooltipCloseAction(evt);
  }

  _onDocumentWithTooltipKeydown(evt) {
    if (evt.key === 'Escape') {
      this._tooltipCloseAction(evt);
    }
  }

  _onDocumentWithTooltipClick(evt) {
    if (!evt.target.closest('.map-tooltip')) {
      this._tooltipCloseAction(evt);
    }
  }

  _tooltipCloseAction(evt) {
    evt.preventDefault();
    this._tooltip.remove();
    this._tooltip = null;
    this._showMap();
    document.removeEventListener('keydown', this._onDocumentWithTooltipKeydown);
    document.removeEventListener('click', this._onDocumentWithTooltipClick);
  }

  _searchListAction(evt) {
    evt.preventDefault();
    this._searchChanger.disabled = false;
    this._searchInput.value = evt.target.closest('li').dataset.cityValue;
    this._searchInput.dataset.id = evt.target.closest('li').dataset.cityValue;
    this._searchChanger.focus();
  }

  _addSearchListeners(flag) {
    setTimeout(() => {
      if (flag) {
        document.addEventListener('click', this._onDocumentClick);
        document.addEventListener('keydown', this._onDocumentKeydown);
      }
      this._searchInput.addEventListener('input', this._onSearchInputInput);
      this._searchListBlock.addEventListener('click', this._onSearchListBlockClick);
      this._searchListBlock.addEventListener('keydown', this._onSearchListBlockKeydown);
      this._searchChanger.addEventListener('click', this._onSearchChangerClick);
    });
  }

  _removeSearchListeners() {
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('keydown', this._onDocumentKeydown);
    this._searchInput.removeEventListener('input', this._onSearchInputInput);
    this._searchListBlock.removeEventListener('click', this._onSearchListBlockClick);
    this._searchListBlock.removeEventListener('keydown', this._onSearchListBlockKeydown);
    this._searchChanger.removeEventListener('click', this._onSearchChangerClick);
  }

  _createMap() {
    this._map = new window.ymaps.Map(this._mapContainer, {
      center: [55.755819, 37.617644],
      zoom: this._zoom,
      controls: [],
      behaviors: ['drag', 'scrollZoom', 'multiTouch'],
    });
    this._showSearch(false);
    this._searchToggler.addEventListener('click', this._onSearchTogglerClick);
    this._zoomInControl.addEventListener('click', this._onZoomInControlClick);
    this._zoomOutControl.addEventListener('click', this._onZoomOutControlClick);
  }

  _createList() {
    const searchData = [];
    this._searchListBlock.innerHTML = '';
    if (!this._searchValue) {
      if (iosChecker()) {
        return;
      }
      renderElement(this._searchListBlock, createElement(createCityListTemplate(this._citiesData.slice())));
      return;
    }
    this._citiesData.slice().forEach((item) => {
      if (item.toLowerCase().includes(this._searchValue.toLowerCase())) {
        searchData.push(item);
      }
    });
    if (!searchData.length) {
      searchData.push(this._errorText);
      const searchList = createElement(createCityListTemplate(searchData));
      const listItem = searchList.querySelector('li');
      listItem.style.pointerEvents = 'none';
      listItem.removeAttribute('tabindex');
      renderElement(this._searchListBlock, searchList);
      return;
    }
    renderElement(this._searchListBlock, createElement(createCityListTemplate(searchData)));
  }

  _hideSearch() {
    this._searchBlock.classList.remove('is-active');
    this._searchToggler.classList.add('is-active');
    this._searchValue = null;
    this._searchInput.value = '';
    this._showMap();
    this._renderPins();
    this._removeSearchListeners();
  }

  _showSearch(flag = true) {
    this._searchBlock.classList.add('is-active');
    this._searchToggler.classList.remove('is-active');
    this._createList();
    this._hideMap();
    this._searchChanger.disabled = true;
    this._addSearchListeners(flag);
  }

  _hideMap() {
    this._mapContainer.classList.remove('is-active');
    this._zoomControls.classList.remove('is-active');
  }

  _showMap() {
    this._mapContainer.classList.add('is-active');
    this._zoomControls.classList.add('is-active');
  }

  _renderTooltip(data) {
    this._tooltip = createElement(createPinTooltipTemplate(data));
    renderElement(this._mapInteractiveBlock, this._tooltip);
    this._hideMap();
    setTimeout(() => {
      this._tooltip.querySelector('.map-tooltip__close-button').addEventListener('click', this._onTooltipCloseButtonClick);
      const citeLink = this._tooltip.querySelector('.map-tooltip__link');
      if (citeLink) {
        citeLink.addEventListener('click', () => {
          dataLayer.push({
            'event': 'customEvent',
            'category': 'ppc_sterilised',
            'action': citeLink.href,
            'label': 'click',
          });
        });
      }
      this._tooltip.querySelector('.map-tooltip__close-button').addEventListener('click', this._onTooltipCloseButtonClick);
      document.addEventListener('keydown', this._onDocumentWithTooltipKeydown);
      document.addEventListener('click', this._onDocumentWithTooltipClick);
    });
  }

  _renderPins() {
    if (this._pinCollection) {
      this._map.geoObjects.remove(this._pinCollection);
    }
    this._pinCollection = new ymaps.GeoObjectCollection();
    this._currentPins.forEach((object) => {
      const myPlaceMark = new ymaps.Placemark([object.coords.lat, object.coords.lon],
          {hintContent: false},
          {
            iconLayout: 'default#image',
            iconImageHref: 'map-img/icon-pin.svg',
            iconImageSize: [32, 50],
            iconImageOffset: [-16, -50],
          });
      this._pinCollection.add(myPlaceMark);
      myPlaceMark.events.add('click', () => {
        const link = object.link ? object.link : '';
        dataLayer.push({
          'event': 'customEvent',
          'category': 'ppc_sterilised',
          'action': 'clinic map point',
          'label': link,
        });
        this._renderTooltip(object);
      });
    });
    this._map.geoObjects.add(this._pinCollection);
    this._map.setBounds(this._pinCollection.getBounds());
    this._zoom = this._map.getZoom();

    if (this._currentPins.length === 1) {
      this._zoom = 15;
      this._map.setZoom(this._zoom);
    }
  }

  _initSearch(result) {
    this._currentPins = this._pinsData[result];

    if (this._currentPins) {
      this._hideSearch();
      return;
    }
    this._showSearch(false);
  }

  init() {
    if (!this._mapContainer) {
      return;

    }
    this._createMap();

    window.ymaps.geolocation
        .get({
          autoReverseGeocode: true,
        })
        .then((result) => {
          if (result.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea) {
            return result.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName;
          }
          return result.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country.AdministrativeArea.Locality.LocalityName;
        })
        .then((result) => {
          this._initSearch(result);
        });
  }
}
