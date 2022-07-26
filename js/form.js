import {showErrorMessage, showSuccessMessage} from './utils.js';
import {changeScale, deleteScaleHandlers} from './scale.js';
import {chooseEffects, deleteSlider} from './effects.js';
import {sendData} from './network.js';


// селекторы для открытия и закрытия модального окна
const form = document.querySelector('.img-upload__form'); // селектор на всю форму
const formUploadInput = form.querySelector('#upload-file'); // инпут загрузки нового файла
const formModal = form.querySelector('.img-upload__overlay'); // модальное окно редактирования загруженного изображения
const formCloseButton = form.querySelector('.img-upload__cancel'); // кнопка закрытия модального окна

// селекторы для валидации формы
const hashTagInput = form.querySelector('.text__hashtags'); // текстовое поле "Хештег"
const commentInput = form.querySelector('.text__description'); // текстовое поле "Комментарий"
const submitButton = form.querySelector('.img-upload__submit'); // кнопка отправки формы (submit)

let closeModal = null; // объявим переменную для будущей функции closeModal(), чтобы иметь возможность экспортирования данной функции в main.js


// функция загрузки нового изображения и работы с формой
function addNewImage () {

  // функция открытия модального окна
  function openModal () {
    const formUploadImage = form.querySelector('.img-upload__preview img');
    const effectPreviewImage = form.querySelectorAll('.effects__preview');
    const uploadFile = formUploadInput.files[0];
    formUploadImage.src = URL.createObjectURL(uploadFile);

    effectPreviewImage.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(uploadFile)})`;
    });

    formModal.classList.remove('hidden'); // показываем модальное окно
    document.body.classList.add('modal-open'); // скрываем скролл
  }

  // функция закрытия модального окна
  closeModal = function () {
    formModal.classList.add('hidden'); // скрываем модальное окно
    document.body.classList.remove('modal-open'); // возвращаем скролл
    formUploadInput.value = ''; // сбрасываем значение инпута загрузки изображения
    hashTagInput.value = ''; // сбрасываем значение поля хештега
    commentInput.value = ''; // сбрасываем значение поля комментария
    submitButton.disabled = false; // делаем кнопку отправки формы активной
    document.removeEventListener('keydown', onModalEscKeydown); // убираем обработчик на закрытие окна по кнопке Esc
    formCloseButton.removeEventListener('click', onCloseButtonClick); // убираем обработчик на закрытие окна по клику на кнопку закрытия
    deleteSlider(); // вызываем функцию из другого модуля, убираем обработчик для списка эффектов и удаляем слайдер
    deleteScaleHandlers(); // убираем обработчики функции масштаба
  };

  // функция закрытия модального окна по нажатию кнопки Esc
  function onModalEscKeydown (evt) {
    if (evt.key === 'Escape') { // добавим условие скрытия
      if (evt.target !== hashTagInput && evt.target !== commentInput) {
        closeModal();
      }
    }
  }

  // функция закрытия модального окна по клику
  function onCloseButtonClick () {
    closeModal();
  }

  formUploadInput.addEventListener('change', () => { // добавляем обработчик на change, чтобы отследить добавление новой картинки пользователем
    openModal();
    formCloseButton.addEventListener('click', onCloseButtonClick); // при добавлении новой картинки добавляем обработчик на закрытие модального окна
    document.addEventListener('keydown', onModalEscKeydown); // при добавлении новой картинки добавляем обработчик на закрытие окна по кнопке Esc

    changeScale(); // вызываем функцию из другого модуля, которая будет работать с изменением масштаба
    chooseEffects(); // вызываем функцию из другого модуля, которая будет работать с эффектами и слайдером
  });
}


// функция валидации формы
function validateForm () {
  const pristine = new Pristine(form, { // добавляем новый экземпляр валидации формы Pristine
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text-error'
  });

  // функция валидации поля "Хештег" с помощью регулярного выражения
  function validateHashTagWithRegExp (value) {
    if (value === '') { // проверяем наличие заполненности поля, если поле пустое, пропускаем валидацию и...
      return true; // ...возвращаем true
    }
    const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/; // добавляем условие проверки в виде регулярного выражения
    const hashTagsArray = value.trim().split(' '); // создаем из набора хештегов массив, в случае, если хештегов больше, чем один
    const checkResult = hashTagsArray.every((arrayElement) => regExp.test(arrayElement)); // с помощью метода .every() проверим, что все элементы проходят валидацию
    return checkResult; // если все элементы проходят валидацию, возвращаем true, если хоть один не прошел валидацию, то тогда возвращаем false
  }

  // функция валидации поля "Хештег", не более 5 элементов
  function isNoMoreThanFiveElements (value) {
    const hashTagsArray = value.trim().split(' '); // создаем из набора хештегов массив, для подсчета количества хештегов
    if (hashTagsArray.length <= 5) {
      return true;
    } else {
      return false;
    }
  }

  // функция валидации поля "Хештег", без повторяющихся элементов
  function areSameElements (value) {
    value = String(value).toLowerCase(); // приводим входные данные к одному регистру
    const hashTagsArray = value.trim().split(' '); // создаем из набора хештегов массив, для подсчета количества хештегов
    const set = new Set(hashTagsArray);
    if (set.size === hashTagsArray.length) {
      return true;
    } else {
      return false;
    }
  }

  // функция валидации поля "Комментарий"
  function validateCommentMaxLength(value) {
    return value.length <= 140; // добавляем условие и возвращаем значение
  }

  // добавляем валидаторы
  pristine.addValidator(hashTagInput, validateHashTagWithRegExp, 'Хештеги начинаются с \'#\', разделяются пробелом, не содержат спецсимволов, макс. длина - 20 символов');
  pristine.addValidator(hashTagInput, isNoMoreThanFiveElements, 'Максимальное количество хештегов - 5 штук');
  pristine.addValidator(hashTagInput, areSameElements, 'Хештеги не могут повторяться');
  pristine.addValidator(commentInput, validateCommentMaxLength, 'Длина комментария ограничена 140 символами');

  form.addEventListener('submit', (evt) => { // добавляем обработчик на кнопку отправки формы
    evt.preventDefault(); // отменяем действие по умолчанию, чтобы не дать форме отправиться с любыми данными, в том числе, и с некорректными
    const isValid = pristine.validate(); // запускаем валидацию

    if (isValid) { // если валидация пройдена успешно
      submitButton.disabled = true;  // блокируем кнопку submit после однократной отправки формы
      sendData(
        () => {
          showSuccessMessage();
          closeModal();
          submitButton.disabled = false;

          const successMessage = document.querySelector('.success');
          const successMessageCloseButton = document.querySelector('.success__button');

          function onSuccessMessageCloseButtonClick () {
            successMessage.classList.add('hidden');
            successMessage.remove();
            successMessageCloseButton.removeEventListener('click', onSuccessMessageCloseButtonClick);
          }
          successMessageCloseButton.addEventListener('click', onSuccessMessageCloseButtonClick);
        },

        () => {
          showErrorMessage();
          submitButton.disabled = false;
          formModal.classList.add('hidden'); // скрываем модальное окно

          const errorMessage = document.querySelector('.error');
          const errorMessageCloseButton = document.querySelector('.error__button');

          function onErrorMessageCloseButtonClick () {
            formModal.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            errorMessage.remove();
            errorMessageCloseButton.removeEventListener('click', onErrorMessageCloseButtonClick);
          }
          errorMessageCloseButton.addEventListener('click', onErrorMessageCloseButtonClick);
        },

        new FormData(evt.target),
      );
    }
  });
}


export {addNewImage, validateForm, closeModal};
