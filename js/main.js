/* импортируем необходимые функции */
import {createPhotos} from './photo.js';
import {generatedPicturesArray} from './data.js';
import {viewGalleryHandler} from './gallery.js';
import {newImageHandler, validateForm} from './form.js';


/* делаем вызов функций */
createPhotos(generatedPicturesArray);
viewGalleryHandler();
newImageHandler();
validateForm();
