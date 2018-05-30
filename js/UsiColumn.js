/**
 * Column class, responsible for storing
 * content in a select row of the email
 * 
 * @class UsiColumn
 */
export default class UsiColumn {
  constructor(element) {
    this.element = element;
    this.id = new Date().getTime();
    this.contentElementID = null;
    this.fieldSections = [];
  }
}