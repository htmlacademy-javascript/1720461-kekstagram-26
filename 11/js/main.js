import {showInfoMessage} from './utils.js';
import {createImages} from './create-images.js';
import {viewFullImage} from './overlay.js';
import {addNewImage, validateForm} from './form.js';
import {getData} from './network.js';
import {applyFilter} from './filters.js';


/* делаем вызов функций */
getData(createImages, showInfoMessage);
getData(viewFullImage, showInfoMessage);
addNewImage();
validateForm();
applyFilter();

