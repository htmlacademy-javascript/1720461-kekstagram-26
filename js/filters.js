import {getRandomArrayElement, showInfoMessage, debounce} from './utils.js';
import {createImages} from './create-images.js';
import {getData} from './network.js';


// константы
const RANDOM_IMAGES_COUNT = 10; // количество случайно выбранных фото
const TIME_DELAY_FOR_DEBOUNCE = 500; // временная задержка для устранения дребезга


// функция применения фильтра
function applyFilter () {
  const filtersElement = document.querySelector('.img-filters');
  filtersElement.classList.remove('img-filters--inactive');

  const filtersContainer = filtersElement.querySelector('.img-filters__form');
  const filterDefault = filtersElement.querySelector('#filter-default');
  const filterRandom = filtersElement.querySelector('#filter-random');
  const filterDiscussed = filtersElement.querySelector('#filter-discussed');

  const allFilters = [filterDefault, filterRandom, filterDiscussed];

  function applyCSSStylesToActiveFilter (evt) {
    allFilters.forEach((element) => {
      element.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  }

  // функция сравнения для метода .sort()
  function compareCommentsCount (imageA, imageB) {
    const CommentsCountA = imageA.comments.length;
    const CommentsCountB = imageB.comments.length;

    return CommentsCountB - CommentsCountA;
  }

  // функция применения фильтра случайных фото
  function applyFilterRandom (images) {
    const imagesArrayFull = images.slice(); // создаем копию массива

    const set = new Set(); // создаем новый экземпляр сета для ситуации, когда рандомизатор выберет 2 одинаковых числа
    while (set.size < RANDOM_IMAGES_COUNT) { // итерируемся, пока не наберется 10 элементов
      set.add(getRandomArrayElement(imagesArrayFull)); // добавляем рандомный элемент в сет
    }
    const filteredPhotos = Array.from(set); // превращаем сет в массив с помощью Array.from
    createImages(filteredPhotos); // передаем получившийся массив в функцию отрисовки фото
  }

  // функция применения фильтра обсуждаемых фото
  function applyFilterDiscussed (images) {
    const imagesArray = images.slice();
    const filteredPhotos = imagesArray.sort(compareCommentsCount); // сортируем по убыванию с помощью функции сравнения
    createImages(filteredPhotos); // передаем получившийся массив в функцию отрисовки фото
  }

  // функция, которая пойдет в обработчик клика
  function onFilterClick (evt) {
    evt.preventDefault();
    switch (evt.target.id) {
      case 'filter-discussed':
        applyCSSStylesToActiveFilter(evt);
        getData(applyFilterDiscussed, showInfoMessage);
        break;
      case 'filter-random':
        applyCSSStylesToActiveFilter(evt);
        getData(applyFilterRandom, showInfoMessage);
        break;
      case 'filter-default':
      default:
        applyCSSStylesToActiveFilter(evt);
        getData(createImages, showInfoMessage);
    }
  }

  filtersContainer.addEventListener('click', debounce((evt) => onFilterClick (evt), TIME_DELAY_FOR_DEBOUNCE));
}


export {applyFilter};
