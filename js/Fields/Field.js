export default class Field {
  constructor(content) {
    this.content = content;
    this.wrapper = $(`
      <div class="col-xs-12"></div>
    `);
  }
}