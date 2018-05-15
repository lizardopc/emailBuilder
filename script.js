const  emailContainer = document.querySelector('#email-grid');
const  blockContainer = document.querySelector('#block-container');
const structContainer = document.querySelector('#structure-container');

class EmailBuilder {
  constructor() {
    this.rows = [];
  }

  /**
   * Checks to see if an element can be copied or not.
   * 
   * @param {HTMLElement} elm - HTML Element being copied 
   * @param {HTMLElement} src - HTML Element parent container of elm
   * @method
   * @returns {boolean}
   */
  copy(elm, src) {
    // Only allow structs or blocks to be copied
    const struct = elm.classList.contains('structure');
    const block = elm.classList.contains('block');

    return struct || block;
  }

  /**
   * Checks to see if an elm can accept drops on a target elm
   * 
   * @param {HTMLElement} elm - The elm being dropped
   * @param {HTMLElement} target - The target to check if it can accept drops
   * @param {HTMLElement} src - The source container of the elm being dropped
   * @param {HTMLElement} sibling - The siblings of the target
   * @method
   * @returns {boolean}
   */
  accepts(elm, target, src, sibling) {
    // Only allow the email container to accept drops
    if (target === blockContainer) return false;
    if (target === structContainer) return false;

    // Filled item holders cannot accept drops
    if (target.classList.contains('filled')) return false;

    return true;
  }

  /**
   * Handles all drops that occur on elements
   * inside all containers
   * 
   * @method
   * @param {HTMLElement} el - The element being dropped 
   * @param {HTMLElement} target - The target where the element is being dropped on
   * @param {HTMLElement} src - The source container of the drop element
   * @param {HTMLElement} sibling - The siblings inside the target element
   */
  handleDrop(el, target, src, sibling) {
    if (! target) return;

    const isStruct = el.classList.contains('structure');
    const isBlock = el.classList.contains('block');
  
    if (isStruct) {
      this.handleStructDrops(el, target);
    }
  
    if (isBlock) {
      this.handleBlockDrop(el, target);
    }

    this.addEmptyContentMsgs();
  }

  /**
   * Adds "Drop content here" inside empty columns
   * @method
   */
  addEmptyContentMsgs() {
    var selector = '.empty-structure-block .empty';
    var blocks = [].slice.call(document.querySelectorAll(selector));
  
    blocks.forEach((block) => {
      block.innerHTML = '<span class="no-select">Drop content here</span>';
    });
  }

  /**
   * Handles all occurrences of structure drops 
   * inside the email builder
   * 
   * @method
   * @param {HTMLElement} el 
   * @param {HTMLElement} target 
   */
  handleStructDrops(el, target) {
    const itemContainers = [].slice.call(el.childNodes);
    
    // Structures are initially empty
    el.classList.add('empty-structure-block');
  
    // Structure items can now add blocks
    itemContainers.forEach((container) => {
      this.rows.push(container);
      dragger.containers.push(container);
    });
  }

  /**
   * Handles all occurrences of block drops
   * inside the email builder or inside
   * structure elements
   * 
   * @method
   * @param {HTMLElement} el - The element being dropped in
   * @param {HTMLElement} target - The target where the element is being dropped on
   */
  handleBlockDrop(el, target) {
    // Where el is being dropped on
    const onStruct = target.classList.contains('structure');
    const onItem = target.className.indexOf('item') > -1;
  
    // If not dropping in anything, take up 100% width
    if (!onStruct && !onItem) {
      el.classList.add('uncontained');
      this.editUncontainedBlock(el);
    } else {
  
      // Dropped inside struct item holder
  
      // Set content styles
      el.classList.add('contained');
  
      // Set container styles
      target.classList.remove('empty');
      target.classList.add('filled');
      
      // Remove placeholder content
      target.removeChild(target.firstChild);
    }
  }

  /**
   * Transforms content blocks into UI versions
   * of themselves for when they are dropped
   * outside of a container and onto the
   * email itself
   * 
   * @method
   * @param {HTMLElement} block - The content block element
   */
  editUncontainedBlock(block) {
    const spacer = document.createElement('hr');
    const button = document.createElement('button');
  
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
}

const emailBuilder = new EmailBuilder();

const dragger = dragula([structContainer, emailContainer, blockContainer], {
  copy: emailBuilder.copy,
  accepts: emailBuilder.accepts,
  mirrorContainer: document.body
})
.on('drop', (el, target, src, sibling) => {
  emailBuilder.handleDrop(el, target, src, sibling);  
});

// Enable removing items on email container
dragula([emailContainer], {
  removeOnSpill: true,
  mirrorContainer: document.body
});