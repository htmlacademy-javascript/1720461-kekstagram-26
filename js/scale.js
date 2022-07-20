// селекторы на необходимые элементы
const imagePreview = document.querySelector('.img-upload__preview img'); // селектор на масштабируемое изображение
const scale = document.querySelector('.img-upload__scale'); // селектор на весь элемент масштаба
const scaleSmallerButton = scale.querySelector('.scale__control--smaller'); // селектор на кнопку уменьшения масштаба
const scaleBiggerButton = scale.querySelector('.scale__control--bigger'); // селектор на кнопку увеличения масштаба
const scaleCustomField = scale.querySelector('.scale__control--value'); // селектор на поле показа текущего масштаба


// функция, отвечающая за изменение масштаба
function changeScale () {
  imagePreview.style = 'transform: scale(1)';

  function onSmallerScaleButtonClick () {
    console.log('Привет, я из модуля масштаба!');
    imagePreview.style = 'transform: scale(0.75)';
  }

  function onBiggerScaleButtonClick () {
    console.log('Привет, я из модуля масштаба!');
    imagePreview.style = 'transform: scale(1)';
  }


  scaleSmallerButton.addEventListener('click', onSmallerScaleButtonClick); // при запуске функции добавляем обработчик на элемент изменения масштаба
  scaleBiggerButton.addEventListener('click', onBiggerScaleButtonClick); // при запуске функции добавляем обработчик на элемент изменения масштаба
  //scaleCustomField.addEventListener('click', ); // при запуске функции добавляем обработчик на элемент изменения масштаба



}

export {changeScale};
