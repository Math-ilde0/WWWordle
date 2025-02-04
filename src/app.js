"use strict"

import Game from './Game.js';

// Nombre de tentatives max
const MAX_ATTEMPTS = 6;

// Initialisation 
const game = new Game(MAX_ATTEMPTS);

game.start();