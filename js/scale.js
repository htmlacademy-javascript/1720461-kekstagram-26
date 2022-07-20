// селекторы на необходимые элементы
const imagePreview = document.querySelector('.img-upload__preview img'); // селектор на масштабируемое изображение
const scale = document.querySelector('.img-upload__scale'); // селектор на весь элемент масштаба
const scaleSmallerButton = scale.querySelector('.scale__control--smaller'); // селектор на кнопку уменьшения масштаба
const scaleBiggerButton = scale.querySelector('.scale__control--bigger'); // селектор на кнопку увеличения масштаба
const scaleField = scale.querySelector('.scale__control--value'); // селектор на поле показа текущего масштаба

let onSmallerScaleButtonClick = null; // здесь будет функция decreaseScale(); переменная нужна из-за того, что эта функция объявлена внутри другой функции
let onBiggerScaleButtonClick = null; // здесь будет функция increaseScale(); переменная нужна из-за того, что эта функция объявлена внутри другой функции

// функция, отвечающая за изменение масштаба
function changeScale () {
  const scaleStep = 0.25; // зададим шаг масштабирования
  let scaleCurrent = 1; // и масштаб по-умолчанию
  scaleField.value = '100%'; //
  imagePreview.style.transform = 'scale(1)';

  // функция расчета масштаба
  function scaleTransform () { // выведем часть вычислений в отдельную функцию, т.к. эти вычисления повторяются
    scaleField.value = `${scaleCurrent*100}%`; // переводим значение в %
    imagePreview.style.transform = `scale(${scaleCurrent})`; // производим масштабирование через css-свойство transform: scale
    imagePreview.style.transition = '0.2s'; // создаем простую анимацию для более удобного восприятия масштабирования
  }

  onSmallerScaleButtonClick = function decreaseScale () { // создадим функцию расчета для кнопки уменьшения масштаба
    if (scaleCurrent > 0.25) { // уменьшаем масштаб, пока текущий не меньше 25%
      scaleCurrent -= scaleStep;
      scaleTransform();
    }
  };

  onBiggerScaleButtonClick = function increaseScale () { // создадим функцию расчета для кнопки увеличения масштаба
    if (scaleCurrent < 1) { // увеличиваем масштаб, пока текущий не больше 100%
      scaleCurrent += scaleStep;
      scaleTransform();
    }
  };

  scaleSmallerButton.addEventListener('click', onSmallerScaleButtonClick); // при запуске функции добавляем обработчик на элемент изменения масштаба
  scaleBiggerButton.addEventListener('click', onBiggerScaleButtonClick); // при запуске функции добавляем обработчик на элемент изменения масштаба
}


// функция, отвечающая за отключение обработчиков
function deleteScaleHandlers () {
  scaleSmallerButton.removeEventListener('click', onSmallerScaleButtonClick);
  scaleBiggerButton.removeEventListener('click', onBiggerScaleButtonClick);
}

export {changeScale, deleteScaleHandlers};
