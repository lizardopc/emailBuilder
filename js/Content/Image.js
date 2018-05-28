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

    this.link = new LinkField(this);
    this.altText = new TextField(this);
    this.alignment = new AlignField(this);
    this.size = new SizeField(this);
    this.padding = new PaddingField(this);
  }
}