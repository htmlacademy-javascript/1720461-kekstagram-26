/* функция валидации формы */
function validateForm () {

  const form = document.querySelector('.img-upload__form'); // селектор на всю форму
  const formUploadInput = form.querySelector('#upload-file'); // инпут загрузки нового файла
  const formModal = form.querySelector('.img-upload__overlay'); // модальное окно редактирования загруженного изображения
  const formCloseButton = form.querySelector('.img-upload__cancel'); // кнопка закрытия модального окна

  const hashTagInput = form.querySelector('.text__hashtags'); // текстовое поле "Хештег"
  const commentInput = form.querySelector('.text__description'); // текстовое поле "Комментарий"
  const submitButton = form.querySelector('.img-upload__submit'); // кнопка отправки формы (submit)


  formUploadInput.addEventListener('change', (evt) => { // подписываемся на change
    formModal.classList.remove('hidden'); // показываем модальное окно
    document.body.classList.add('modal-open'); // добавляем body класс modal-open

    formCloseButton.addEventListener('click', () => {
      formModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    });
  });

  // /* обработчик события на закрытие модального окна по нажатию кнопки Esc */
  // document.addEventListener('keydown', (evt) => { // создаем обработчик события на закрытие модального окна
  //   if (evt.key === 'Escape') { // добавим условие скрытия
  //     formModal.classList.add('hidden'); // скрываем модальное окно
  //     document.body.classList.remove('modal-open'); // убираем у body класс modal-open
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

  function validatehashTagInput(value) {

  }

  function validateCommentInput(value) {
    return value.length <= 140;
  }

  pristine.addValidator(hashTagInput, validateCommentInput, 'От 2 до 50 символов');
  pristine.addValidator(commentInput, validateCommentInput, 'Длина комментария ограничена 140 символами');


  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      form.submit();
      submitButton.disabled = true;
    }
  });




  //console.log('changes are have been made!');

  // создаем валидацию для текстового поля Комментарий
  // создаем валидацию для тестового поля Хештег
  // заблокировать кнопку submit после отправки
  // закрытие формы
  // сброс инпута
  // сброс необходимых обработчиков


}


export {validateForm};
