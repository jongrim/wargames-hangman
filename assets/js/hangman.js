var helpers = require('./helpers.js');
var gameMaker = require('./game.js');

// DOM elements
const body = document.body;
const topContainer = document.querySelector('#topContainer');
const bottomContainer = document.querySelector('#bottomContainer');
const header = document.querySelector('#header');
const prompt = document.querySelector('#prompt');
const hint = document.querySelector('#hint');
const solution = document.querySelector('#solution');
const guesses = document.querySelector('#guesses');
const letters = document.querySelector('#letters');
const finalMessage = document.querySelector('#finalMessage');

const introLine = "Greetings Professor Falken. Shall we play a game?";
helpers.consoleWriter(introLine, topContainer);

body.addEventListener('click', loadGame);
body.addEventListener('keydown', loadGame);

function loadGame() {
    // remove prior event listeners to avoid loading the game over again
    body.removeEventListener('click', loadGame);
    body.removeEventListener('keydown', loadGame);

    let game = new gameMaker.Game()
    
    function writeStats() {
        solution.innerHTML = helpers.createElement(game.solution, 'p');
        guesses.innerHTML = helpers.createElement(
            `World destruction in: ${game.guessesRemaining}`, 'p'
        );
        letters.innerHTML = helpers.createElement(
            game.lettersGuessed.join(' '), 'p'
        );
    }

    // nextTurn function executes each turn of the game
    function nextTurn(event) {
        if (/^[a-z]{1}$/.test(event.key)) {
            game.makeGuess(event.key);
            writeStats();
            if (game.isOver) {
                endGame();
                writeStats();
            }
        }
    }

    function endGame() {
        finalMessage.innerHTML = helpers.createElement(game.finalMessage, 'p');
        body.removeEventListener('keyup', nextTurn);
    }

    // new event listener to execute game turns
    body.addEventListener('keyup', nextTurn);
    
    // set initial DOM values
    topContainer.innerHTML = '';
    header.innerHTML = helpers.createElement('WarGames Hangman', 'h1');
    prompt.innerHTML = helpers.createElement(game.puzzlePrompt, 'p');
    hint.innerHTML = helpers.createElement(game.puzzleHint, 'p');
    writeStats();
}
