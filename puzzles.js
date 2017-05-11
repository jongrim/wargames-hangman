/*
The quotes module contains a list of quotes or items from the movie Wargames.
The module is used by the main game module to retrieve an entry for each
round of the game.

Exported Methods:
    getQuote: Retrieve a random quote from the stored array.
*/

var puzzles = function () {
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
            super('Complete the sentence', hint, answer);
        }
    }

    class CharacterPuzzle extends SimplePuzzle {
        constructor(hint, answer) {
            super('Name the character', hint, answer);
        }
    }

    var puzzles = [
        new SentencePuzzle('The only winning move is', 'not to play'),
        new CharacterPuzzle(
            "I'm a supercomputer who enjoys a nice game of chess",
            "WOPR"
        ),
    ]

    function getPuzzle() {
        return puzzles[(Math.floor(Math.random() * puzzles.length))];
    }

    return {
        getPuzzle: getPuzzle
    }
}();
