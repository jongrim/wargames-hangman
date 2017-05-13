var puzzles = require('./puzzles.js');

var game = {
    puzzle: puzzles.getPuzzle(),
    guessesRemaining: 6,
    lettersGuessed: [],
    puzzlePrompt: this.puzzle.prompt,
    puzzleHint: this.puzzle.hint,
    puzzleAnswer: this.puzzle.Answer,
    newGuess: function (guess) {
    }
}
