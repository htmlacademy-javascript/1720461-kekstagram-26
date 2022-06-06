/* функция выбирает случайное число из заданного диапазона */
function getRandomNumber(minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0) {
    return Math.round((maxNumber - minNumber) * Math.random() + minNumber);
  }
  // Могу временно оставить? Оказывается, и alert тоже нельзя))
  return console.log('Введены отрицательные числа');
}


/* функция проверяет максимальную длину заданной строки, возвращает true или false */
function hasAllowedStringLength(string, maxLength) {
  const stringLength = String(string).length;
  if (stringLength <= maxLength) {
    return true;
  }
  return false;
}


getRandomNumber(1, 100);
hasAllowedStringLength('Стас, ты молодец!', 17);
