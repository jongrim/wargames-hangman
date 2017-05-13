var puzzles = require('./puzzles.js');
var helpers = require('./helpers.js');

// DOM elements
const body = document.body;
const consolePrompt = document.querySelector('.console');

const introLine = "Greetings Professor Falken. Shall we play a game?"
helpers.consoleWriter(introLine, consolePrompt);

body.addEventListener('onclick', loadGame);
body.addEventListener('keydown', loadGame);

function loadGame() {
    
}
