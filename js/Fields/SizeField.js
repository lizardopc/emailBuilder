import Field from './Field.js';

export default class SizeField extends Field {
  constructor(content) {
    super(content);
    this.elm = $(`
      <div class="form-group">
        <label class="label-center">Size</label>
        <input type="number" min="50" max="600" class="float-right form-control form-control-inline" />
      </div>
    `);
  }
}