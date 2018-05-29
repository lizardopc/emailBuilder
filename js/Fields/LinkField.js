import Field from './Field.js';

export default class LinkField extends Field {
  constructor(content) {
    super(content);
    this.elm = $(`
      <div class="form-group">
        <label>Image Link</label>
        <input type="text" class="form-control" />
      </div>
    `);
  }
}