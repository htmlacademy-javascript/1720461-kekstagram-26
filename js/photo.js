/* импортируем необходимую функцию */
import {generatePicturesDataArray} from './data.js';


/* функция, создающая HTML-разметку для фотографий на основе данных и добавляющая ее в общую разметку*/
function createPhotos (count) {

  const PICTURES_ARRAY = generatePicturesDataArray(count); // получаем данные

  const picturesContainer = document.querySelector('.pictures'); // контейнер для фото
  const templateFragment = document.querySelector('#picture').content; // шаблон (фрагмент)
  const template = templateFragment.querySelector('.picture'); // весь шаблон
  const fragment = document.createDocumentFragment(); // создаем область document fragment

  for (let i = 0; i < PICTURES_ARRAY.length; i++) {
    const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
    const templatePicture = templateElement.querySelector('.picture__img'); // доступ к тегу img
    const templateComments = templateElement.querySelector('.picture__comments'); // количество комментариев
    const templateLikes = templateElement.querySelector('.picture__likes'); // количество лайков

    templatePicture.src += PICTURES_ARRAY[i].url; // присваиваем значение пути (url) до картинки
    templateComments.textContent = PICTURES_ARRAY[i].comments.length; // присваиваем значение количества комментариев
    templateLikes.textContent = PICTURES_ARRAY[i].likes; // присваиваем значение количества лайков

    fragment.appendChild(templateElement); // добавляем элемент в document fragment
  }

  picturesContainer.appendChild(fragment); // добавляем document fragment в разметку

  //return picturesContainer;
}


/* экспортируем необходимую функцию */
export {createPhotos};
