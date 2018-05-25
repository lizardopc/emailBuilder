export default class Content {
  constructor(config) {
    this.fields = [];
    this.form = $('.content-settings-body');
  }

  addFieldsToForm() {
    this.fields.forEach(field => {
      this.form.appendChild(field);
    });
  }

  validate() {

  }

  save() {

  }
}