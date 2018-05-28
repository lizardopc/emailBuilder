export default class LinkField {
  constructor(content) {
    this.content = content;
    this.elm = $(`
      <div class="form-control">
        <label>Image Link</label>
        <input type="text" />
      </div>
    `);
  }
}