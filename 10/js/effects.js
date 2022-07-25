// селекторы на необходимые элементы
const imagePreview = document.querySelector('.img-upload__preview img'); // селектор на изображение, на которое будет применен эффект
const effectsList = document.querySelector('.effects__list'); // селектор на родительский контейнер элементов с эффектами
const slider = document.querySelector('.img-upload__effect-level'); // селектор на весь элемент слайдера
const sliderValue = slider.querySelector('.effect-level__value'); // селектор на поле с текущим значением слайдера
const sliderBar = slider.querySelector('.effect-level__slider'); // селектор полоски слайдера

let chooseEffectContainer = null; // здесь будет функция chooseEffect; переменная нужна из-за того, что эта функция объявлена внутри другой функции

// функция, отвечающая за применение и изменение эффектов
function chooseEffects () {

  // функция очистки
  function clear () {
    slider.classList.remove('hidden'); // показываем слайдер, в случае, если предыдущий эффект был 'Оригинал' и необходимо его отобразить
    imagePreview.style.filter = ''; // очищаем свойство 'фильтр' перед применением нового эффекта
    imagePreview.classList = ''; // очищаем классы перед добавлением нового
  }

  // функция применения эффекта
  function onImageEffectUpdate (effectValue) {
    sliderValue.value = sliderBar.noUiSlider.get(); // получаем значение слайдера из noUiSlider и присваиваем это значение полю sliderValue
    imagePreview.style.filter = effectValue; // присваиваем свойству 'фильтр' значение, которое передадим в функцию
  }

  // функция применения эффекта 'Хром'
  function onImageChromeEffectUpdate () {
    onImageEffectUpdate(`grayscale(${sliderValue.value})`); // передаем в функцию значение для применения эффекта 'Хром'
  }

  // функция применения эффекта 'Сепия'
  function onImageSepiaEffectUpdate () {
    onImageEffectUpdate(`sepia(${sliderValue.value})`); // передаем в функцию значение для применения эффекта 'Сепия'
  }

  // функция применения эффекта 'Марвин'
  function onImageMarvinEffectUpdate () {
    onImageEffectUpdate(`invert(${sliderValue.value}%)`); // передаем в функцию значение для применения эффекта 'Марвин'
  }

  // функция применения эффекта 'Фобос'
  function onImagePhobosEffectUpdate () {
    onImageEffectUpdate(`blur(${sliderValue.value}px)`); // передаем в функцию значение для применения эффекта 'Фобос'
  }

  // функция применения эффекта 'Зной'
  function onImageHeatEffectUpdate () {
    onImageEffectUpdate(`brightness(${sliderValue.value})`); // передаем в функцию значение для применения эффекта 'Зной'
  }

  // функция выбора эффекта
  chooseEffectContainer = function chooseEffect (evt) {
    if (evt.target.id === 'effect-none') { // если выбран эффект 'Оригинал'
      clear(); // очищаем классы, свойство фильтр, показываем слайдер, в случае, если он был скрыт
      slider.classList.add('hidden'); // скрываем слайдер, в случае, если выбран эффект 'Оригинал' и необходимо его скрыть
      imagePreview.classList.add('effects__preview--none'); // добавляем необходимый класс
    }

    if (evt.target.id === 'effect-chrome') { // если выбран эффект 'Хром'
      sliderBar.noUiSlider.updateOptions({ // обновляем конфигурацию слайдера
        start: 1,
        step: 0.1,
        range: {
          min: 0,
          max: 1,
        },
        connect: 'lower'
      });

      clear(); // очищаем классы, свойство фильтр, показываем слайдер, в случае, если он был скрыт
      imagePreview.classList.add('effects__preview--chrome'); // добавляем необходимый класс
      sliderBar.noUiSlider.on('update', onImageChromeEffectUpdate); // добавляем обработчик на эффект 'Хром'
    }

    if (evt.target.id === 'effect-sepia') {
      sliderBar.noUiSlider.updateOptions({
        start: 1,
        step: 0.1,
        range: {
          min: 0,
          max: 1,
        },
        connect: 'lower'
      });

      clear();
      imagePreview.classList.add('effects__preview--sepia');
      sliderBar.noUiSlider.on('update', onImageSepiaEffectUpdate);
    }

    if (evt.target.id === 'effect-marvin') {
      sliderBar.noUiSlider.updateOptions({
        start: 100,
        step: 1,
        range: {
          min: 0,
          max: 100,
        },
        connect: 'lower'
      });

      clear();
      imagePreview.classList.add('effects__preview--marvin');
      sliderBar.noUiSlider.on('update', onImageMarvinEffectUpdate);
    }

    if (evt.target.id === 'effect-phobos') {
      sliderBar.noUiSlider.updateOptions({
        start: 3,
        step: 0.1,
        range: {
          min: 0,
          max: 3,
        },
        connect: 'lower'
      });

      clear();
      imagePreview.classList.add('effects__preview--phobos');
      sliderBar.noUiSlider.on('update', onImagePhobosEffectUpdate);
    }

    if (evt.target.id === 'effect-heat') {
      sliderBar.noUiSlider.updateOptions({
        start: 3,
        step: 0.1,
        range: {
          min: 1,
          max: 3,
        },
        connect: 'lower'
      });

      clear();
      imagePreview.classList.add('effects__preview--heat');
      sliderBar.noUiSlider.on('update', onImageHeatEffectUpdate);
    }
  };

  clear(); // очистим все один раз перед первым запуском модуля
  slider.classList.add('hidden'); // скроем слайдер, т.к. по умолчанию выбран эффект 'Оригинал'

  noUiSlider.create(sliderBar, { // инициализируем один раз слайдер перед первым запуском модуля
    start: 100,
    step: 1,
    range: {
      min: 0,
      max: 100,
    },
    connect: 'lower'
  });

  effectsList.addEventListener('click', chooseEffectContainer); // добавим обработчик на выбор эффекта из списка

}

// функция, убирающая слайдер и обработчик
function deleteSlider () {
  effectsList.removeEventListener('click', chooseEffectContainer); // при закрытии формы убираем обработчик
  sliderBar.noUiSlider.destroy(); // а также удаляем слайдер
}


// экпортируем в form.js
export {chooseEffects, deleteSlider};
