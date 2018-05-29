import Content from './Content.js';

import LinkField from '../Fields/LinkField.js';
import TextField from '../Fields/TextField.js';
import AlignField from '../Fields/AlignField.js';
import SizeField from '../Fields/SizeField.js';
import PaddingField from '../Fields/PaddingField.js';

export default class Image extends Content {
  constructor(elm) {
    super(elm);
    this.type = 'image';
    this.formData = {
      link: '',
      alt: '',
      alignment: '',
      size: 0,
      padding: {
        all: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
    };

    this.init();
  }

  init() {
    this.fields.push(new LinkField(this));
    this.fields.push(new TextField(this, 'Will be set for Alt and Title attributes'));
    this.fields.push(new AlignField(this));
    this.fields.push(new SizeField(this));
    this.fields.push(new PaddingField(this));
  }
}