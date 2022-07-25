// функция отображения информационного сообщения в случае ошибки загрузки данных
function showErrorMessage () {
  const fragment = document.createDocumentFragment(); // создаем область document fragment
  const messageContainer = document.querySelector('body'); // элемент, куда будем вставлять сообщение
  const templateFragment = document.querySelector('#error').content; // шаблон (фрагмент)
  const template = templateFragment.querySelector('.error'); // весь шаблон ошибки загрузки
  const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
  fragment.appendChild(templateElement); // добавляем копию в область document fragment
  messageContainer.appendChild(fragment); // добавляем document fragment в разметку
}


// функция отображения информационного сообщения в случае успешной загрузки данных
function showSuccessMessage () {
  const fragment = document.createDocumentFragment(); // создаем область document fragment
  const messageContainer = document.querySelector('body'); // элемент, куда будем вставлять сообщение
  const templateFragment = document.querySelector('#success').content; // шаблон (фрагмент)
  const template = templateFragment.querySelector('.success'); // весь шаблон успешной загрузки
  const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
  fragment.appendChild(templateElement); // добавляем копию в область document fragment
  messageContainer.appendChild(fragment); // добавляем document fragment в разметку
}


/* экспортируем функции */
export {showErrorMessage, showSuccessMessage};
