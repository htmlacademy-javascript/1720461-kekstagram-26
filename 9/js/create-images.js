/* функция, создающая HTML-разметку для фотографий на основе данных и добавляющая ее в общую разметку*/
function createImages (images) {

  const imagesArray = images; // получаем данные

  const imagesContainer = document.querySelector('.pictures'); // контейнер для фото
  const templateFragment = document.querySelector('#picture').content; // шаблон (фрагмент)
  const template = templateFragment.querySelector('.picture'); // весь шаблон
  const fragment = document.createDocumentFragment(); // создаем область document fragment

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

  return imagesContainer;
}


/* экспортируем функцию в main */
export {createImages};
