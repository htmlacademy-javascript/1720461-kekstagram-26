/* импортируем необходимую функцию */
import {createPhotos} from './photo.js';


/* запускаем функцию */
createPhotos();


/* полноэкранный просмотр */
const overlay = document.querySelector('.big-picture'); // наложение с полным просмотром фото
const overlayCloseButton = overlay.querySelector('.big-picture__cancel'); // закрыть наложение

const picturesContainer = document.querySelector('.pictures'); // контейнер со всеми фото
const pictureItem = picturesContainer.querySelector('.picture'); // один элемент (фото)

pictureItem.addEventListener('click', (evt) => {
  evt.preventDefault();
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

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



console.log(picturesContainer)
