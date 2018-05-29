import ContentFactory from './Content/ContentFactory.js';
/**
 * Email Builder class, responsible for the
 * email's content and the state of the
 * email object at any given time.
 * 
 * @class EmailBuilder
 *
 */
export class EmailBuilder {
  constructor() {
    this.rows = [];
    this.dragger = null;
    this.contentFactory = new ContentFactory();    
  }

  /**
   * Adds a row to the email object, and takes
   * all columns which are children of the
   * row, and adds them to the row's
   * list of columns
   * 
   * @public
   * @method addRow
   * @param {HTMLElement} el - The row to add 
   */
  addRow(el) {
    const row = {
      elm: el,
      columns: []
    };
    const columns = [].slice.call(el.childNodes);

    this.rows.push(row);

    // Add columns to row
    columns.forEach((column) => {
      if (column.classList !== undefined) {
        this.addColumnToRow(column, row);

        // Add column to drag and drop list of containers
        this.dragger.containers.push(column);
      }
    });
  }

  addColumnToRow(col, row) {
    row.columns.push({
      elm: col,
      content: null
    });

    col.classList.add('nested');

    return row;
  }

  /**
   * Removes content from a column
   * 
   * @param {HTMLElement} content the content element to remove
   */
  removeContent(content) {
    const colArrays = this.rows.map(row => row.columns);

    const totalCols = [].concat.apply([], colArrays);

    const col = this.getColumnByContent(totalCols, content);

    col.content = null;
  }

  /**
   * Empties out the source column
   * as the item is being placed
   * into a new column
   * 
   * @public
   * @method resetColumn
   * @param {HTMLElement} src - The src container for the block
   */
  resetColumn(src) {
    const row = this.getRow(src.parentNode);
    const column = this.getColumn(row.columns, src);

    column.content = null;

    src.classList.remove('filled');
    src.classList.add('empty');
  }

  /**
   * Adds an item element inside a column
   * 
   * @public
   * @method addContent
   * @param {HTMLElement} el - The item to add 
   * @param {HTMLElement} target - The column to add the item to
   */
  addContent(el, target) {
    const row = this.getRow(target.parentNode);
    const column = this.getColumn(row.columns, target);
    const isPlaceholder = target.classList.contains('placeholder');

    if (isPlaceholder) {
      target = target.parentNode;
    }

    if (column.content !== null) return;

    const content = this.contentFactory.createContent('image', el);

    console.log('content created: ', content);

    column.content = content;
  }

  /**
   * Retrieves a row from the stored rows
   * 
   * @public
   * @method getRow
   * @param {HTMLElement} elm - The row element to match 
   * @returns {HTMLElement/undefined}
   */
  getRow(elm) {
    return this.rows.find((row) => {
      return row.elm === elm;
    });
  }

  /**
   * Returns a row from storage if the
   * row contains the given column
   * 
   * @public
   * @method getRowByColumn
   * @param {HTMLElement} col - The column element to match 
   * @returns {HTMLElement/undefined}
   */
  getRowByColumn(col) {
    return this.rows.find(row => {
      return row.columns.find(column => {
        return column.elm === col;
      });
    });
  }

  /**
   * Retrieves a column from a row's columns
   * 
   * @public
   * @method getColumn
   * @param {Array} columns - The list of columns to search through
   * @param {HTMLElement} elm - The row element to match 
   * @returns {HTMLElement/undefined}
   */
  getColumn(columns, elm) {
    return columns.find(column => {
      return column.elm === elm;
    });
  }

  /**
   * Retrieves the Content that matches an elm
   * from the email container
   * 
   * @public
   * @method getContent
   * @param {HTMLElement} elm - The content element to match 
   * @returns {object/null}
   */
  getContent(elm) {
    let content = null;

    const row = this.rows.find(row => {
      return row.columns.find(col => {
        return col.content && col.content.elm === elm;
      });
    });

    if (row) {
      content = row.columns.find(col => col.content.elm === elm);

      // Only need the content object
      if (content) {
        content = content.content;
      }
    }

    return content;
  }

  /**
   * Retrieves a column that has a given content elm
   * 
   * @public
   * @method getColumnByContent
   * @param {Array} columns - The list of columns to search through
   * @param {HTMLElement} elm - The content element to match 
   * @returns {HTMLElement/undefined}
   */
  getColumnByContent(columns, elm) {
    return columns.find(column => {
      return column.content && column.content.elm === elm;
    });
  }

  /**
   * Removes a row from storage
   * 
   * @public
   * @method deleteRow
   * @param {HTMLElement} row - The row to remove 
   */
  deleteRow(row) {
    const selectedRow = this.rows.find((storedRow) => {
      return storedRow.elm === row;
    });
    const index = this.rows.indexOf(selectedRow);

    if (index > -1) {
      this.rows.splice(index, 1);
    }
  }

  /**
   * Removes a column from a given row, as long as it
   * is not the only column in the row
   * 
   * @public
   * @method deleteColumn
   * @param {HTMLElement} col - The column to remove 
   * @param {HTMLElement} row - The row from which to delete a column 
   */
  deleteColumn(col) {
    const row = this.getRowByColumn(col);
    const selectedCol = row.columns.find((storedCol) => {
      return storedCol.elm === col;
    });
    const index = row.columns.indexOf(selectedCol);

    if (index > -1) {
      row.columns.splice(index, 1);
    }
  }

  /**
   * Adds a column to a given row, as long as there
   * are not already four columns in the row
   * 
   * @public
   * @method addColumn
   * @param {HTMLElement} elm - The row element to add a new column to 
   */
  addColumn(elm, col) {
    const row = this.getRow(elm);

    row.columns.push({
      elm: col,
      content: null
    });
  }
}