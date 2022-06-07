/* функция выбирает случайное число из заданного диапазона */
function getRandomNumber(minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0) {
    return Math.round((maxNumber - minNumber) * Math.random() + minNumber);
  }
  throw new Error ('Введены отрицательные числа');
}


/* функция проверяет максимальную длину заданной строки, возвращает true или false */
function hasAllowedStringLength(string, maxLength) {
  if (typeof string === 'string') {
    return string.length <= maxLength;
  }
  return false;
}


hasAllowedStringLength('Стас, ты молодец!', 17);
getRandomNumber(1, 100);
