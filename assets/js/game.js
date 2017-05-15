var puzzles = require('./puzzles.js');

function Game () {
    this.puzzle = puzzles.getPuzzle();
    this.puzzlePrompt = puzzle.prompt;
    this.puzzleHint = puzzle.hint;
    this.puzzleAnswer = puzzle.answer;
    this.guessesRemaining = 6;
    this.lettersGuessed = [];
    this.isOver = false;
    this.addLetter = function (letter) {
        this.lettersGuessed.push(letter);
    }
    this.findOccurences = function (letter) {
        // Parameter: letter (string)
        let occursAt = [];
        if (this.puzzleAnswer.includes(letter)) {
            // Find and return all occurences
            let ans = this.puzzleAnswer;
            for (var i = 0; i < ans; i++) {
                if (ans[i] === letter) {
                    occursAt.push(i);
                }
            }
        }
        return occursAt;
    }
}

exports.game = Game;
