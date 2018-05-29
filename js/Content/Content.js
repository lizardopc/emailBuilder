export default class Content {
  constructor(elm) {
    this.elm = elm;
    this.fields = [];
    this.form = $('.content-settings-body');
  }

  addFieldsToForm() {
    $(this.form).empty();
    
    this.fields.forEach(field => {
      $(field.elm).appendTo(field.wrapper);
      $(field.wrapper).appendTo(this.form);
      $('<hr />').appendTo(this.form);
    });
  }
}