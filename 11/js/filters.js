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

    const imagesTodelete = document.querySelectorAll('.picture');
    imagesTodelete.forEach((image) => image.remove());

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
    const imagesArrayFull = images.slice();

    const set = new Set();
    while (set.size < 10) {
      set.add(getRandomArrayElement(imagesArrayFull));
    }
    const imagesArray = Array.from(set);

    const imagesContainer = document.querySelector('.pictures'); // контейнер для фото
    const templateFragment = document.querySelector('#picture').content; // шаблон (фрагмент)
    const template = templateFragment.querySelector('.picture'); // весь шаблон
    const fragment = document.createDocumentFragment(); // создаем область document fragment

    const imagesTodelete = document.querySelectorAll('.picture');
    imagesTodelete.forEach((image) => image.remove());

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


  filtersContainer.addEventListener('click', (evt) => {
    //debounce(() => {}, 500);

    evt.preventDefault();
    if (evt.target.id === 'filter-default') {
      applyCSSStylesToActiveFilter(evt);
      getData(createImages, showInfoMessage);
    }
    if (evt.target.id === 'filter-random') {
      applyCSSStylesToActiveFilter(evt);
      //debounce(() => getData(applyFilterRandom, showInfoMessage), 500);
      getData(applyFilterRandom, showInfoMessage);
    }
    if (evt.target.id === 'filter-discussed') {
      applyCSSStylesToActiveFilter(evt);
      getData(applyFilterDiscussed, showInfoMessage);
    }
  });
}


export {applyFilter};
