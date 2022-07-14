/* функция валидации формы */
function validateForm () {

  /* селекторы для открытия и закрытия модального окна */
  const form = document.querySelector('.img-upload__form'); // селектор на всю форму
  const formUploadInput = form.querySelector('#upload-file'); // инпут загрузки нового файла
  const formModal = form.querySelector('.img-upload__overlay'); // модальное окно редактирования загруженного изображения
  const formCloseButton = form.querySelector('.img-upload__cancel'); // кнопка закрытия модального окна

  /* селекторы для валидации формы */
  const hashTagInput = form.querySelector('.text__hashtags'); // текстовое поле "Хештег"
  const commentInput = form.querySelector('.text__description'); // текстовое поле "Комментарий"
  const submitButton = form.querySelector('.img-upload__submit'); // кнопка отправки формы (submit)

  /* функция открытия модального окна */
  function openModal () {
    formModal.classList.remove('hidden'); // показываем модальное окно
    document.body.classList.add('modal-open'); // скрываем скролл
  }

  /* функция закрытия модального окна */
  function closeModal () {
    formModal.classList.add('hidden'); // скрываем модальное окно
    document.body.classList.remove('modal-open'); // возвращаем скролл
    formUploadInput.value = ''; // сбрасываем значение инпута загрузки изображения
    document.removeEventListener('keydown', onOverlayEscKeydown); // убираем обработчик на закрытие окна по кнопке Esc
  }

  /* функция закрытия модального окна по нажатию кнопки Esc */
  function onOverlayEscKeydown (evt) {
    if (evt.key === 'Escape') { // добавим условие скрытия
      closeModal();
    }
  }

  // добавляем обработчик на change, чтобы отследить добавление новой картинки пользователем
  formUploadInput.addEventListener('change', () => { //
    openModal();

    // при добавлении новой картинки добавляем обработчик на закрытие модального окна
    formCloseButton.addEventListener('click', () => {
      closeModal();
    });

    // при добавлении новой картинки добавляем обработчик на закрытие окна по кнопке Esc
    document.addEventListener('keydown', onOverlayEscKeydown);
  });


  // /* обработчик события на закрытие модального окна по нажатию кнопки Esc */
  // document.addEventListener('keydown', (evt) => { // создаем обработчик события на закрытие модального окна
  //   if (evt.key === 'Escape') { // добавим условие скрытия
  //     formModal.classList.add('hidden'); // скрываем модальное окно
  //     document.body.classList.remove('modal-open'); // возвращаем скролл
  //   }
  // });

  // const a = document.addEventListener('keydown', (evt) => {
  //   if (commentInput) {
  //     evt.stopPropagation();

  //   }
    // if (evt.key === 'Escape') {
    //   formModal.classList.add('hidden');
    //   document.body.classList.remove('modal-open');
    // }
  //});

  // document.addEventListener('click', () => {

  //   const focusedElement = document.activeElement;
  //   console.log(focusedElement);
  //   if (focusedElement === commentInput) {
  //     console.log('!!!')

  //   }
  // })



  /* валидация */
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    //errorClass: '',
    //successClass: '',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text-error'
  });

  function validatehashTagInput(value) { // создаем функцию проверки хештегов
    value = String(value).toLowerCase();
    const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/; // добавляем условие проверки в виде регулярного выражения
    const hashTagsArray = value.split(' ');
    //console.log(hashTagsArray);

    for (let i = 1; i <= hashTagsArray.length; i++) {
      const elementToCompare = hashTagsArray[0];
      if (elementToCompare === hashTagsArray[i]) {
        return false;
      } else {
        if (hashTagsArray.length <= 5) {
          const checkResult = hashTagsArray.every((arrayElement) => regExp.test(arrayElement));
          return checkResult;
        } else {
          return false;
        }
      }
    }
  }


  /*
  + хэш-тег начинается с символа # (решётка);
  + строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
  + хеш-тег не может состоять только из одной решётки;
  + максимальная длина одного хэш-тега 20 символов, включая решётку;
  + хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
  + хэш-теги разделяются пробелами;
  + один и тот же хэш-тег не может быть использован дважды;
  + нельзя указать больше пяти хэш-тегов;
  + хэш-теги необязательны;
  - если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
  */


  function validateCommentInput(value) {
    return value.length <= 140; // добавляем условие и возвращаем значение
  }

  pristine.addValidator(hashTagInput, validatehashTagInput, 'Хештеги начинаются с #, разделяеются пробелом, без спецсимволов, без повторяющихся хештегов, макс. длина - 20 символов, макс. - 5 хештегов');
  pristine.addValidator(commentInput, validateCommentInput, 'Длина комментария ограничена 140 символами');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) { // если валидация пройдена успешно
      form.submit(); // отправляем данные
      submitButton.disabled = true;  // блокируем кнопку submit после отправки
    }
  });


  //console.log('changes are have been made!');

  // создаем валидацию для текстового поля Комментарий
  // создаем валидацию для тестового поля Хештег
  // игнорирование Esc при фокусе на поле комментария
  // игнорирование Esc при фокусе на поле хештега
}


export {validateForm};

