import {getRandomArrayElement, showInfoMessage, debounce} from './utils.js';
import {createImages} from './create-images.js';
import {getData} from './network.js';


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

  // функция применения фильтра обсуждаемых фото
  function applyFilterDiscussed (images) {
    const imagesArray = images.slice();

    imagesArray.sort(compareCommentsCount);

    const imagesContainer = document.querySelector('.pictures'); // контейнер для фото
    const templateFragment = document.querySelector('#picture').content; // шаблон (фрагмент)
    const template = templateFragment.querySelector('.picture'); // весь шаблон
    const fragment = document.createDocumentFragment(); // создаем область document fragment

    const imagesToDelete = document.querySelectorAll('.picture');
    imagesToDelete.forEach((image) => image.remove());

    for (let i = 0; i < imagesArray.length; i++) {
      const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
      const templateImage = templateElement.querySelector('.picture__img'); // доступ к тегу img
      const templateDescription = templateElement.querySelector('.picture__img'); // описание
      const templateComments = templateElement.querySelector('.picture__comments'); // количество комментариев
      const templateLikes = templateElement.querySelector('.picture__likes'); // количество лайков

      templateImage.src += imagesArray[i].url; // присваиваем значение пути (url) до картинки
      templateComments.textContent = imagesArray[i].comments.length; // присваиваем значение количества комментариев
      templateLikes.textContent = imagesArray[i].likes; // присваиваем значение количества лайков
      templateDescription.alt = imagesArray[i].description; // присваиваем значение описания
      templateImage.dataset.id = imagesArray[i].id; // создаем data-атрибут id и присваиваем значение

      fragment.appendChild(templateElement); // добавляем элемент в document fragment
    }

    imagesContainer.appendChild(fragment); // добавляем document fragment в разметку
  }

  // функция применения фильтра случайных фото
  function applyFilterRandom (images) {
    const imagesArrayFull = images.slice(); // создаем копию массива

    const set = new Set(); // создаем новый экземпляр сета для ситуации, когда рандомизатор выберет 2 одинаковых числа
    while (set.size < 10) { // итерируемся, пока не наберется 10 элементов
      set.add(getRandomArrayElement(imagesArrayFull)); // добавляем рандомный элемент в сет
    }
    const imagesArray = Array.from(set); // превращаем сет в массив с помощью Array.from

    const imagesContainer = document.querySelector('.pictures'); // контейнер для фото
    const templateFragment = document.querySelector('#picture').content; // шаблон (фрагмент)
    const template = templateFragment.querySelector('.picture'); // весь шаблон
    const fragment = document.createDocumentFragment(); // создаем область document fragment

    const imagesToDelete = document.querySelectorAll('.picture'); // выберем все элементы для удаления
    imagesToDelete.forEach((image) => image.remove()); // проитерируемся и для каждого элемента применим метод remove

    for (let i = 0; i < imagesArray.length; i++) {
      const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
      const templateImage = templateElement.querySelector('.picture__img'); // доступ к тегу img
      const templateDescription = templateElement.querySelector('.picture__img'); // описание
      const templateComments = templateElement.querySelector('.picture__comments'); // количество комментариев
      const templateLikes = templateElement.querySelector('.picture__likes'); // количество лайков

      templateImage.src += imagesArray[i].url; // присваиваем значение пути (url) до картинки
      templateComments.textContent = imagesArray[i].comments.length; // присваиваем значение количества комментариев
      templateLikes.textContent = imagesArray[i].likes; // присваиваем значение количества лайков
      templateDescription.alt = imagesArray[i].description; // присваиваем значение описания
      templateImage.dataset.id = imagesArray[i].id; // создаем data-атрибут id и присваиваем значение

      fragment.appendChild(templateElement); // добавляем элемент в document fragment
    }

    imagesContainer.appendChild(fragment); // добавляем document fragment в разметку
  }

  // функция, которая пойдет в обработчик клика
  function filterHandler (evt) {
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

  filtersContainer.addEventListener('click', debounce((evt) => filterHandler (evt), 500));
}


export {applyFilter};
