import Field from './Field.js';

export default class PaddingField extends Field {
  constructor(content) {
    super(content);
    this.elm = $(`
      <div class="form-group">
        <div>
          <label>Padding</label>
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
          <small class="float-right pad-right-sm">More Options</small>
          <hr />
          <div class="lower-padding">
            ${this.getSimplePadding('All')}
          </div>
        </div>
      </div>
    `);

    this.setTriggers();
  }

  setTriggers() {
    $(document).on('click' ,'.number-spinner a', this.togglePaddingValue);
    $(document).on('click', '.slider', this.togglePaddingForm.bind(this));
  }

  togglePaddingValue() {
    const btn = $(this);
    const input = btn.closest('.number-spinner').find('input');
    let total = Number(input.val());

    if (btn.attr('data-dir') === 'up') {
      if (total < input.attr('max')) {
        total += 5;
      }
    } else {
      if (total > input.attr('min')) {
        total -= 5;
      }
    }

    input.val(total);
  }

  togglePaddingForm() {
    const padWrapper = $('.lower-padding');
    const simplePad = this.getSimplePadding('All');
    const complexPad = this.getComplexPadding();

    padWrapper.toggleClass('complex-pad');

    padWrapper.empty();

    if (padWrapper.hasClass('complex-pad')) {
      $(complexPad).appendTo(padWrapper);
    } else {
      $(simplePad).appendTo(padWrapper);
    }
  }

  getSimplePadding(label) {
    return (`
      <div>
        <label class="label-center">${label}</label>
        <div class="input-group number-spinner col-md-6">
          <span class="input-group-btn">
            <a class="btn btn-default" data-dir="dwn"><span class="glyphicon glyphicon-minus"></span></a>
          </span>
          <input type="number" class="form-control form-control-inline float-right" value="0" max="40" min="0" />
          <span class="input-group-btn">
            <a class="btn btn-default" data-dir="up"><span class="glyphicon glyphicon-plus"></span></a>
          </span>
        </div>
      </div>
    `);
  }

  getComplexPadding() {
    return (`
      ${this.getSimplePadding('Top')}
      <br/>
      ${this.getSimplePadding('Right')}
      <br/>
      ${this.getSimplePadding('Bottom')}
      <br/>
      ${this.getSimplePadding('Left')}
    `);
  }
}