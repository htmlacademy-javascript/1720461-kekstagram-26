// селекторы для открытия и закрытия модального окна
const form = document.querySelector('.img-upload__form'); // селектор на всю форму
const formUploadInput = form.querySelector('#upload-file'); // инпут загрузки нового файла
const formModal = form.querySelector('.img-upload__overlay'); // модальное окно редактирования загруженного изображения
const formCloseButton = form.querySelector('.img-upload__cancel'); // кнопка закрытия модального окна

// селекторы для валидации формы
const hashTagInput = form.querySelector('.text__hashtags'); // текстовое поле "Хештег"
const commentInput = form.querySelector('.text__description'); // текстовое поле "Комментарий"
const submitButton = form.querySelector('.img-upload__submit'); // кнопка отправки формы (submit)


// функция загрузки нового изображения и работы с формой
function newImageHandler () {

  // функция открытия модального окна
  function openModal () {
    formModal.classList.remove('hidden'); // показываем модальное окно
    document.body.classList.add('modal-open'); // скрываем скролл
  }

  // функция закрытия модального окна
  function closeModal () {
    formModal.classList.add('hidden'); // скрываем модальное окно
    document.body.classList.remove('modal-open'); // возвращаем скролл
    formUploadInput.value = ''; // сбрасываем значение инпута загрузки изображения
    document.removeEventListener('keydown', onOverlayEscKeydown); // убираем обработчик на закрытие окна по кнопке Esc
  }

  // функция закрытия модального окна по нажатию кнопки Esc
  function onOverlayEscKeydown (evt) {
    if (evt.key === 'Escape') { // добавим условие скрытия
      closeModal();
    }
  }

  formUploadInput.addEventListener('change', () => { // добавляем обработчик на change, чтобы отследить добавление новой картинки пользователем
    openModal();
    formCloseButton.addEventListener('click', () => { // при добавлении новой картинки добавляем обработчик на закрытие модального окна
      closeModal();
    });
    document.addEventListener('keydown', onOverlayEscKeydown); // при добавлении новой картинки добавляем обработчик на закрытие окна по кнопке Esc
  });

  // добавить: игнорирование Esc при фокусе на поле комментария, игнорирование Esc при фокусе на поле хештега
}


// функция валидации формы
function validateForm () {
  const pristine = new Pristine(form, { // добавляем новый экземпляр валидации формы Pristine
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text-error'
  });

  // функция валидации поля "Хештег"
  function validateHashTagInput(value) {
    if (value === '') { // проверяем наличие заполненности поля, если поле пустое, пропускаем валидацию и...
      return true; // ...возвращаем true
    }

    value = String(value).toLowerCase(); // приводим входные данные к одному регистру, в случае, когда входные данные в разных регистрах
    const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/; // добавляем условие проверки в виде регулярного выражения
    const hashTagsArray = value.split(' '); // создаем из набора хештегов массив, в случае, если хештегов больше, чем один

    for (let i = 1; i <= hashTagsArray.length; i++) { // создаем цикл, чтобы найти повторяющиеся хештеги в массиве
      const elementToCompare = hashTagsArray[0]; // создадим переменную, с которой начнем сравнение с другими элементами массива
      if (elementToCompare === hashTagsArray[i]) { // если в массиве нашлись одинаковые элементы...
        return false; // ...возвращаем false
      } else { // если одинаковых элементов нет, то выполняем оставшуюся валидацию:
        if (hashTagsArray.length <= 5) { // создаем цикл, чтобы отследить количество элементов в массиве, если элементов меньше 5, то выполняем оставшуюся валидацию
          const checkResult = hashTagsArray.every((arrayElement) => regExp.test(arrayElement)); // с помощью метода .every() проверим, что все элементы проходят валидацию
          return checkResult; // если все элементы проходят валидацию, возвращаем true, если хоть один не прошел валидацию, то тогда возвращаем false
        } else {
          return false; // если элементов в массиве больше 5, возвращаем false
        }
      }
    }
  }

  // функция валидации поля "Комментарий"
  function validateCommentInput(value) {
    return value.length <= 140; // добавляем условие и возвращаем значение
  }

  // добавляем валидаторы
  pristine.addValidator(hashTagInput, validateHashTagInput, 'Хештеги: начинаются с \'#\', разделяются пробелом, регистр не важен, без спецсимволов и повторов, макс. длина - 20 символов, макс. - 5 хештегов');
  pristine.addValidator(commentInput, validateCommentInput, 'Длина комментария ограничена 140 символами');

  form.addEventListener('submit', (evt) => { // добавляем обработчик на кнопку отправки формы
    evt.preventDefault(); // отменяем действие по умолчанию, чтобы не дать форме отправиться с любыми данными, в том числе, и с некорректными

    const isValid = pristine.validate(); // запускаем валидацию

    if (isValid) { // если валидация пройдена успешно
      form.submit(); // отправляем данные
      submitButton.disabled = true;  // блокируем кнопку submit после отправки
    }
  });
}


export {newImageHandler, validateForm};
