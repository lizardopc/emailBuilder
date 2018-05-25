import Image from './Image';
import Text from './Text';
import Button from './Button';
import Spacer from './Spacer';

/**
 * ContentFactory class responsible for 
 * instantiating a Content element
 * based on its type.
 * 
 * @class ContentFactory
 */
export default class ContentFactory {
  constructor() {}

  createContent(type) {
    let content;

    if (type === 'image') {
      content = new Image();
    } else if (type === 'text') {
      content = new Text();
    } else if (type === 'button') {
      content = new Button();
    } else if (type === 'spacer') {
      content = new Spacer();
    }

    return content;
  }
}