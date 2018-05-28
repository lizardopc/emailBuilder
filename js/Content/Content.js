export default class Content {
  constructor(elm) {
    this.elm = elm;
    this.fields = [];
    this.form = $('.content-settings-body');
  }

  addFieldsToForm() {
    this.fields.forEach(field => {
      $(field.elm).appendTo(this.form);
    });
  }

  isValid() {
    return this.fields.some(field => {
      return !field.isValid();
    });
  }

  save() {
    if (!this.isValid()) return;
  }
}