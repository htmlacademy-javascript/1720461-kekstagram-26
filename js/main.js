/* импортируем необходимые функции */
import {createImages} from './create-images.js';
//import {generatedImagesArray} from './data.js';
import {viewFullImage} from './overlay.js';
import {addNewImage, validateForm, closeModal} from './form.js';


fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => {
    createImages(data);
    viewFullImage(data);
  });






/* делаем вызов функций */
// createImages();
// viewFullImage();
addNewImage();
validateForm(closeModal);
