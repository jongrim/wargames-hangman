var puzzles = require('./puzzles.js');
var helpers = require('./helpers.js');

var puzzle = puzzles.getPuzzle();
helpers.consoleWriter(puzzle.prompt);
