/* импортируем необходимые функции */
import {getRandomNumber} from './utils.js';
import {getRandomArrayElement} from './utils.js';


/* создаем данные для генерации */
const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'От качества этого фото где-то в углу плачет один фотограф',
  'Надоело пахать на дядю? Нет денег? Тогда мы поможем! Предлагаем стабильную работу в динамично развивающейся компании, все подробности на сайте www.zakladki.est',
  'В целом всё плохо. Но не всё.',
  'Огонь!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Хорошая фотография и фотограф отличный!',
  'Это фото наполнило мне о детстве',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Эти улыбающиеся люди на фото выглядят довольно стремно...',
  'Это фото подойдет для семейного альбома, но зачем нужно было выкладывать ее на всеобщее обозрение?!',
  'Вы точно хотите стать фотографом?',
  'Жаль нельзя вернуть пленочную фотографию, тогда количество подобных кадров резко уменьшилось бы'
];


const COMMENT_NAME = [
  'Неопознанный Кекс',
  'Лосняшийся Енот',
  'Одаренный чувак',
  'Диванный эксперт',
  'Вдумчивый комментатор',
  'Иностранный агент',
  'Просветленный мудрец',
  'Терпеливый агитатор',
  'Токсичный воин',
  'Наглец, на дуде игрец',
  'Чел, который всех бесит',
  'Накидывает на вентилятор'
];


const DESCRIPTION = [
  'глаза мои б этого не видели',
  'будь я на 20 лет моложе, то наверное начал бы завидовать',
  'сложно описывать то, чего не видишь',
  'это описание могло не появиться на свет, но ему повезло',
  'спрячь это и не показывай другим',
  'это не повод творить такое!',
  'а это рандомное описание №7 для рандомной фотки',
  'увидел бы это раньше, то поступил бы по-другому',
  'еще одно случайное описание фотографии',
  'мама раньше запрещала мне смотреть это',
  'пройдут года, и вы будете жалеть об этом'
];


/* создаем счетчик */
let counterForID = 1;
const generatedImagesArray = [];


/* функция создает один комментарий */
function createComment () {
  return {
    id: counterForID++,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENT_MESSAGE),
    name: getRandomArrayElement(COMMENT_NAME)
  };
}


/* функция создает одну картинку и добавляет случайное количество комментариев (от 1 до 5) */
function createOneImageItem (id) {
  return ({
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(0, 11)}, createComment)
  });
}


/* функция создает массив картинок с необходимым количеством итераций */
function generateImagesDataArray (count) {

  for (let i = 1; i <= count; i++) {
    generatedImagesArray.push(createOneImageItem(i));
  }
  return generatedImagesArray;
}


/* запускаем функцию */
generateImagesDataArray(25);


/* экспортируем массив в main */
export {generatedImagesArray};
