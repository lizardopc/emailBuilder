class HTMLRenderer {
  constructor() {

  }

  /**
   * Adds "Drop content here" inside empty columns
   * 
   * @public
   * @method addEmptyContentMsgs
   */
  addEmptyContentMsgs() {
    const selector = '.placed-structure-block .empty';
    const blocks = [].slice.call(document.querySelectorAll(selector));
    const placeholder = '<span class="no-select placeholder">Drop content here</span>';

    blocks.forEach((block) => {
      block.innerHTML = placeholder;
    });
  }

  /**
   * Transforms a row element by wrapping it
   * in a 100% width div and by adding
   * a new classname to the row
   * 
   * @public
   * @method transformRowOnDrop
   */
  transformRowOnDrop(el) {
    el.classList.add('placed-structure-block');
    
    // Wrap row in 100% width div for tooltip
    $(el).wrap('<div class="row-wrapper"></div>');
  }

  /**
   * Appends a content element to a column
   * element. Will also transform the
   * styles of the content element
   * 
   * @public
   * @method addContentToColumn
   * @param {HTMLElement} el - The content element 
   * @param {HTMLElement} target - The column to add the content to
   */
  addContentToColumn(el, target) {
    // Set content styles
    el.classList.add('contained');
        
    // Set container styles
    target.classList.remove('empty');
    target.classList.add('filled');
        
    // Remove placeholder content
    if (target.firstChild !== el) {
      target.removeChild(target.firstChild);
    } else {

      // El was dropped in front of placeholder
      target.removeChild(target.children[1]);
    }
  }

  /**
   * Resets a column's classes to indicate
   * that it is empty
   * 
   * @param {HTMLElement} el Content to be removed 
   */
  resetColumn(el) {
    el.parentNode.classList.add('empty');
    el.parentNode.classList.remove('filled');
  }

  /**
   * Transforms content blocks into UI versions
   * of themselves for when they are dropped
   * outside of a container and onto the
   * email itself
   * 
   * @public
   * @method editUncontainedBlock
   * @param {HTMLElement} block - The content block element
   */
  editUncontainedBlock(block) {
    const spacer = document.createElement('hr');
    const button = document.createElement('button');

    block.classList.add('uncontained');
  
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
   * Creates a new column HTML Element
   * 
   * @public
   * @method makeColumn
   * @param {String} className - The column size class name
   * @returns {HTMLElement} - The new column
   */
  makeColumn(className) {
    const newCol = document.createElement('div');

    newCol.classList.add(className);
    newCol.classList.add('col');
    newCol.classList.add('empty');
    newCol.classList.add('nested');

    dragger.containers.push(newCol);

    return newCol;
  }

  /**
   * Returns an updated classname by matching
   * the number of columns
   * 
   * @public
   * @method getNewColumnClassName
   * @param {Number} colCount - The number of columns 
   */
  getNewColumnClassName(colCount) {
    return {
      1: 'col-100-item-container',
      2: 'col-50-item-container',
      3: 'col-33-item-container',
      4: 'col-25-item-container',
    }[colCount];
  }

  /**
   * Dynamically adjusts a row 
   * 
   * @public
   * @method resizeRow
   * @param {HTMLElement} col - ****DESCRIPTION****
   * @param {Boolean} add - Flag for deciding on whether to add or delete
   */
  resizeRow(col, add) {
    const columns = [].slice.call($(col).siblings());
    const numberOfCols = columns.length;
    const newColAmount = add ? (numberOfCols + 1) : (numberOfCols);
    const newColSizeClass = this.getNewColumnClassName(newColAmount);

    columns.forEach((column) => {
      const classes = [].slice.call(column.classList);

      const oldColSizeClass = classes.find((cls) => {
        return cls.indexOf('col-') > -1;
      });

      $(column).removeClass(oldColSizeClass);
      $(column).addClass(newColSizeClass);
    });
  }

  /**
   * Iterates through a group of elements and
   * checks if they match a given element.
   * If the element is not the given
   * element, removes the hovered
   * classname from the element
   * 
   * @public
   * @method unhighlightElms
   * @param {String} type - The classname to get the elements for
   * @param {HTMLElement} elm - The element to stay highlighted 
   */
  unhighlightElms(type, elm) {
    $(type).filter((idx, el) => {
      if (el !== elm) el.classList.remove('hovered');
    });
  }

  /**
   * Iterates through a group of elements and
   * removes the hovered classname 
   * from the element
   * 
   * @public
   * @method unhighlightAllElms
   * @param {String} type - The classname to get the elements for
   */  
  unhighlightAllElms(type) {
    const elms = [].slice.call(document.querySelectorAll(type));

    elms.forEach((elm) => {
      elm.classList.remove('hovered');
    });
  }
}