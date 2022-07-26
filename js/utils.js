// функция отображения информационного сообщения в случае ошибки отправки данных
function showErrorMessage () {
  const fragment = document.createDocumentFragment(); // создаем область document fragment
  const messageContainer = document.querySelector('body'); // элемент, куда будем вставлять сообщение
  const templateFragment = document.querySelector('#error').content; // шаблон (фрагмент)
  const template = templateFragment.querySelector('.error'); // весь шаблон ошибки загрузки
  const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
  fragment.appendChild(templateElement); // добавляем копию в область document fragment
  messageContainer.appendChild(fragment); // добавляем document fragment в разметку
}


// функция отображения информационного сообщения в случае успешной отправки данных
function showSuccessMessage () {
  const fragment = document.createDocumentFragment(); // создаем область document fragment
  const messageContainer = document.querySelector('body'); // элемент, куда будем вставлять сообщение
  const templateFragment = document.querySelector('#success').content; // шаблон (фрагмент)
  const template = templateFragment.querySelector('.success'); // весь шаблон успешной загрузки
  const templateElement = template.cloneNode(true); // копируем новый элемент из шаблона
  fragment.appendChild(templateElement); // добавляем копию в область document fragment
  messageContainer.appendChild(fragment); // добавляем document fragment в разметку
}


// функция отображения информационного сообщения в случае ошибки загрузки данных
function showGetDataErrorMessage () {
  const messageContainer = document.createElement('div');
  messageContainer.style.zIndex = '10';
  messageContainer.style.position = 'absolute';
  messageContainer.style.left = '0';
  messageContainer.style.top = '0';
  messageContainer.style.right = '0';
  messageContainer.style.padding = '16px 12px';
  messageContainer.style.fontSize = '30px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = 'red';
  messageContainer.textContent = 'Не удалось получить данные. Попробуйте еще раз';

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, 4000);
}


/* экспортируем функции */
export {showErrorMessage, showSuccessMessage, showGetDataErrorMessage};
