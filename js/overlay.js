/* функция полноэкранного просмотра фото */
function viewFullImage (generatedImagesArray) {

  /* селекторы для наложения */
  const overlay = document.querySelector('.big-picture'); // весь элемент наложение
  const overlayCloseButton = overlay.querySelector('.big-picture__cancel'); // кнопка закрыть
  const overlaySource = overlay.querySelector('.big-picture__img > img'); // атрибут source
  const overlayLikes = overlay.querySelector('.likes-count'); // количество лайков
  const overlayComments = overlay.querySelector('.comments-count'); // количество комментариев
  const overlayDescription = overlay.querySelector('.social__caption'); // описание фото

  /* селекторы изображений */
  const picturesContainer = document.querySelector('.pictures'); // контейнер со всеми элементами

  /* селекторы для комментариев */
  const commentsContainer = overlay.querySelector('.social__comments'); // контейнер для вставки комментариев
  const commentsLoader = overlay.querySelector('.comments-loader'); // кнопка загрузки дополнительных комментариев
  const commentCount = overlay.querySelector('.social__comment-count'); // блок счетчика комментариев


  /* функция открытия оверлея */
  function openOverlay (image) {
    overlay.classList.remove('hidden'); // показываем оверлей
    document.body.classList.add('modal-open'); // скрываем скролл
    commentsLoader.classList.remove('hidden');
    overlaySource.src = image.url;
    overlayLikes.textContent = image.likes;
    overlayComments.textContent = image.comments.length;
    overlayDescription.textContent = image.description;
    createComments(image);
    //createAllComments(image);

    document.addEventListener('keydown', onOverlayEscKeydown); // добавляем обработчик на закрытие окна по кнопке Esc
    overlayCloseButton.addEventListener('click', closeOverlay); // добавляем обработчик на закрытие оверлея по клику
    commentsLoader.addEventListener('click', createComments); // добавляем обработчик на кнопку загрузки комментариев
  }

  /* функция на закрытие оверлея */
  function closeOverlay (evt) {
    evt.preventDefault();
    overlay.classList.add('hidden'); // скрываем наложение
    document.body.classList.remove('modal-open'); // возвращаем скролл
    clearComments (); // очищаем комментарии
    document.removeEventListener('keydown', onOverlayEscKeydown); // убираем обработчик на закрытие окна по кнопке Esc
    overlayCloseButton.removeEventListener('click', closeOverlay); // убираем обработчик на закрытие окна по клику
    commentsLoader.removeEventListener('click', createComments); // убираем обработчик на кнопку загрузки комментариев
  }

  /* функция на закрытие оверлея (по нажатию кнопки Esc) */
  function onOverlayEscKeydown (evt) {
    if (evt.key === 'Escape') {
      closeOverlay(evt);
    }
  }

  /* функция очистки комментариев */
  function clearComments () {
    commentsContainer.textContent = ''; //удаляем все комментарии
  }


  // if (image.comments.length === 0) {
  //   commentsLoader.classList.add('hidden');
  //   commentCount.textContent = '0 из 0 комментариев';
  // }





  const templateFragment = document.querySelector('#comment').content; // шаблон комментария (фрагмент)
  const template = templateFragment.querySelector('.social__comment'); // весь шаблон комментария
  const fragment = document.createDocumentFragment(); // создаем область document fragment

  function createAllComments (image) {
    image.comments.forEach((element) => {
      const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
      const templatePicture = templateElement.querySelector('.social__picture'); // доступ к тегу img
      const templateText = templateElement.querySelector('.social__text'); // доступ к текстовому полю

      templatePicture.src = element.avatar; // путь до аватара
      templatePicture.alt = element.name; // комментатор
      templateText.textContent = element.message; // текст комментария

      fragment.appendChild(templateElement); // добавляем элемент в document fragment
      commentsContainer.appendChild(fragment); // добавляем document fragment в разметку
    });
  }

  function createComments (image) {
    const commentsArrayCopy = image.comments.slice();
    console.log(commentsArrayCopy);

    const commentsArray = commentsArrayCopy.slice(0, 5);
    console.log(commentsArray);

    createAllComments(commentsArray);
    console.log(createAllComments);
  }

  /*
  + сперва минимальная функция которая рендерит все комменты какие ей отдают в аргумент.
  - потом функция вокруг, которая:
    - делает копию комментов,
    - из копии внутрь первой отрезает пять комментов,
    - проверяет длину копии и если она меньше 1 то скрывает кнопку удаляя слушатель,
    - если больше то вешает на кнопку слушатель который по клику отрежет и отрисует еще пять
  */





  // /* функция отрисовки комментариев */
  // function createComments (image) {

  //   let counterNumberOfComments = 1;
  //   const commentsArrayCopy = image.comments.slice();
  //   const commentsArray = commentsArrayCopy.slice(0, 5);

  //   commentsArray.forEach((element) => {
  //     const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
  //     const templatePicture = templateElement.querySelector('.social__picture'); // доступ к тегу img
  //     const templateText = templateElement.querySelector('.social__text'); // доступ к текстовому полю

  //     commentCount.textContent = `${counterNumberOfComments} из ${image.comments.length} комментариев`;
  //     templatePicture.src = element.avatar; // путь до аватара
  //     templatePicture.alt = element.name; // комментатор
  //     templateText.textContent = element.message; // текст комментария

  //     fragment.appendChild(templateElement); // добавляем элемент в document fragment
  //     commentsContainer.appendChild(fragment); // добавляем document fragment в разметку

  //     console.log(counterNumberOfComments);
  //     console.log(commentsArrayCopy);

  //     counterNumberOfComments++;
  //     commentsArrayCopy.splice(0, 1);

  //     if (commentsArrayCopy.length === 0) {
  //       commentsLoader.classList.add('hidden');
  //     }
  //   });

  // }

  clearComments(); // очистим комментарии один раз перед первым отрытием оверлея

  /* обработчик событий на открытие оверлея */
  picturesContainer.addEventListener('click', (evt) => {
    evt.preventDefault(); // убираем действие по умолчанию, чтобы при клике браузер не перекидывал в начало страницы
    const id = evt.target.dataset.id;
    const image = generatedImagesArray.find((item) => +id === item.id);
    openOverlay(image);
  });
}


/* экспортируем функцию в main */
export {viewFullImage};
