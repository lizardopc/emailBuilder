import Image from './Image.js';

/**
 * ContentFactory class responsible for 
 * instantiating a Content element
 * based on its type.
 * 
 * @class ContentFactory
 */
export default class ContentFactory {
  constructor() {}

  createContent(type, elm) {
    let content;

    if (type === 'image') {
      content = new Image(elm);
    } else if (type === 'text') {
      // Text Content
    } else if (type === 'button') {
      // Button Content
    } else if (type === 'spacer') {
      // Spacer Content
    }

    return content;
  }
}