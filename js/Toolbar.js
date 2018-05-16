class Toolbar {
  constructor(options, elm) {
    this.elm = elm;

    this.toolbar = $('<div class="tool-container">')
        .append('<div class="tool-items"></div>')
        .append('</div>')
        .append('<div class="tool-arrow">')
        .append('<a href="#" ')
        .appendTo('body')
        .hide();
    
    this.toolbar.btn = $('<div class="toolbar-btn"></div>');
    this.toolbar.arrow = this.toolbar.find('.tool-arrow');
    this.initialize();
  }

  initialize() {

  }
}