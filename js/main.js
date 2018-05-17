const  emailContainer = document.querySelector('#email-grid');
const  blockContainer = document.querySelector('#block-container');
const structContainer = document.querySelector('#structure-container');

const emailBuilder = new EmailBuilder();
const toolbar = new Toolbar();

// Hook Dragula events into EmailBuilder methods
const dragger = dragula([structContainer, emailContainer, blockContainer], {
  copy: emailBuilder.copy,
  moves: emailBuilder.moves,
  accepts: emailBuilder.accepts,
  mirrorContainer: document.body
})
.on('drop', (el, target, src, sibling) => {
  emailBuilder.handleDrop(el, target, src, sibling);  

  const row = [].slice.call(document.querySelectorAll('.empty-structure-block')).pop();

  if (row) {
    console.log('row is', row);
    
    $(row).mouseenter(() => {
      toolbar.show(row);
    });
  }
});