/**
 * Email class, responsible for the 
 * Email's state and content.
 * 
 * @class UsiEmail
 */
export default class UsiEmail {
  constructor() {
    this.rows = [];
    this.contentElements = [];
    this.sessionFields = [];
    this.fieldSections = [];
    this.status = 'Draft';
  }
}