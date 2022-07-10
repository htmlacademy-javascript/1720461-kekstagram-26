/* импортируем необходимую функцию */
import {createPhotos} from './photo.js';
import {generatedPicturesArray} from './data.js';

/* запускаем функцию */
createPhotos();


/* функция полноэкранного просмотра фото */
/* селекторы для наложения */
const overlay = document.querySelector('.big-picture'); // наложение
const overlayCloseButton = overlay.querySelector('.big-picture__cancel'); // закрыть наложение
const overlaySource = overlay.querySelector('.big-picture__img > img'); // атрибут source в наложении
const overlayLikes = overlay.querySelector('.likes-count'); // количество лайков в наложении
const overlayComments = overlay.querySelector('.comments-count'); // количество комментариев в наложении
const overlayDescription = overlay.querySelector('.social__caption'); // описание фото в наложении

/* селекторы фото */
const picturesContainer = document.querySelector('.pictures'); // контейнер со всеми элементами
const picturesCollection = picturesContainer.querySelectorAll('.picture'); // коллекция со всеми элементами
const pictureSource = picturesContainer.querySelectorAll('.picture__img'); // атрибут source в элементе
const pictureLikes = picturesContainer.querySelectorAll('.picture__likes'); // количество лайков в элементе
const pictureNumberOfComments = picturesContainer.querySelectorAll('.picture__comments'); // количество комментариев в элементе
const pictureDescription = generatedPicturesArray; // описание фото в элементе


for (let i = 0; i < picturesCollection.length; i++) {
  picturesCollection[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    overlaySource.src = pictureSource[i].src;
    overlayLikes.textContent = pictureLikes[i].textContent;
    overlayComments.textContent = pictureNumberOfComments[i].textContent;
    overlayDescription.textContent = pictureDescription[i].description;


    const commentsContainer = document.querySelector('.social__comments'); // контейнер для вставки комментариев
    const commentsArray = generatedPicturesArray[i].comments;


    for (let j = 0; j < commentsArray.length; j++) {
      /* селекторы для комментариев */
      const templateFragment = document.querySelector('#comment').content; // шаблон комментария (фрагмент)
      const template = templateFragment.querySelector('.social__comment'); // весь шаблон комментария
      const fragment = document.createDocumentFragment(); // создаем область document fragment

      const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
      const templatePicture = templateElement.querySelector('.social__picture'); // доступ к тегу img
      const templateText = templateElement.querySelector('.social__text'); // доступ к текстовому полю

      templatePicture.src = commentsArray[j].avatar; // путь до аватара
      templatePicture.src = commentsArray[j].name; // комментатор
      templateText.textContent = commentsArray[j].message; // текст комментария

      fragment.appendChild(templateElement); // добавляем элемент в document fragment

      commentsContainer.appendChild(fragment); // добавляем document fragment в разметку

      console.log(commentsContainer)
    }
  });
}


overlayCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});


console.log(generatedPicturesArray[0].comments);

