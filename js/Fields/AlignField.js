export default class AlignField {
  constructor(content) {
    this.content = content;
    this.elm = $(`
      <div class="form-control">
        <label>Alignment</label>
        <div>
          <input type="radio" name="alignment" value="left">
          <label>Left</label>
      
          <input type="radio" name="alignment" value="center">
          <label>Center</label>
      
          <input type="radio" name="alignment" value="right">
          <label>Right</label>
        </div>
      </div>
    `);
  }
}