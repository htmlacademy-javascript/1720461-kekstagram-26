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

  /* прочие селекторы */
  const commentCount = overlay.querySelector('.social__comment-count'); // блок счетчика комментариев
  const commentsLoader = overlay.querySelector('.comments-loader'); // кнопка загрузки дополнительных комментариев

  /* обработчик событий на открытие галереи */
  for (let i = 0; i < picturesCollection.length; i++) {
    picturesCollection[i].addEventListener('click', (evt) => {
      evt.preventDefault(); // убираем действие по умолчанию, чтобы при клике браузер не перекидывал в начало страницы. Это связано с тем, что в ссылках указан атрибут href="#"
      overlay.classList.remove('hidden'); // показываем оверлей
      document.body.classList.add('modal-open'); // скрываем скролл, подсмотрел что делает класс .modal-open :)
      overlaySource.src = pictureSource[i].src;
      overlayLikes.textContent = pictureLikes[i].textContent;
      overlayComments.textContent = pictureNumberOfComments[i].textContent;
      overlayDescription.textContent = pictureDescription[i].description;
      commentCount.classList.add('hidden'); // скрываем счетчик комментариев
      commentsLoader.classList.add('hidden'); // скрываем кнопку загрузки дополнительных комментариев

      /* селекторы для комментариев */
      const commentsContainer = document.querySelector('.social__comments'); // контейнер для вставки комментариев
      const commentsArray = generatedPicturesArray[i].comments; // массив комментариев i элемента generatedPicturesArray в цикле

      /* добавим условие для удаления всех комментариев перед открытием галереи */
      while (commentsContainer.firstChild) { // пока у элемента commentsContainer существует первый потомок
        commentsContainer.removeChild(commentsContainer.firstChild); // таким образом, мы удаляем все комментарии
      }

      /* цикл для комментариев */
      for (let j = 0; j < commentsArray.length; j++) {
        const templateFragment = document.querySelector('#comment').content; // шаблон комментария (фрагмент)
        const template = templateFragment.querySelector('.social__comment'); // весь шаблон комментария
        const fragment = document.createDocumentFragment(); // создаем область document fragment

        const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
        const templatePicture = templateElement.querySelector('.social__picture'); // доступ к тегу img
        const templateText = templateElement.querySelector('.social__text'); // доступ к текстовому полю

        templatePicture.src = commentsArray[j].avatar; // путь до аватара
        templatePicture.alt = commentsArray[j].name; // комментатор
        templateText.textContent = commentsArray[j].message; // текст комментария

        fragment.appendChild(templateElement); // добавляем элемент в document fragment
        commentsContainer.appendChild(fragment); // добавляем document fragment в разметку
      }
    });
  }

  /* обработчик события на закрытие галереи */
  overlayCloseButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    overlay.classList.add('hidden'); // возвращаем все, как было (скрываем наложение, возвращаем скролл)
    document.body.classList.remove('modal-open');  // возвращаем все, как было (скрываем наложение, возвращаем скролл)
  });

  /* обработчик события на закрытие галереи (по нажатию кнопки Esc) */
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      overlay.classList.add('hidden'); // возвращаем все, как было (скрываем наложение, возвращаем скролл)
      document.body.classList.remove('modal-open'); // возвращаем все, как было (скрываем наложение, возвращаем скролл)
    }
  });
}


/* экспортируем функцию в main */
export {viewGalleryHandler};
