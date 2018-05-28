export default class SizeField {
  constructor(content) {
    this.content = content;
    this.elm = $(`
      <div class="form-control">
        <label>Size</label>
        <input type="number" min="50" max="600" />
      </div>
    `);
  }
}