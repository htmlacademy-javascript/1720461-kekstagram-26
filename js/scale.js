// селекторы на необходимые элементы
const imagePreview = document.querySelector('.img-upload__preview img'); // селектор на масштабируемое изображение
const scale = document.querySelector('.img-upload__scale'); // селектор на весь элемент масштаба
const scaleSmallerButton = scale.querySelector('.scale__control--smaller'); // селектор на кнопку уменьшения масштаба
const scaleBiggerButton = scale.querySelector('.scale__control--bigger'); // селектор на кнопку увеличения масштаба
const scaleField = scale.querySelector('.scale__control--value'); // селектор на поле показа текущего масштаба

let onSmallerScaleButtonClick = null;
let onBiggerScaleButtonClick = null;

// функция, отвечающая за изменение масштаба
function changeScale () {
  const scaleStep = 0.25;
  let scaleCurrent = 1;

  function scaleTransform () {
    scaleField.value = `${scaleCurrent*100}%`;
    imagePreview.style.transform = `scale(${scaleCurrent})`;
    imagePreview.style.transition = '0.2s';
  }

  scaleField.value = '100%';
  imagePreview.style.transform = 'scale(1)';

  onSmallerScaleButtonClick = function decreaseScale () {
    if (scaleCurrent > 0.25) {
      scaleCurrent -= scaleStep;
      scaleTransform();
    }
  };

  onBiggerScaleButtonClick = function increaseScale () {
    if (scaleCurrent < 1) {
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
