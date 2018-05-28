export default class PaddingField {
  constructor(content) {
    this.content = content;
    this.elm = $(`
      <div class="form-control">
        <label>Padding</label>
        <input type="number" value="0" min="0" max="40" />
      </div>
    `);
  }
}