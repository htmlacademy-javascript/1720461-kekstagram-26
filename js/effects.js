// селекторы на необходимые элементы
const slider = document.querySelector('.img-upload__effect-level'); // селектор на весь элемент слайдера
const sliderValue = slider.querySelector('.effect-level__value'); // селектор на поле с текущим значением слайдера
const sliderBar = slider.querySelector('.effect-level__slider'); // селектор полоски слайдера

const imagePreview = document.querySelector('.img-upload__preview img'); // селектор на изображение, на которое будет применен эффект
const effectsList = document.querySelector('.effects__list'); // селектор на родительский контейнер элементов с эффектами


// функция, отвечающая за применение и изменение эффектов
function chooseEffects () {

  // функция очистки
  function clear () {
    slider.classList.remove('hidden');
    imagePreview.style.filter = '';
    imagePreview.classList = '';
  }

  noUiSlider.create(sliderBar, {
    start: 100,
    step: 1,
    range: {
      min: 0,
      max: 100,
    },
    connect: 'lower'
  });

  slider.classList.add('hidden');

  effectsList.addEventListener('click', (evt) => {
    // не нашел способов оптимизировать код ниже, может у тебя есть варианты? Я так понял .updateOptions обязательно нужен
    if (evt.target.id === 'effect-none') {

      clear();
      slider.classList.add('hidden');
      imagePreview.classList.add('effects__preview--none');
    }

    if (evt.target.id === 'effect-chrome') {
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
      imagePreview.classList.add('effects__preview--chrome');

      sliderBar.noUiSlider.on('update', () => {
        sliderValue.value = sliderBar.noUiSlider.get();
        imagePreview.style.filter = `grayscale(${sliderValue.value})`;
      });
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

      sliderBar.noUiSlider.on('update', () => {
        sliderValue.value = sliderBar.noUiSlider.get();
        imagePreview.style.filter = `sepia(${sliderValue.value})`;
      });
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

      sliderBar.noUiSlider.on('update', () => {
        sliderValue.value = sliderBar.noUiSlider.get();
        imagePreview.style.filter = `invert(${sliderValue.value}%)`;
      });
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

      sliderBar.noUiSlider.on('update', () => {
        sliderValue.value = sliderBar.noUiSlider.get();
        imagePreview.style.filter = `blur(${sliderValue.value}px)`;
      });
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

      sliderBar.noUiSlider.on('update', () => {
        sliderValue.value = sliderBar.noUiSlider.get();
        imagePreview.style.filter = `brightness(${sliderValue.value})`;
      });
    }


  });



}

// функция, уничтожающая слайдер
function destroySlider () {
  sliderBar.noUiSlider.destroy();
}


export {chooseEffects, destroySlider};
