/**
 * Email Builder class, responsible for the
 * email's content, as well as the drag
 * and drop interactions of all the
 * content, including Blocks and
 * Structures.
 * 
 * @class EmailBuilder
 * 
 * TODO: 
 * - Extract drag/drop functionality
 * - Make columns re-sizeable
 * - Column alignment
 */
class EmailBuilder {
  constructor() {
    this.rows = [];
    this.colSizes = [ ]
  }

  /**
   * Checks to see if an element can be copied or not.
   * 
   * @method copy
   * @public
   * @param {HTMLElement} elm - HTML Element being copied 
   * @param {HTMLElement} src - HTML Element parent container of elm
   * @returns {boolean}
   */
  copy(elm, src) {
    // Only allow structs or blocks to be copied
    const struct = elm.classList.contains('structure');
    const block = elm.classList.contains('block');

    const contained = elm.classList.contains('contained');

    return (struct || block) && !contained;
  }

  moves(el, source, handle, sibling) {
    const placeholder = handle.classList.contains('placeholder');

    return source !== emailContainer && !placeholder;
  }

  /**
   * Checks to see if an elm can accept drops on a target elm
   * 
   * @method accepts
   * @public
   * @param {HTMLElement} elm - The elm being dropped
   * @param {HTMLElement} target - The target to check if it can accept drops
   * @param {HTMLElement} src - The source container of the elm being dropped
   * @param {HTMLElement} sibling - The siblings of the target
   * @returns {boolean}
   */
  accepts(elm, target, src, sibling) {
    const row = elm.classList.contains('structure');

    // Only allow the email container to accept drops
    if (target === blockContainer) return false;
    if (target === structContainer) return false;

    // Rows cannot be dropped into columns
    if (row && target.classList.contains('empty')) return false;

    // Filled item holders cannot accept drops
    if (target.classList.contains('filled')) return false;

    return true;
  }

  /**
   * Handles all drops that occur on elements
   * inside all containers
   * 
   * @method handleDrop
   * @public
   * @param {HTMLElement} el - The element being dropped 
   * @param {HTMLElement} target - The target where the element is being dropped on
   * @param {HTMLElement} src - The source container of the drop element
   * @param {HTMLElement} sibling - The siblings inside the target element
   */
  handleDrop(el, target, src, sibling) {
    if (! target) return;

    const isStruct = el.classList.contains('structure');
    const isBlock = el.classList.contains('block');
  
    if (isStruct) {
      this.handleStructDrops(el, target);
    }
  
    if (isBlock) {
      this.handleBlockDrop(el, target, src);
    }

    this.addEmptyContentMsgs();
  }

  /**
   * Adds "Drop content here" inside empty columns
   * @method addEmptyContentMsgs
   * @public
   */
  addEmptyContentMsgs() {
    const selector = '.empty-structure-block .empty';
    const blocks = [].slice.call(document.querySelectorAll(selector));
    const placeholder = '<span class="no-select placeholder">Drop content here</span>';

    blocks.forEach((block) => {
      block.innerHTML = placeholder;
    });
  }

  /**
   * Handles all occurrences of structure drops 
   * inside the email builder
   * 
   * @method handleStructDrops
   * @public
   * @param {HTMLElement} el 
   * @param {HTMLElement} target 
   */
  handleStructDrops(el, target) {
    const itemContainers = [].slice.call(el.childNodes);
    
    // Structures are initially empty
    el.classList.add('empty-structure-block');

    let row = {
      elm: el,
      columns: []
    };

    this.rows.push(row);

    // Structure items can now add blocks
    itemContainers.forEach((container) => {
      if (container.classList !== undefined) {
        row.columns.push({
          elm: container,
          content: null
        });

        container.classList.add('nested');

        dragger.containers.push(container);
      }
    });
  }

  /**
   * Handles all occurrences of block drops
   * inside the email builder or inside
   * structure elements
   * 
   * @method handleBlockDrop
   * @public
   * @param {HTMLElement} el - The element being dropped in
   * @param {HTMLElement} target - The target where the element is being dropped on
   */
  handleBlockDrop(el, target, src) {
    // Where el is being dropped on
    const onStruct = target.classList.contains('structure');
    const onItem = target.className.indexOf('item') > -1;
    const contained = el.classList.contains('contained');
  
    // If not dropping in anything, take up 100% width
    if (!onStruct && !onItem) {
      el.classList.add('uncontained');
      this.editUncontainedBlock(el);
    } else {
      if (contained) {
        this.resetColumn(src);
      } 
      this.addItem(el, target);
    }
  }

  /**
   * Empties out the source column
   * as the item is being placed
   * into a new column.
   * 
   * @method resetColumn
   * @public
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
   * @param {HTMLElement} el - The item to add 
   * @param {HTMLElement} target - The column to add the item to
   */
  addItem(el, target) {
    const row = this.getRow(target.parentNode);
    const column = this.getColumn(row.columns, target);
    
    if (column.content !== null) return;

    column.content = {
      elm: el,
    };

    // Set content styles
    el.classList.add('contained');

    // Set container styles
    target.classList.remove('empty');
    target.classList.add('filled');

    // Remove placeholder content
    target.removeChild(target.firstChild);
  }

  /**
   * Retrieves a row from the stored rows
   * 
   * @method getRow
   * @public
   * @param {HTMLElement} elm - The row element to match 
   * @returns {HTMLElement/undefined}
   */
  getRow(elm) {
    return this.rows.find((row) => {
      return row.elm === elm;
    });
  }

  /**
   * Retrieves a column from a row's columns
   * 
   * @method getColumn
   * @public
   * 
   * @param {Array} columns - The list of columns to search through
   * @param {HTMLElement} elm - The row element to match 
   * @returns {HTMLElement/undefined}
   */
  getColumn(columns, elm) {
    return columns.find((column) => {
      return column.elm === elm;
    });
  }

  /**
   * Transforms content blocks into UI versions
   * of themselves for when they are dropped
   * outside of a container and onto the
   * email itself
   * 
   * @method editUncontainedBlock
   * @public
   * @param {HTMLElement} block - The content block element
   */
  editUncontainedBlock(block) {
    const spacer = document.createElement('hr');
    const button = document.createElement('button');
  
    // Handled via CSS
    if (block.classList.contains('text')) return;
    if (block.classList.contains('image')) return;
  
    block.innerHTML = '';
  
    if (block.classList.contains('button')) {
      block.appendChild(button);
    }
  
    if (block.classList.contains('spacer')) {
      block.appendChild(spacer);
    }
  }

  /**
   * Removes a row from storage.
   * 
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
   * is not the only column in the row.
   * 
   * @param {HTMLElement} col - The column to remove 
   * @param {HTMLElement} row - The row from which to delete a column 
   */
  deleteColumn(col) {
    const row = this.rows.find((storedRow) => {
      return storedRow.columns.find((column) => {
        return column.elm === col;
      });
    });
    const numberOfCols = row.columns.length;

    const selectedCol = row.columns.find((storedCol) => {
      return storedCol.elm === col;
    });
    const index = row.columns.indexOf(selectedCol);

    if (index > -1) {
      row.columns.splice(index, 1);
    }

    this.resizeRow(numberOfCols, false, row);
  }

  /**
   * Dynamically adjusts a row 
   * @param {Number} oldColCount - The number of columns before deletion 
   * @param {Boolean} add - Flag for deciding on whether to add or delete 
   * @param {HTMLElement} row - The row containing the columns
   */
  resizeRow(oldColCount, add, row) {
    if (add) {
      return;
    }
    const colSizeClass = {
      1: 'col-100-item-container',
      2: 'col-50-item-container',
      3: 'col-33-item-container',
      4: 'col-25-item-container',
    }[oldColCount - 1];

    row.columns.forEach((column) => {
      const classes = [].slice.call(column.elm.classList);

      const colClass = classes.find((cls) => {
        return cls.indexOf('col-') > -1;
      });

      console.log('old col class:', colClass);
      $(column.elm).removeClass(colClass);
      $(column.elm).addClass(colSizeClass);
    });
  }

  addColumn(col, row) {
    const row = this.getRow(row);
    const cols = row.cols;

  }
}

