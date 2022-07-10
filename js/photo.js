/* импортируем необходимую функцию */
import {generatedPicturesArray} from './data.js';


/* функция, создающая HTML-разметку для фотографий на основе данных и добавляющая ее в общую разметку*/
function createPhotos () {

  const picturesArray = generatedPicturesArray; // получаем данные

  const picturesContainer = document.querySelector('.pictures'); // контейнер для фото
  const templateFragment = document.querySelector('#picture').content; // шаблон (фрагмент)
  const template = templateFragment.querySelector('.picture'); // весь шаблон
  const fragment = document.createDocumentFragment(); // создаем область document fragment

  for (let i = 0; i < picturesArray.length; i++) {
    const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
    const templatePicture = templateElement.querySelector('.picture__img'); // доступ к тегу img
    const templateDescription = templateElement.querySelector('.picture__img'); // описание
    const templateComments = templateElement.querySelector('.picture__comments'); // количество комментариев
    const templateLikes = templateElement.querySelector('.picture__likes'); // количество лайков

    templatePicture.src += picturesArray[i].url; // присваиваем значение пути (url) до картинки
    templateComments.textContent = picturesArray[i].comments.length; // присваиваем значение количества комментариев
    templateLikes.textContent = picturesArray[i].likes; // присваиваем значение количества лайков
    templateDescription.alt = picturesArray[i].description; // присваиваем значение описания

    fragment.appendChild(templateElement); // добавляем элемент в document fragment
  }

  picturesContainer.appendChild(fragment); // добавляем document fragment в разметку

  return picturesContainer;
}


/* экспортируем необходимую функцию */
export {createPhotos};
