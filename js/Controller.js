/**
 * Controller class, responsible for handling
 * all drag and drop events, as well as
 * delegating responses to events
 * 
 * @class Controller
 */
export default class Controller {
  constructor(config) {
    this.htmlRenderer = config.htmlRenderer;
    this.emailBuilder = config.emailBuilder;

    this.emailContainer = $('#email-grid');
    this.panel = $('#content-settings');
    this.panelBody = $('.content-settings-body');
    this.structuresPanel = $('#headingOne');
    this.blockPanel = $('#headingTwo');

    this.setTriggers();
  }

  /**
   * Binds event listeners to toggle 
   * the content panel
   */
  setTriggers() {
    $('#email-grid').on('click', (ev) => {
      const target = ev.target;
      const isBlock = target.classList.contains('block');
      const panelClosed = this.panel.hasClass('closed');
      const structPanelOpen = ! $('#headingOne').hasClass('collapsed');
      const blockPanelOpen = ! $('#headingTwo').hasClass('collapsed');

      if (! isBlock) return;

      const content = this.emailBuilder.getContent(target);

      this.panel.toggleClass('closed');

      if (this.panel.hasClass('closed')) {
        this.panelBody.empty();
      }

      if (content && !this.panel.hasClass('closed')) {
        content.addFieldsToForm();
      }

      if (structPanelOpen && panelClosed) {
        this.structuresPanel.click();
      }

      if (blockPanelOpen && panelClosed) {
        this.blockPanel.click();
      }
    });

    $('.close-panel').on('click', () => {
      this.panel.addClass('closed');
    });
  }

  /**
   * Checks to see if an element can be copied or not
   * 
   * @public
   * @method copy
   * @param {HTMLElement} elm - HTML Element being copied 
   * @param {HTMLElement} src - HTML Element parent container of elm
   * @returns {boolean}
   */
  copy(elm, src) {
    // Only allow structs or blocks to be copied
    const struct = elm.classList.contains('structure');
    const block = elm.classList.contains('block');

    const contained = elm.classList.contains('contained');
    
    return (struct || block) && !contained;
  }

  /**
   * Dictates whether or not an element can move
   * 
   * @public
   * @method moves
   * @param {HTMLElement} el - the element being dragged/dropped 
   * @param {HTMLElement} source - the container of the selected element
   * @param {HTMLElement} handle - the element that was actually clicked
   * @param {HTMLElement} sibling - the sibling elements of the element
   */
  moves(el, source, handle, sibling) {
    const placeholder = handle.classList.contains('placeholder');
    const emailContainer = document.querySelector('#email-grid');    

    return source !== emailContainer && !placeholder;
  }

  /**
   * Checks to see if an elm can accept drops on a target elm
   * 
   * @public
   * @method accepts
   * @param {HTMLElement} elm - The elm being dropped
   * @param {HTMLElement} target - The target to check if it can accept drops
   * @param {HTMLElement} src - The source container of the elm being dropped
   * @param {HTMLElement} sibling - The siblings of the target
   * @returns {boolean}
   */
  accepts(elm, target, src, sibling) {
    const row = elm.classList.contains('structure');
    const block = elm.classList.contains('block');
    const emailContainer = document.querySelector('#email-grid');
    const blockContainer = document.querySelector('#block-container');
    const structContainer = document.querySelector('#structure-container');

    // Only allow the email container to accept drops
    if (target === blockContainer) return false;
    if (target === structContainer) return false;
    if (block && target === emailContainer) return false;

    // Rows cannot be dropped into columns
    if (row && target.classList.contains('empty')) return false;

    // Filled item holders cannot accept drops
    if (target.classList.contains('filled')) return false;

    return true;
  }

  /**
   * Handles all drops that occur on elements
   * inside all containers
   * 
   * @public
   * @method handleDrop
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
      this.handleBlockDrop(el, target, src);
    }

    this.htmlRenderer.addEmptyContentMsgs();
  }

  /**
   * Handles all occurrences of structure drops 
   * inside the email grid
   * 
   * @public
   * @method handleStructDrops
   * @param {HTMLElement} el 
   * @param {HTMLElement} target 
   */
  handleStructDrops(el, target) {
    this.htmlRenderer.transformRowOnDrop(el);
    
    this.emailBuilder.addRow(el);
  }

  /**
   * Handles all occurrences of block drops
   * inside the email grid or inside
   * structure elements
   * 
   * @public
   * @method handleBlockDrop
   * @param {HTMLElement} el - The element being dropped in
   * @param {HTMLElement} target - The target where the element is being dropped on
   */
  handleBlockDrop(el, target, src) {
    const contained = el.classList.contains('contained');
    const onItem = target.className.indexOf('item') > -1;
    const onStruct = target.classList.contains('structure');
    const onPlaceholder = target.classList.contains('placeholder');

    // If not dropping in anything, take up 100% width
    if (!onStruct && !onItem && !onPlaceholder) {
      this.htmlRenderer.editUncontainedBlock(el);
    } else {

      // Transferring from one col to another
      if (contained) {
        this.emailBuilder.resetColumn(src);
      }
      this.emailBuilder.addContent(el, target);
      this.htmlRenderer.addContentToColumn(el, target);
    }
  }
}