/* функция проверяет максимальную длину заданной строки, возвращает true или false */
/*
function hasAllowedStringLength(string, maxLength) {
  if (typeof string === 'string') {
    if (string.length <= maxLength) {
      return true;
    }
    return false;
  }
  throw new Error ('Введены некорректные данные');
}

hasAllowedStringLength('Стас, ты молодец!', 17);
*/

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_NAME = [
  'Неопознанный Кекс',
  'Лосняшийся Енот',
  'Одаренный чувак',
  'Диванный эксперт',
  'Вдумчивый комментатор',
  'Квантовый анализатор',
  'Иностранный шпион',
  'Просветленный мудрец',
  'Терпеливый агитатор'
];

const DESCRIPTION = [
  'глаза мои б этого не видели',
  'описание рандомной фотографии',
  'сложно описывать то, чего не видишь',
  'и это тоже описание',
  'спрячь это и не показывай другим',
  'еще одно описание',
  'а это рандомное описание №7 для рандомной фотки',
  'увидел бы это раньше, то поступил бы по-другому',
  'еще одно случайное описание фотографии',
  'мама раньше запрещала мне смотреть это'
];


const commentsArray = [];
const generatedArray = [];


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

function createCommentsArray (count) {
  for (let i = 1; i <= count; i++) {
    commentsArray.push({
      id: i,
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomArrayElement(COMMENT_MESSAGE),
      name: getRandomArrayElement(COMMENT_NAME)
    });
  }
  return commentsArray;
}

function createMainArray (count) {
  for (let i = 1; i <= count; i++) {
    generatedArray.push({
      id: i,
      url: 'photos/' + i + '.jpg',
      description: getRandomArrayElement(DESCRIPTION),
      likes: getRandomNumber(15, 200),
      comments: commentsArray[i - 1]
  })
  }
  return generatedArray;
}


let consoleVar1 = createCommentsArray(25)
let consoleVar2 = createMainArray(25)
console.log(consoleVar2)


/*
    id; , // это число от 1 до 25. Идентификаторы не должны повторяться.
    url: '', // адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
    description: '', // описание фотографии. Описание придумайте самостоятельно.
    likes: , // случайное число от 15 до 200.
    comments: [] // массив объектов — список комментариев
    /* {
  id: 135, // случайное число. Идентификаторы не должны повторяться.
  avatar: 'img/avatar-6.svg', // строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg.
  message: 'В целом всё неплохо. Но не всё.', // взять одно или два случайных предложения из представленных.
  name: 'Артём', // имена авторов также должны быть случайными. набор имён для комментаторов составьте сами.
  } */
