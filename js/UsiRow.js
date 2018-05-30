/**
 * Row class, responsible for storing
 * all columns and content in a
 * specific row of the email.
 * 
 * @class UsiRow
 */
export default class UsiRow {
  constructor(element) {
    this.element = element;
    this.id = new Date().getTime();
    this.columns = [];
    this.fieldSections = [];
  }
}