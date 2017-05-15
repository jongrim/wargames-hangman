var helpers = require('./helpers.js');
var gameMaker = require('./game.js');

// DOM elements
const body = document.body;
const intro1 = document.querySelector('#intro1');
const intro2 = document.querySelector('#intro2');
const header = document.querySelector('#header');
const prompt = document.querySelector('#prompt');
const hint = document.querySelector('#hint');
const solution = document.querySelector('#solution');
const guesses = document.querySelector('#guesses');
const letters = document.querySelector('#letters');
const finalMessage = document.querySelector('#finalMessage');
const playAgain = document.querySelector('#playAgain');

const introLine = "Greetings Professor Falken."
const introLine2 = "Shall we play a game? ";
helpers.consoleWriter(introLine, intro1).then(function () {
    helpers.consoleWriter(introLine2, intro2);
});

body.addEventListener('click', loadGame);
body.addEventListener('keydown', loadGame);

function loadGame() {
    // remove prior event listeners to avoid loading the game over again
    body.removeEventListener('click', loadGame);
    body.removeEventListener('keydown', loadGame);

    // make sure the end game divs are clear
    finalMessage.innerHTML = '';
    playAgain.innerHTML = '';

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
        helpers.consoleWriter(game.finalMessage, finalMessage)
            .then(function () {
                helpers.consoleWriter("Press any key to play again", playAgain);
            }
            );
        body.removeEventListener('keydown', nextTurn);
        body.addEventListener('keydown', loadGame);
        
    }

    // new event listener to execute game turns
    body.addEventListener('keydown', nextTurn);
    
    // set initial DOM values
    intro1.innerHTML = '';
    intro2.innerHTML = '';
    header.innerHTML = helpers.createElement('WarGames Hangman', 'h1');
    prompt.innerHTML = helpers.createElement(game.puzzlePrompt, 'p');
    hint.innerHTML = helpers.createElement(game.puzzleHint, 'p');
    writeStats();
}
