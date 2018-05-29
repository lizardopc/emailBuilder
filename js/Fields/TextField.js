import Field from './Field.js';

export default class TextField extends Field {
  constructor(content, holder) {
    super(content);
    this.elm = $(`
      <div class="form-group">
        <label>Alt Text</label>
        <input type="text" class="form-control" placeholder="${holder}" />
      </div>
    `);
  }
}