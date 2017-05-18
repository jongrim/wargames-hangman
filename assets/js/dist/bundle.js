/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var puzzles = __webpack_require__(3);

function Game () {
    this.puzzle = puzzles.getPuzzle();
    this.puzzlePrompt = this.puzzle.prompt;
    this.puzzleHint = this.puzzle.hint;
    this.puzzleAnswer = this.puzzle.answer;
    this.guessesRemaining = 6;
    this.lettersGuessed = [];
    this.isOver = false;
    this.finalMessages = [];
    this.solution = this.rewriteSolution();
}

Game.prototype.rewriteSolution = function () {
    let result = '';
    let ans = this.puzzleAnswer;
    for (let i = 0; i < ans.length; i++) {
        if (/[a-z]/i.test(ans[i])) {
            if (this.lettersGuessed.indexOf(ans[i].toUpperCase()) > -1) {
                result = result.concat(`${ans[i]}&nbsp`);
            } else {
                result = result.concat(`_&nbsp`);
            }
        } else {
            if (ans[i] === ' ') {
                result = result.concat('&nbsp&nbsp');
            } else {
                result = result.concat(`${ans[i]}&nbsp`);
            }
        }
    }
    return result;
}

Game.prototype.addLetter = function (letter) {
    this.lettersGuessed.push(letter.toUpperCase());
}

Game.prototype.checkGameStatus = function () {
    // game is over if no guesses remain or if puzzle has been solved
    if (this.guessesRemaining <= 0) {
        this.isOver = true;
    }

    if (!this.solution.includes('_')) {
        this.isOver = true;
    }
}

Game.prototype.setFinalMessage = function () {
    if (this.solution.includes('_')) {
        this.finalMessages.push("Missiles launched.");
        this.finalMessages.push("Game Over.");
    } else {
        this.finalMessages.push("Optimal solution found.");
        this.finalMessages.push("How about a nice game of chess?");
    }
}

Game.prototype.makeGuess = function (letter) {
    // check if the letter has already been guessed
    if (this.lettersGuessed.indexOf(letter.toUpperCase()) > -1) {
        return;
    }

    // add letter to the guessed letters
    this.addLetter(letter);

    if (this.wordIncludes(this.puzzleAnswer, letter)) {
        // update solution string
        this.solution = this.rewriteSolution();
    } else {
        // decrease remaining guesses
        this.guessesRemaining--;
    }

    // check game status
    this.checkGameStatus();
    if (this.isOver) {
        this.setFinalMessage();
    }

}

Game.prototype.wordIncludes = function (word, letter) {
    return word.toUpperCase().includes(letter.toUpperCase());
}

exports.Game = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function consoleWriter(toWrite, elt) {
    return new Promise(function (resolve) {
        // Takes the input string and writes it out at an interval
        let curChar = 0

        let writer = setInterval(function () {
            let s = elt.textContent;
            let n = getNextCharacter();
            if (n === undefined) {
                window.clearInterval(writer);
                resolve();
                return;
            } else {
                n = n.toUpperCase();
            }
            let message = s.concat(n);
            elt.innerHTML = createElement(message, 'p');
        }, 100);

        
        let getNextCharacter = function () {
            if (curChar < toWrite.length) {
                let nextChar = toWrite[curChar];
                curChar++;
                return nextChar;
            }
        }
    });
}

function createElement (message, tag) {
    return `<${tag}>${message}</${tag}>`;
}

exports.consoleWriter = consoleWriter;
exports.createElement = createElement;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var helpers = __webpack_require__(1);
var gameMaker = __webpack_require__(0);

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
const finalMessage1 = document.querySelector('#finalMessage1');
const finalMessage2 = document.querySelector('#finalMessage2');
const playAgain = document.querySelector('#playAgain');

const introLine = "Greetings Professor Falken.";
const introLine2 = "Shall we play a game?";
helpers.consoleWriter(introLine, intro1).then(function () {
    helpers.consoleWriter(introLine2, intro2);
});

body.addEventListener('click', loadGame);
body.addEventListener('keydown', loadGame);

function loadGame() {
    let game = new gameMaker.Game()
    
    function writeStats() {
        // updates the changing game stats
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
            }
        }
    }

    function endGame() {
        // clear the message divs in case there was writing happening unseen
        finalMessage1.innerHTML = '';
        finalMessage1.style.display = 'block';
        finalMessage2.innerHTML = '';
        finalMessage2.style.display = 'block';
        playAgain.innerHTML = '';
        playAgain.style.display = 'block';
        let finalMessages = game.finalMessages
        helpers.consoleWriter(finalMessages[0], finalMessage1)
            .then(function () {
                helpers.consoleWriter(finalMessages[1], finalMessage2)
                    .then(function () {
                        helpers.consoleWriter("Press any key to play again.",
                            playAgain);
                    });
            });
        body.removeEventListener('keydown', nextTurn);
        body.addEventListener('keydown', loadGame);
        
    }

    // remove prior event listeners to avoid loading the game over again
    body.removeEventListener('click', loadGame);
    body.removeEventListener('keydown', loadGame);

    // new event listener to execute game turns
    body.addEventListener('keydown', nextTurn);

    // make sure the end game divs are clear
    finalMessage1.innerHTML = '';
    finalMessage1.style.display = 'none';
    finalMessage2.innerHTML = '';
    finalMessage2.style.display = 'none';
    playAgain.innerHTML = '';
    playAgain.style.display = 'none';
    
    // set initial DOM values
    intro1.style.display = 'none';
    intro2.style.display = 'none';
    header.innerHTML = helpers.createElement('WarGames Hangman', 'h1');
    prompt.innerHTML = helpers.createElement(game.puzzlePrompt, 'p');
    hint.innerHTML = helpers.createElement(game.puzzleHint, 'p');
    writeStats();
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class SimplePuzzle {
    constructor(prompt, hint, answer) {
        this._prompt = prompt;
        this._hint = hint;
        this._answer = answer;
    }

    get prompt() {
        return this._prompt;
    }

    get hint() {
        return this._hint;
    }

    get answer() {
        return this._answer;
    }
}

class SentencePuzzle extends SimplePuzzle {
    constructor(hint, answer) {
        super('Complete the sentence / phrase', hint, answer);
    }
}

class CharacterPuzzle extends SimplePuzzle {
    constructor(hint, answer) {
        super('Name the character', hint, answer);
    }
}

class ActorPuzzle extends SimplePuzzle {
    constructor(hint, answer) {
        super('Name the actor / actress', hint, answer);
    }
}

class LocationPuzzle extends SimplePuzzle {
    constructor(hint, answer) {
        super('Name the location', hint, answer);
    }
}

class TriviaPuzzle extends SimplePuzzle {
    constructor(hint, answer) {
        super('Answer the trivia question', hint, answer);
    }
}

var puzzles = [
    new SentencePuzzle('The only winning move is', 'Not to play'),
    new CharacterPuzzle(
        "I'm a supercomputer who enjoys a nice game of chess",
        "WOPR"
    ),
    new TriviaPuzzle(
        "This government agency runs an operations center in the Cheyenne Mountain Complex",
        "NORAD"
    ),
    new ActorPuzzle(
        "I play David Lightman, a teenage hacker",
        "Matthew Broderick"
    ),
    new ActorPuzzle(
        "I play Jennifer Mack, a teenage girl who didn't know what to expect",
        "Ally Sheedy"
    ),
    new TriviaPuzzle(
        "David plays this classic game in the arcade",
        "Galaga"
    ),
    new LocationPuzzle(
        "This is David and Jennifer's hometown",
        "Seattle"
    ),
    new LocationPuzzle(
        "This is the first place chosen to be nuked",
        "Las Vegas"
    ),
    new TriviaPuzzle(
        "Randomly dialing numbers to discover computer connections is referred to as",
        "War dialing"
    ),
    new CharacterPuzzle(
        "This company creates 'the future' of computer games",
        "Protovision"
    ),
    new TriviaPuzzle(
        "What was the password to access WOPR?",
        "Joshua"
    ),
    new SentencePuzzle(
        "That system probably contains the new...",
        "Data encryption algorithm"
    ),
    new TriviaPuzzle(
        "What is Lightman told to look for to access the unidentified system?",
        "Backdoor"
    ),
    new TriviaPuzzle(
        "What was the first game on the list which helped Lightman discover the system's creator",
        "Falken's Maze"
    ),
    new TriviaPuzzle(
        "What game does Lightman choose to play with WOPR?",
        "Global Thermonuclear War"
    ),
    new TriviaPuzzle(
        "What side does Lightman choose in the game, Global Thermonuclear War?",
        "USSR"
    ),
    new SentencePuzzle(
        "What is the primary goal?",
        "To win the game"
    ),
    new TriviaPuzzle(
        "David uses this to break out of the holding room",
        "Tape recorder"
    ),
    new LocationPuzzle(
        "Dr. Falken retires to this location",
        "Goose Island"
    )
]

exports.getPuzzle = function getPuzzle() {
    return puzzles[(Math.floor(Math.random() * puzzles.length))];
}


/***/ })
/******/ ]);