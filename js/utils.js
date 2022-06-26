/* функция выбирает случайное число из заданного диапазона */
function getRandomNumber(minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0) {
    return Math.round((maxNumber - minNumber) * Math.random() + minNumber);
  }
  throw new Error ('Введены отрицательные числа');
}


/* функция выбирает случайный элемент из заданного массива */
function getRandomArrayElement (array) {
  return array[getRandomNumber(0, array.length - 1)];
}


export {getRandomNumber};
export {getRandomArrayElement};
