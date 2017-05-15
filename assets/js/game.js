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
                if (ans[i] in this.lettersGuessed) {
                    result = result.concat(`${ans[i]} `);
                } else {
                    result = result.concat(`_ `);
                }
            } else {
                result = result.concat(`${ans[i]} `);
            }
        }
        return result;
    }
    
    this.solution = this.rewriteSolution();

    this.addLetter = function (letter) {
        this.lettersGuessed.push(letter);
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
        if (this.contains('_')) {
            this.finalMessage = "Sorry. You didn't find the answer.";
        } else {
            this.finalMessage = "Optimal solution found."
        }
    }
    
    this.makeGuess = function (letter) {
        // check if the letter has already been guessed
        if (letter in this.lettersGuessed) {
            return;
        }

        // add letter to the guessed letters
        this.addLetter(letter);

        // decrease remaining guesses
        this.guessesRemaining--;

        // update solution string
        this.solution = this.rewriteSolution();

        // check game status
        this.checkGameStatus();
        if (this.isOver) {
            this.setFinalMessage();
        }

        // write solution to DOM

    }
}

exports.Game = Game;
