// константы
const TIME_DELAY = 4000;


// функция выбирает случайное число из заданного диапазона
function getRandomNumber(minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0) {
    return Math.round((maxNumber - minNumber) * Math.random() + minNumber);
  }
  throw new Error ('Введены отрицательные числа');
}


// функция выбирает случайный элемент из заданного массива
function getRandomArrayElement (array) {
  return array[getRandomNumber(0, array.length - 1)];
}


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
function showInfoMessage () {
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
  messageContainer.textContent = 'Ошибка загрузки данных. Попробуйте еще раз.';

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, TIME_DELAY);
}


// функция устранения дребезга
function debounce (callback, timeoutDelay) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


// экспортируем функции
export {getRandomArrayElement, showErrorMessage, showSuccessMessage, showInfoMessage, debounce};
