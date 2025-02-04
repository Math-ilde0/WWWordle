"use strict"

import Game from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(document.querySelector('.board'), document.querySelector('.message'));
});