/* импортируем необходимые функции */
import {createPhotos} from './photo.js';
import {generatedPicturesArray} from './data.js';
import {viewGalleryHandler} from './gallery.js';
import {validateForm} from './form.js';


/* делаем вызов функций */
createPhotos(generatedPicturesArray);
viewGalleryHandler();
validateForm();
