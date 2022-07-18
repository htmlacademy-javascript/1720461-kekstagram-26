/* импортируем необходимые функции */
import {createImages} from './create-images.js';
import {generatedImagesArray} from './data.js';
import {viewFullImage} from './overlay.js';
import {addNewImage, validateForm} from './form.js';


/* делаем вызов функций */
createImages(generatedImagesArray);
viewFullImage(generatedImagesArray);
addNewImage();
validateForm();
