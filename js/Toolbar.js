class Toolbar {
  constructor() {
    this.createToolbar();

    this.elm = null;

    this.toolbar.container = this.toolbar.parent().find('.tool-container');
    this.toolbar.arrow = this.toolbar.find('.tool-arrow');
    this.setTriggers();
  }

  /**
   * Displays the toolbar next to a given element.
   * 
   * @param {HTMLElement} elm - the element to show the toolbar next to 
   */
  show(elm) {
    const {
      top, left
    } = $(elm).offset();

    this.elm = elm;

    this.toolbar.container[0].style.opacity = '0';
    this.toolbar.container[0].style.left = `${left}px`;
    this.toolbar.container[0].style.top = `${top + 8}px`;

    $(this.toolbar.container).animate({
      opacity: '1',
      left: `${left - 50}px`,
    });
    this.toolbar.container.show();
  }

  /**
   * Hides the toolbar by resetting opacity 
   * and setting display to none
   * 
   * @public
   * @method hide
   */
  hide() {
    this.toolbar.container[0].style.opacity = '0';
    this.toolbar.container.hide();
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
    ev.preventDefault();

    const row = this.getElm();

    row.parentNode.removeChild(row);

    this.elm = null;

    this.hide();
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

  /**
   * Manages displaying the toolbar as well as
   * toggling the row's highlighting when
   * a user's mouse is hovering the row
   * 
   * @public
   * @method toggleRow
   * @param {HTMLElement} el - The row to manage 
   */
  toggleRow(el) {
    $(el).mouseenter(() => {
      toolbar.show(el);
      el.classList.add('hovered');

      // Un-highlight other rows
      $('.structure').filter((idx, elm) => {
        if (elm !== el) elm.classList.remove('hovered');
      })
    });
  
    $(el).mouseleave(() => {
      const hideToolbar = setInterval(() => {
        const onToolbar = toolbarContainer.classList.contains('show');
  
        if (! onToolbar) {
          clearInterval(hideToolbar);
          el.classList.remove('hovered');
        }
      }, 1000);
    });
  }

  toggleBlock(el) {
    // TODO: Manage block    
  }
}