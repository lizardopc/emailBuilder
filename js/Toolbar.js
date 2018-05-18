
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
   * @param {HTMLElement} elm - the element to show the toolbar next to 
   */
  show(elm, type) {
    this.elm = elm;

    this.open = true;

    if (type === 'row') {
      this.showOnRow(elm);
    } else {
      this.showOnCol(elm);
    }

    this.toolbar.container.show();
  }

  showOnRow(elm) {
    const {
      top, left
    } = $(elm).offset();

    $(this.toolbar.arrow).show();
    $('.tool-items').height('80px');

    $.each($('.tool-item'), (idx, val) => {
      $(val).show();
    });

    this.toolbar.container[0].style.opacity = '0';
    this.toolbar.container[0].style.left = `${left}px`;
    this.toolbar.container[0].style.top = `${top + 8}px`;

    $(this.toolbar.container).animate({
      opacity: '1',
      left: `${left - 50}px`,
    }, 200);
  }

  showOnCol(elm) {
    const {
      top, left
    } = $(elm).offset();

    $('.tool-items').height('40px');

    $('.add').hide();
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
    const hasHoveredRows = $('.structure').filter(function() {
      return $(this).is(':hover');
    }).length > 0;

    if (! onToolbar && ! hasHoveredCols && ! hasHoveredRows) {
      this.hide();
      this.unhighlightAllElms('.col');
      this.unhighlightAllElms('.structure');
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

    const isRow = elm.classList.contains('structure');
    const isCol = elm.classList.contains('col');
    const isOnlyCol = $(elm).parent().find('.col').length === 1;

    // Do not delete the only column
    if (isOnlyCol && !isRow) return;

    if (isRow) {
      emailBuilder.deleteRow(elm);
    } else if (isCol) {
      emailBuilder.deleteColumn(elm);
    }

    elm.parentNode.removeChild(elm);

    this.elm = null;

    this.hide();
  }

  /**
   * 
   * @param {Object} ev - A click event object 
   */
  add(ev) {
    if (! this.open) return;

    ev.preventDefault();

    const elm = this.getElm();

    emailBuilder.addColumn(elm);
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
    const row = elm.classList.contains('structure');
    const col = elm.classList.contains('col');
    const sameElm = elm === toolbar.elm;
    
    if (sameElm || placeholder) return;

    // Only show for columns and rows, not blocks
    if (! row && ! col) {
      this.hide();
      this.unhighlightElms('.structure', elm);
      this.unhighlightElms('.col', elm);
      return;
    }
  
    const type = row ? 'row' : 'col';

    // Toolbar is modified depending on what type of elm
    toolbar.show(elm, type);
    elm.classList.add('hovered');

    this.unhighlightElms('.structure', elm);
    this.unhighlightElms('.col', elm);
  }

  unhighlightElms(type, elm) {
    $(type).filter((idx, el) => {
      if (el !== elm) el.classList.remove('hovered');
    });
  }

  unhighlightAllElms(type) {
    const elms = [].slice.call(document.querySelectorAll(type));

    elms.forEach((elm) => {
      elm.classList.remove('hovered');
    });
  }
}