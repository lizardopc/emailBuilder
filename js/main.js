import EmailBuilder from './EmailBuilder.js';
import HTMLRenderer from './HTMLRenderer.js';
import Controller from './Controller.js';
import Toolbar from './Toolbar.js';

import { debounce } from './utils.js';

// Email drag and drop container
const  emailContainer = document.querySelector('#email-grid');

// Container for content on left panel
const  blockContainer = document.querySelector('#block-container');

// Container for rows on left panel
const structContainer = document.querySelector('#structure-container');

const emailBuilder = new EmailBuilder();
const htmlRenderer = new HTMLRenderer();
const controller = new Controller({ htmlRenderer, emailBuilder });
const toolbar = new Toolbar({ htmlRenderer,emailBuilder });

const toolbarContainer = document.querySelector('.tool-container');

// Hook Dragula events into Controller methods
const dragger = dragula([structContainer, emailContainer, blockContainer], {
  copy: controller.copy,
  moves: controller.moves,
  accepts: controller.accepts,
  mirrorContainer: document.body
}).on('drop', (el, target, src, sibling) => {
  controller.handleDrop(el, target, src, sibling);  
});

emailBuilder.dragger = dragger;
htmlRenderer.dragger = dragger;

$(toolbarContainer).mouseenter(() => {
  toolbarContainer.classList.add('show');
});

$(toolbarContainer).mouseleave(() => {
  toolbarContainer.classList.remove('show');
});

$(emailContainer).mouseover((e) => {
  efficientToggle(e);
});

const efficientToggle = debounce(function(e) {
  toolbar.toggleView(e);
}, 100);