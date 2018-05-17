class Toolbar {
  constructor() {
    this.createToolbar();

    this.toolbar.container = this.toolbar.parent().find('.tool-container');
    this.toolbar.arrow = this.toolbar.find('.tool-arrow');
    console.log(this.toolbar.container);
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

    this.toolbar.container[0].style.left = `${left - 50}px`;
    this.toolbar.container[0].style.top = `${top + 8}px`;

    this.toolbar.container.show();
  }

  createToolbar() {
    this.toolbar = $(`
      <div class="tool-container">
        <div class="tool-items">
          <a href="#" class="tool-item">
            <i class="fa fa-trash"></i>
          </a>
          <a href="#" class="tool-item">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="tool-arrow"></div>
      </div>
    `).appendTo('body').hide();
  }
}