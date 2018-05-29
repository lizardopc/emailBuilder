import Field from './Field.js';

export default class AlignField extends Field {
  constructor(content) {
    super(content);
    this.elm = $(`
      <div class="form-group">
        <label class="label-center">Alignment</label>
        <div class="float-right">
          <label>
            <input type="radio" name="alignment" value="left">
            <i class="fas fa-align-left align-pad"></i>
          </label>
      
          <label>
            <input type="radio" name="alignment" value="center">
            <i class="fas fa-align-center align-pad"></i>
          </label>
      
          <label>
            <input type="radio" name="alignment" value="right">
            <i class="fas fa-align-right align-pad"></i>
          </label>
        </div>
      </div>
    `);
  }
}