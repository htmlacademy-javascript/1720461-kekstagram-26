import {createImages} from './create-images.js';
import {viewFullImage} from './overlay.js';
import {addNewImage, validateForm} from './form.js';
import {getData} from './network.js';


/* делаем вызов функций */
getData(createImages);
getData(viewFullImage);
addNewImage();
validateForm();
