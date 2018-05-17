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

  if (row) {
    toggleRowHighlight(el);
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

function toggleRowHighlight(el) {
  let hovering = false;

  $(el).mouseenter(() => {
    hovering = true;
    el.classList.add('hovered');
    toolbar.show(el);
    $('.structure').filter((idx, elm) => {
      if (elm !== el) elm.classList.remove('hovered');
    })
  });

  $(el).mouseleave(() => {
    setTimeout(() => {
      const onToolbar = toolbarContainer.classList.contains('show');

      if (! onToolbar) {
        el.classList.remove('hovered');
      }

      const rowIsHovered = $('.structure.hovered').length > 0;

      if (! rowIsHovered && ! onToolbar) {
        hovering = false;
      }

      if (! onToolbar && ! hovering) {
        el.classList.remove('hovered');
        toolbar.hide();
      }
    }, 1000);
  });
}