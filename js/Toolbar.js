
/**
 * Toolbar class, responsible for displaying the
 * toolbar on all rows and columns, as well as
 * managing and delegating any actions on
 * rows or columns, such as adding and
 * deleting. 
 *  
 * @class Toolbar
 */
class Toolbar {
  constructor() {
    this.createToolbar();

    this.elm = null;
    this.open = false;
    this.hoveredElm = null;

    this.toolbar.container = this.toolbar.parent().find('.tool-container');
    this.toolbar.arrow = this.toolbar.find('.tool-arrow');
    this.setTriggers();

    setInterval(() => { this.visibilityCheck(); }, 1200);
  }

  /**
   * Displays the toolbar next to a given element.
   * 
   * @public
   * @method show
   * @param {HTMLElement} elm - the element to show the toolbar next to 
   * @param {Boolean} row - flag to signal that the current hovered elm is a row
   */
  show(elm, row) {
    this.elm = elm;

    this.open = true;

    if (row) {
      this.showOnRow(elm);
    } else {
      this.showOnColOrContent(elm);
    }

    this.toolbar.container.show();
  }

  showOnRow(elm) {
    const {
      top, left
    } = $(elm).offset();

    $('.edit').hide();
    $(this.toolbar.arrow).show();

    $.each($('.tool-item'), (idx, val) => {
      if (! $(val).hasClass('edit')) {
        $(val).show();
      }
    });

    this.toolbar.container[0].style.opacity = '0';
    this.toolbar.container[0].style.left = `${left}px`;
    this.toolbar.container[0].style.top = `${top + 8}px`;

    $(this.toolbar.container).animate({
      opacity: '1',
      left: `${left + 10}px`,
    }, 200);
  }

  showOnColOrContent(elm) {
    const {
      top, left
    } = $(elm).offset();

    $('.add').hide();
    $('.edit').show();
    $(this.toolbar.arrow).hide();

    this.toolbar.container[0].style.left = `${left}px`;
    this.toolbar.container[0].style.top = `${top}px`;

    $(this.toolbar.container).css('opacity', '1');
  }

  /**
   * Hides the toolbar by resetting opacity 
   * and setting display to none
   * 
   * @public
   * @method hide
   */
  hide() {
    this.open = false;
    this.toolbar.container[0].style.opacity = '0';
    this.toolbar.container.hide();
  }

  visibilityCheck() {
    const onToolbar = $('.tool-container').hasClass('show');

    const hasHoveredCols = $('.col').filter(function() {
      return $(this).is(':hover');
    }).length > 0;
    const hasHoveredRows = $('.row-wrapper').filter(function() {
      return $(this).is(':hover');
    }).length > 0;

    if (! onToolbar && ! hasHoveredCols && ! hasHoveredRows) {
      this.hide();
      htmlRenderer.unhighlightAllElms('.col');
      htmlRenderer.unhighlightAllElms('.row-wrapper');
    }
  }

  /**
   * Wires up event listeners to the toolbar buttons
   * 
   * @public
   * @method setTriggers
   */
  setTriggers() {
    $('.delete').click((e) => this.delete(e));
    $('.add').click((e) => this.add(e));
  }

  /**
   * Deletes the element that the toolbar is 
   * hovering over and re-hides the toolbar
   * 
   * @public
   * @method delete
   * @param {Object} ev - A click event object 
   */
  delete(ev) {
    if (! this.open) return;

    ev.preventDefault();

    const elm = this.getElm();

    const isCol = elm.classList.contains('col');
    const isRow = elm.classList.contains('row-wrapper');
    const isContent = elm.classList.contains('block');
    const isOnlyCol = $(elm).parent().find('.col').length === 1;

    // Do not delete the only column
    if (isOnlyCol && !isRow) return;

    if (isRow) {
      emailBuilder.deleteRow(elm);
    } else if (isCol) {
      htmlRenderer.resizeRow(elm, false);
      emailBuilder.deleteColumn(elm);
    } else if (isContent) {
      emailBuilder.removeContent(elm);
      htmlRenderer.resetColumn(elm);
      htmlRenderer.addEmptyContentMsgs();
    }

    // Content deleted via addEmptyContentMsgs
    if (! isContent) {
      elm.parentNode.removeChild(elm);
    }

    this.elm = null;

    this.hide();
  }

  /**
   * Calls emailBuilder and htmlRenderer
   * methods so that a new column
   * can be added into a row
   * 
   * @public
   * @method add
   * @param {Object} ev - A click event object 
   */
  add(ev) {
    if (! this.open) return;

    ev.preventDefault();

    const elm = this.getElm();

    // Rows are wrapped in a div, use the first child
    const row = elm.firstChild;

    const colCount = $(row).children().length + 1;

    if (colCount === 5) return;

    const colClass = htmlRenderer.getNewColumnClassName(colCount);
    const col = htmlRenderer.makeColumn(colClass);

    row.appendChild(col);
    emailBuilder.addColumn(row, col);
    htmlRenderer.resizeRow(col, true);

    htmlRenderer.addEmptyContentMsgs();
  }

  /**
   * Returns the element that the toolbar is hovering over
   * 
   * @public
   * @method getElm
   * @returns {HTMLElement/null}
   */
  getElm() {
    return this.elm;
  }

  /**
   * Creates and appends the toolbar HTML
   * to the document.body and hides it
   * 
   * @public
   * @method createToolbar
   */
  createToolbar() {
    this.toolbar = $(`
      <div class="tool-container">
        <div class="tool-items">
          <a href="#" class="tool-item delete">
            <i class="fa fa-trash"></i>
          </a>
          <a href="#" class="tool-item add">
            <i class="fa fa-plus"></i>
          </a>
          <a href="#" class="tool-item edit">
            <i class="fas fa-edit"></i>          
          </a>
        </div>
        <div class="tool-arrow"></div>
      </div>
    `)
    .css('opacity', '0')
    .appendTo('body').hide();
  }

  toggleView(ev) {
    const elm = ev.target;
    const placeholder = elm.classList.contains('placeholder');
    const row = elm.classList.contains('row-wrapper');
    const content = elm.classList.contains('block');
    const col = elm.classList.contains('col');

    if (placeholder) return;

    if (! row && ! col && ! content) {
      this.hide();
      htmlRenderer.unhighlightElms('.row-wrapper', elm);
      htmlRenderer.unhighlightElms('.col', elm);
      return;
    }

    // Toolbar is modified depending on what type of elm
    if (row) {
      this.show(elm, true);
    } else {
      this.show(elm, false);
    }

    elm.classList.add('hovered');

    htmlRenderer.unhighlightElms('.row-wrapper', elm);
    htmlRenderer.unhighlightElms('.col', elm);
  }
}