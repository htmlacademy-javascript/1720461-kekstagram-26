/* импортируем необходимую функцию */
import {createPhotos} from './photo.js';
import {generatedPicturesArray} from './data.js';
import {viewGalleryHandler} from './gallery.js';


/* запускаем функции */
createPhotos(generatedPicturesArray);
viewGalleryHandler();
