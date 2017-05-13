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
/***/ (function(module, exports) {

function consoleWriter(toWrite, elt) {
    // Takes the input string and writes it out at an interval
    let curChar = 0

    let writer = setInterval(function () {
        let s = elt.innerText;
        let n = getNextCharacter();
        if (n === ' ') {
            n = '&nbsp';
        } else if (n === undefined) {
            window.clearInterval(writer);
            return;
        } else {
            n = n.toUpperCase();
        }
        let message = s.concat(n);
        elt.innerHTML = padSentence(message);
    }, 100);

    let getNextCharacter = function () {
        if (curChar < toWrite.length) {
            let nextChar = toWrite[curChar];
            curChar++;
            return nextChar;
        }
    }

    let padSentence = function (message) {
        return `<p>${message}</p>`;
    }
}

exports.consoleWriter = consoleWriter;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
The quotes module contains a list of quotes or items from the movie Wargames.
The module is used by the main game module to retrieve an entry for each
round of the game.

Exported Methods:
    getQuote: Retrieve a random quote from the stored array.
*/

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

class ThingPuzzle extends SimplePuzzle {
    constructor(hint, answer) {
        super('Name the object', hint, answer);
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
    new SentencePuzzle('The only winning move is', 'not to play'),
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var puzzles = __webpack_require__(1);
var helpers = __webpack_require__(0);

// DOM elements
const body = document.rootElement;
console.log(body);
const consolePrompt = document.querySelector('.console');

const introLine = "Greetings Professor Falken. Shall we play a game?"
helpers.consoleWriter(introLine, consolePrompt);






/***/ })
/******/ ]);