const  emailContainer = document.querySelector('#email-grid');
const  blockContainer = document.querySelector('#block-container');
const structContainer = document.querySelector('#structure-container');

const emailBuilder = new EmailBuilder();
const toolbar = new Toolbar();

const toolbarContainer = document.querySelector('.tool-container');

// Hook Dragula events into EmailBuilder methods
const dragger = dragula([structContainer, emailContainer, blockContainer], {
  copy: emailBuilder.copy,
  moves: emailBuilder.moves,
  accepts: emailBuilder.accepts,
  mirrorContainer: document.body
})
.on('drop', (el, target, src, sibling) => {
  emailBuilder.handleDrop(el, target, src, sibling);  

  const row = el.classList.contains('structure');
  const block = el.classList.contains('block');

  if (row) {
    toolbar.toggleRow(el);
  }

  if (block) {
    toolbar.toggleBlock(el);
  }
});


$(toolbarContainer).mouseenter(() => {
  toolbarContainer.classList.add('show');
});

$(toolbarContainer).mouseleave(() => {
  toolbarContainer.classList.remove('show');
});

setInterval(() => {
  const noRowHovered = $('.structure.hovered').length === 0;
  const onToolbar = toolbarContainer.classList.contains('show');

  if (noRowHovered && ! onToolbar) {
    toolbar.hide();
  }
}, 1000);