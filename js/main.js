/* импортируем необходимую функцию */
import {createPhotos} from './photo.js';
import {generatedPicturesArray} from './data.js';

/* запускаем функцию */
createPhotos();


/* полноэкранный просмотр */
const overlay = document.querySelector('.big-picture'); // наложение
const overlayCloseButton = overlay.querySelector('.big-picture__cancel'); // закрыть наложение
const overlaySource = overlay.querySelector('.big-picture__img > img'); // атрибут source в наложении
const overlayDescription = overlay.querySelector('.social__caption'); // описание фото в наложении
const overlayLikes = overlay.querySelector('.likes-count'); // количество лайков в наложении
const overlayComments = overlay.querySelector('.comments-count'); // количество комментариев в наложении

const picturesContainer = document.querySelector('.pictures'); // контейнер со всеми фото
const picturesCollection = picturesContainer.querySelectorAll('.picture'); // коллекция со всеми элементами
const pictureSource = picturesContainer.querySelectorAll('.picture__img'); // атрибут source в элементе
const pictureDescription = picturesContainer.querySelectorAll('.picture__img'); // описание фото в элементе
const pictureLikes = picturesContainer.querySelectorAll('.picture__likes'); // количество лайков в элементе
const pictureComments = picturesContainer.querySelectorAll('.picture__comments'); // количество комментариев в элементе

for (let i = 0; i < picturesCollection.length; i++) {
  picturesCollection[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    overlaySource.src = pictureSource[i].src;
    overlayDescription.textContent = pictureDescription[i].alt;
    overlayLikes.textContent = pictureLikes[i].textContent;
    overlayComments.textContent = pictureComments[i].textContent;
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


console.log(generatedPicturesArray);
console.log(picturesCollection[0]);
