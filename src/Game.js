"use strict"
import Answer from "./Answer";

 class Game {
  state = 'en cours';
  attempts = [];
  currentAttempt = null;
  currentInputIndex = 0;
  word = 'about';

  constructor(attempts) {
    this.attempts = attempts;
    this.currentAttempt = 0;
    this.answer = [];
    this.messageElement = document.querySelector('.message');

    for (let i = 0; i < attempts; i++) {
        const answer = new Answer(i);
        this.answer.push(answer);
    }
    this.answer[this.currentAttempt].activate();
    this.answer[this.currentAttempt].focus();
  }

  nextAttempt(){
    this.answer[this.currentAttempt].desactivate();
    this.currentAttempt++;

    if (this.currentAttempt < this.attempts) {
      this.answer[this.currentAttempt].activate();
      this.answer[this.currentAttempt].focus();
    } else {
      this.showMessage('game over');
    }
  }

  showMessage(message){
    this.messageElement.textContent = message;
  }
}
export default Game;