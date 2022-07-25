import {closeModal} from './form.js';



// функция отображения информационного сообщения в случае ошибки загрузки данных
function showErrorMessage () {

  const fragment = document.createDocumentFragment(); // создаем область document fragment
  const messageContainer = document.querySelector('body'); // элемент, куда будем вставлять сообщение
  const templateFragment = document.querySelector('#error').content; // шаблон (фрагмент)
  const template = templateFragment.querySelector('.error'); // весь шаблон ошибки загрузки
  const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
  fragment.appendChild(templateElement); // добавляем копию в область document fragment
  messageContainer.appendChild(fragment); // добавляем document fragment в разметку

  const formModal = document.querySelector('.img-upload__overlay');
  formModal.classList.add('hidden'); // скрываем модальное окно

  const errorMessage = document.querySelector('.error');
  const errorMessageCloseButton = document.querySelector('.error__button');
  const submitButton = document.querySelector('.img-upload__submit'); // кнопка отправки формы

  function onErrorMessageCloseButtonClick () {
    errorMessage.classList.add('hidden');
    formModal.classList.remove('hidden');
    submitButton.disabled = false; // делаем кнопку отправки формы активной
    errorMessageCloseButton.removeEventListener('click', onErrorMessageCloseButtonClick);
  }


  errorMessageCloseButton.addEventListener('click', onErrorMessageCloseButtonClick);

}


// функция отображения информационного сообщения в случае успешной загрузки данных
function showSuccessMessage () {

  closeModal();

  const fragment = document.createDocumentFragment(); // создаем область document fragment
  const messageContainer = document.querySelector('body'); // элемент, куда будем вставлять сообщение
  const templateFragment = document.querySelector('#success').content; // шаблон (фрагмент)
  const template = templateFragment.querySelector('.success'); // весь шаблон успешной загрузки
  const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
  fragment.appendChild(templateElement); // добавляем копию в область document fragment
  messageContainer.appendChild(fragment); // добавляем document fragment в разметку

  const successMessage = document.querySelector('.success');
  const successMessageCloseButton = document.querySelector('.success__button');

  function onSuccessMessageCloseButtonClick () {
    successMessage.classList.add('hidden');
    successMessageCloseButton.removeEventListener('click', onSuccessMessageCloseButtonClick);
  }


  successMessageCloseButton.addEventListener('click', onSuccessMessageCloseButtonClick);
}


/* экспортируем функцию */
export {showErrorMessage, showSuccessMessage};
