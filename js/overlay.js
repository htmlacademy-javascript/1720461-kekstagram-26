// функция полноэкранного просмотра фото
function viewFullImage (data) {

  // селекторы для наложения
  const overlay = document.querySelector('.big-picture'); // весь элемент наложение
  const overlayCloseButton = overlay.querySelector('.big-picture__cancel'); // кнопка закрыть
  const overlaySource = overlay.querySelector('.big-picture__img > img'); // атрибут source
  const overlayLikes = overlay.querySelector('.likes-count'); // количество лайков
  const overlayComments = overlay.querySelector('.comments-count'); // количество комментариев
  const overlayDescription = overlay.querySelector('.social__caption'); // описание фото

  // селекторы изображений
  const picturesContainer = document.querySelector('.pictures'); // контейнер со всеми элементами

  // селекторы для комментариев
  const commentsContainer = overlay.querySelector('.social__comments'); // контейнер для вставки комментариев
  const commentsLoader = overlay.querySelector('.comments-loader'); // кнопка загрузки дополнительных комментариев
  const commentsCount = overlay.querySelector('.social__comment-count'); // блок счетчика комментариев

  let addDefiniteComments = null; // добавляем переменную для функции createDefiniteComments
  let commentsCounter = 0; // добавляем переменную для счетчика комментариев

  // функция открытия оверлея
  function openOverlay (image) {
    overlay.classList.remove('hidden'); // показываем оверлей
    document.body.classList.add('modal-open'); // скрываем скролл
    commentsLoader.classList.remove('hidden');
    overlaySource.src = image.url;
    overlayLikes.textContent = image.likes;
    overlayComments.textContent = image.comments.length;
    overlayDescription.textContent = image.description;
    clearComments(); // очищаем комментарии
    commentsCounter = 0; // обнуляем переменную, чтобы счетчик комментариев не накапливался
    createComments(image.comments); // создаем комментарии
    document.addEventListener('keydown', onOverlayEscKeydown); // добавляем обработчик на закрытие окна по кнопке Esc
    overlayCloseButton.addEventListener('click', closeOverlay); // добавляем обработчик на закрытие оверлея по клику
  }

  // функция закрытия оверлея
  function closeOverlay (evt) {
    evt.preventDefault();
    overlay.classList.add('hidden'); // скрываем наложение
    document.body.classList.remove('modal-open'); // возвращаем скролл
    clearComments(); // очищаем комментарии
    document.removeEventListener('keydown', onOverlayEscKeydown); // убираем обработчик на закрытие окна по кнопке Esc
    overlayCloseButton.removeEventListener('click', closeOverlay); // убираем обработчик на закрытие окна по клику
    commentsLoader.removeEventListener('click', addDefiniteComments); // убираем обработчик на кнопку загрузки комментариев
  }

  // функция закрытия оверлея (по нажатию кнопки Esc)
  function onOverlayEscKeydown (evt) {
    if (evt.key === 'Escape') {
      closeOverlay(evt);
    }
  }

  // функция очистки комментариев
  function clearComments () {
    commentsContainer.textContent = ''; //удаляем все комментарии
  }

  // функция создания комментариев
  function createAllComments (comments, totalComments) {
    const templateFragment = document.querySelector('#comment').content; // шаблон комментария (фрагмент)
    const template = templateFragment.querySelector('.social__comment'); // весь шаблон комментария
    const fragment = document.createDocumentFragment(); // создаем область document fragment

    comments.forEach((element) => {
      const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
      const templatePicture = templateElement.querySelector('.social__picture'); // доступ к тегу img
      const templateText = templateElement.querySelector('.social__text'); // доступ к текстовому полю
      templatePicture.src = element.avatar; // путь до аватара
      templatePicture.alt = element.name; // комментатор
      templateText.textContent = element.message; // текст комментария

      fragment.appendChild(templateElement); // добавляем элемент в document fragment
      commentsCounter++; // увеличиваем счетчик окмментария
    });

    commentsContainer.appendChild(fragment); // добавляем document fragment в разметку
    commentsCount.textContent = `${commentsCounter} из ${totalComments} комментариев`;
  }

  // функция отображения комментариев
  function createComments (comments) {
    const commentsArrayCopy = comments.slice();
    const totalComments = comments.length;

    if (commentsArrayCopy.length <= 5) {
      createAllComments(commentsArrayCopy, totalComments);
      commentsLoader.classList.add('hidden');
      return;
    }

    addDefiniteComments = function createDefiniteComments () {
      createAllComments(commentsArrayCopy.splice(0, 5), totalComments);

      if (commentsArrayCopy.length === 0) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', addDefiniteComments); // убираем обработчик на кнопку загрузки комментариев
      }
    };

    createAllComments(commentsArrayCopy.splice(0, 5), totalComments);
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', addDefiniteComments); // добавляем обработчик на кнопку загрузки комментариев

  }

  // обработчик событий на открытие оверлея
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.dataset.id) { // создаем обработчик только для тех элементов родителя, которые имеют атрибут data-id
      evt.preventDefault(); // убираем действие по умолчанию, чтобы при клике браузер не перекидывал в начало страницы
      const id = evt.target.dataset.id; // создаем переменную, куда записываем значение data атрибута
      const image = data.find((item) => +id === item.id); // если в массиве данных найдется такое же значение ключа id, что и в data-id, то приравниваем их
      openOverlay(image); // таким образом, находим одинаковые data-id в разметке, и id в массиве, и через функцию openOverlay отображаем данные
    }
  });
}


// экспортируем функцию в main
export {viewFullImage};
