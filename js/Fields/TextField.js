export default class TextField {
  constructor(content) {
    this.content = content;
    this.elm = $(`
      <div class="form-control">
        <label>Alt Text</label>
        <input type="text" />
      </div>
    `);
  }
}