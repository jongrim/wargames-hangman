var helpers = require('./helpers.js');
var gameMaker = require('./game.js');

// DOM elements
const body = document.body;
const container = document.querySelector('.container');

const introLine = "Greetings Professor Falken. Shall we play a game?"
helpers.consoleWriter(introLine, container);

body.addEventListener('click', loadGame);
body.addEventListener('keydown', loadGame);

function loadGame() {
    let game = new gameMaker.Game()
    console.log(game);
}
