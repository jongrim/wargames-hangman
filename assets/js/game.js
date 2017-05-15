var puzzles = require('./puzzles.js');

function Game () {
    this.puzzle = puzzles.getPuzzle();
    this.puzzlePrompt = this.puzzle.prompt;
    this.puzzleHint = this.puzzle.hint;
    this.puzzleAnswer = this.puzzle.answer;
    this.guessesRemaining = 6;
    this.lettersGuessed = [];
    this.isOver = false;
    this.finalMessage = '';

    this.rewriteSolution = function () {
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

    this.solution = this.rewriteSolution();

    this.addLetter = function (letter) {
        this.lettersGuessed.push(letter.toUpperCase());
    }

    this.checkGameStatus = function () {
        // game is over if no guesses remain or if puzzle has been solved
        if (this.guessesRemaining <= 0) {
            this.isOver = true;
        }

        if (!this.solution.includes('_')) {
            this.isOver = true;
        }
    }

    this.setFinalMessage = function () {
        if (this.solution.includes('_')) {
            this.finalMessage = "Missiles launched. Game Over.";
        } else {
            this.finalMessage = "Optimal solution found. How about a nice game of chess?";
        }
    }
    
    this.makeGuess = function (letter) {
        // check if the letter has already been guessed
        if (this.lettersGuessed.indexOf(letter.toUpperCase() > -1)) {
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

    this.wordIncludes = function (word, letter) {
        return word.toUpperCase().includes(letter.toUpperCase());
    }
}

exports.Game = Game;