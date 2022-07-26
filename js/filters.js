import {createImages} from './create-images.js';


function applyFilter () {
  const filtersElement = document.querySelector('.img-filters');
  filtersElement.classList.remove('img-filters--inactive');

  const filtersContainer = filtersElement.querySelector('.img-filters__form');

  const filterDefault = filtersElement.querySelector('#filter-default');
  const filterRandom = filtersElement.querySelector('#filter-random');
  const filterDiscussed = filtersElement.querySelector('#filter-discussed');

  const allFilters = [filterDefault, filterRandom, filterDiscussed];

  //console.log(allFilters);
  //console.log(filtersContainer);


  function applyCSSStylesToActiveFilter (evt) {
    allFilters.forEach((element) => {
      element.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  }



  filtersContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.id === 'filter-default') {
      applyCSSStylesToActiveFilter(evt);

    }
    if (evt.target.id === 'filter-random') {
      applyCSSStylesToActiveFilter(evt);
    }
    if (evt.target.id === 'filter-discussed') {
      applyCSSStylesToActiveFilter(evt);
    }



  });


}

export {applyFilter};



// // функция устранения дребезга
// function debounce (callback, timeoutDelay = 500) {
//   // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
//   // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
//   let timeoutId;

//   return (...rest) => {
//     // Перед каждым новым вызовом удаляем предыдущий таймаут,
//     // чтобы они не накапливались
//     clearTimeout(timeoutId);

//     // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

//     // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
//     // пока действие совершается чаще, чем переданная задержка timeoutDelay
//   };
// }


