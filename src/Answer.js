
"use strict"

import Game from './Game.js';

class Answer {
  constructor(game, index) {
  this.game = game;
  this.index = index;
  this.form = document.querySelector(`.board #row-${index}`);
  if (!this.form) {
    throw new Error(`Form with id "row-${index}" not found`);
  }
  this.inputs = Array.from(this.form.querySelectorAll('input.letter'));
  this.form.addEventListener('submit', this.handleSubmit.bind(this));
}

  activate() {
    this.form.removeAttribute('inert');
  }

  deactivate() {
    this.form.setAttribute('inert', '');
  }

  focus() {
    this.inputs[0].focus();
  }

  handleSubmit(event) {
    event.preventDefault();

    const word = this.inputs.map(input => input.value).join('');
    if (!this.isValidWord(word)) {
      return;
    }

    fetch('https://progweb-wwwordle-api.onrender.com/guess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guess: word })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'invalid') {
        this.game.showMessage(data.message);
        return;
      }
      data.feedback.forEach((letter, i) => {
        this.inputs[i].classList.add(letter.status);
      });
    })
    .catch(error => {
      this.game.showMessage('Erreur de réseau');
    });
  }

  isValidWord(word) {
    if (word.length !== 5) {
      this.game.showMessage('Word must be 5 letters long');
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(word)) {
      this.game.showMessage('Word must contain only letters');
      return false;
    }
    return true;
  }
}
export default Answer;