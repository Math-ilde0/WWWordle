
"use strict"

import Game from './Game.js';

class Answer {
  constructor() {
    this.form = this.createForm();
    this.inputs = this.form.querySelectorAll('input.letter');
    this.form.inert = true;
    document.querySelector('main.board').appendChild(this.form);
    this.inputs.forEach((input, index) => {
      input.addEventListener('keyup', (e) => this.keyUp(e, index));
    });
  }

  #createForm() {
    const form = document.createElement('form');
    form.classList.add('row');
    form.id = 'row-0';
    for (let i = 0; i < 5; i++) {
      const input = document.createElement('input');
      input.classList.add('letter');
      input.type = 'text';
      input.name = `letter-${i}`;
      input.id = `row-0--${i}`;
      input.maxLength = 1;
      form.appendChild(input);
    }
    const submitInput = document.createElement('input');
    submitInput.type = 'submit';
    submitInput.hidden = true;
    form.appendChild(submitInput);
    return form;
  }

  isAlphaNumericKey(key) {
	return /^([\x30-\x39]|[\x61-\x7a])$/i.test(key);
}

  keyUp(e, index) {
    if (this.isAlphaNumericKey(e.key) || e.key === 'ArrowRight') {
      if (index < this.inputs.length - 1) {
        this.inputs[index + 1].focus();
      }
    } else if (e.key === 'ArrowLeft') {
      if (index > 0) {
        this.inputs[index - 1].focus();
      }
    }
  }

  toggle() {
    if (this.form.inert) {
      this.form.removeAttribute('inert');
      this.inputs[0].focus();
    } else {
      this.form.inert = true;
    }
  }

  focusFirstInput() {
    this.inputs[0].focus();
  }
}

export default Answer;