/* импортируем необходимую функцию */
import {generatedPicturesArray} from './data.js';


/* функция полноэкранного просмотра фото */
function viewGalleryHandler () {

  /* селекторы для наложения */
  const overlay = document.querySelector('.big-picture'); // весь элемент наложение
  const overlayCloseButton = overlay.querySelector('.big-picture__cancel'); // кнопка закрыть
  const overlaySource = overlay.querySelector('.big-picture__img > img'); // атрибут source
  const overlayLikes = overlay.querySelector('.likes-count'); // количество лайков
  const overlayComments = overlay.querySelector('.comments-count'); // количество комментариев
  const overlayDescription = overlay.querySelector('.social__caption'); // описание фото

  /* селекторы фото */
  const picturesContainer = document.querySelector('.pictures'); // контейнер со всеми элементами
  const picturesCollection = picturesContainer.querySelectorAll('.picture'); // коллекция со всеми элементами списка
  const pictureSource = picturesContainer.querySelectorAll('.picture__img'); // атрибут source в элементе
  const pictureLikes = picturesContainer.querySelectorAll('.picture__likes'); // количество лайков в элементе
  const pictureNumberOfComments = picturesContainer.querySelectorAll('.picture__comments'); // количество комментариев в элементе
  const pictureDescription = generatedPicturesArray; // описание фото в элементе

  /* селекторы для комментариев */
  const commentsContainer = overlay.querySelector('.social__comments'); // контейнер для вставки комментариев
  const commentCount = overlay.querySelector('.social__comment-count'); // блок счетчика комментариев
  const commentsLoader = overlay.querySelector('.comments-loader'); // кнопка загрузки дополнительных комментариев


  /* функция очистки комментариев */
  function clearComments () {
    while (commentsContainer.firstChild) { // пока у элемента commentsContainer существует первый потомок
      commentsContainer.removeChild(commentsContainer.firstChild); // удаляем первого потомка, таким образом, мы удаляем все комментарии
    }
  }

  /* функция на закрытие галереи (по нажатию кнопки Esc) */
  function onOverlayEscKeydown (evt) {
    if (evt.key === 'Escape') {
      overlay.classList.add('hidden'); // скрываем наложение
      document.body.classList.remove('modal-open'); // возвращаем скролл
      clearComments (); // очищаем комментарии
      document.removeEventListener('keydown', onOverlayEscKeydown); // убираем обработчик на закрытие окна по кнопке Esc
    }
  }

  /* функция создания комментариев */
  function createComments (array, counter) {
    const commentsArrayCopy = array.slice();
    const commentsArray = commentsArrayCopy.slice(0, 5);

    if (commentsArray.length === 0) {
      commentsLoader.classList.add('hidden');
      commentCount.textContent = '0 из 0 комментариев';
    }

    for (let j = 0; j < commentsArray.length; j++) {
      const templateFragment = document.querySelector('#comment').content; // шаблон комментария (фрагмент)
      const template = templateFragment.querySelector('.social__comment'); // весь шаблон комментария
      const fragment = document.createDocumentFragment(); // создаем область document fragment

      const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
      const templatePicture = templateElement.querySelector('.social__picture'); // доступ к тегу img
      const templateText = templateElement.querySelector('.social__text'); // доступ к текстовому полю

      counter++;
      commentsArrayCopy.splice(0, 1);

      commentCount.textContent = `${counter} из ${array.length} комментариев`;
      templatePicture.src = commentsArray[j].avatar; // путь до аватара
      templatePicture.alt = commentsArray[j].name; // комментатор
      templateText.textContent = commentsArray[j].message; // текст комментария

      fragment.appendChild(templateElement); // добавляем элемент в document fragment
      commentsContainer.appendChild(fragment); // добавляем document fragment в разметку

      //console.log(numberOfComments);
      //console.log(commentsArrayCopy);

      if (commentsArrayCopy.length === 0) {
        commentsLoader.classList.add('hidden');
      }
    }
  }


  clearComments (); // очистим комментарии один раз перед первым отрытием галереи

  /* обработчик событий на открытие галереи */
  for (let i = 0; i < picturesCollection.length; i++) {
    picturesCollection[i].addEventListener('click', (evt) => {
      evt.preventDefault(); // убираем действие по умолчанию, чтобы при клике браузер не перекидывал в начало страницы. Это связано с тем, что в ссылках указан атрибут href="#"
      overlay.classList.remove('hidden'); // показываем оверлей
      document.body.classList.add('modal-open'); // скрываем скролл, подсмотрел что делает класс .modal-open :)
      commentsLoader.classList.remove('hidden');
      overlaySource.src = pictureSource[i].src;
      overlayLikes.textContent = pictureLikes[i].textContent;
      overlayComments.textContent = pictureNumberOfComments[i].textContent;
      overlayDescription.textContent = pictureDescription[i].description;

      const commentsArrayFull = generatedPicturesArray[i].comments; // массив комментариев i элемента generatedPicturesArray в цикле

      let numberOfComments = 0;

      /* отрисовка комментариев */
      createComments (commentsArrayFull, numberOfComments);

      document.addEventListener('keydown', onOverlayEscKeydown); // добавляем обработчик на закрытие окна по кнопке Esc
      commentsLoader.addEventListener('click', createComments); // добавляем обработчик на кнопку загрузки комментариев
    });
  }

  /* обработчик события на закрытие галереи */
  overlayCloseButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    overlay.classList.add('hidden'); // скрываем наложение
    document.body.classList.remove('modal-open');  // возвращаем скролл
    clearComments (); // очищаем комментарии
    document.removeEventListener('keydown', onOverlayEscKeydown); // убираем обработчик на закрытие окна по кнопке Esc
    //commentsLoader.removeEventListener('click', createComments); // добавляем обработчик на кнопку загрузки комментариев

    /* не убирается обработчик, потому что нужно вынести функцию создания комментов createComments() из цикла, а у меня не получается(
      я передавал в функцию в качестве параметра массив комментариев и дальше почему-то на нем не срабатывает метод .slice, в консоль падает ошибка*/
  });
}


/* экспортируем функцию в main */
export {viewGalleryHandler};
