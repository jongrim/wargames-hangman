# WarGames Hangman
A WarGames themed variation of the classic hangman game.

Play it [here](https://jongrim.github.io/wargames-hangman)

## puzzles.js
### Classes
Contains one base puzzle class, `SimplePuzzle`, which is extended by every other puzzle class.

`SimplePuzzle` has these class properties:
- `prompt` (string): Directions for how to complete the puzzle. This property is set by each subclass.
- `hint` (string): A hint to the correct answer of the puzzle.
- `answer` (string): The correct answer for the puzzle.

`SimplePuzzle` exposes getters for each property. `SimplePuzzle` is subclassed by the following classes:
- `SentencePuzzle`: A 'complete the sentence' puzzle.
- `CharacterPuzzle`: A 'name the character' puzzle.
- `ActorPuzzle`: A 'name the actor / actress' puzzle.
- `LocationPuzzle`: A 'name the location' puzzle.
- `TriviaPuzzle`: A 'answer the trivia question' puzzle.

### Global variables
`puzzles` (array): Contains puzzle objects to be selected from when a random puzzle is needed.

### Exports
`getPuzzle()`
- Parameters: none.
- Returns: a random puzzle object from the `puzzles` array.

## game.js
game.js defines one constructor function, `Game()`. Game objects have the following properties and methods:

### Properties
- `puzzle` (Puzzle object): The puzzle for the current game.
- `puzzlePrompt` (string): The puzzle prompt.
- `puzzleHint` (string): The puzzle hint.
- `puzzleAnswer` (string): The puzzle answer.
- `guessesRemaining` (int): The number of guesses remaining. Initial value is 6.
- `lettersGuessed` (array): Holds each letter guessed.
- `isOver` (boolean): Whether or not the game is complete due to a solution being found or turns being depleted.
- `finalMessage` (string): The final message to be displayed following the end of the game.
- `solution` (string): The solution as figured out so far by the user. Initially this is all '_'. As letters are correctly guessed, their underscore is replaced by the letter. Spaces and punctuation are preserved.

### Methods
- `rewriteSolution()`: Updates the solution string to correctly reflect letters guessed so far.
- `addLetter()`: Add a letter to the lettersGuessed array.
- `checkGameStatus()`: Determine if the game is complete.
- `setFinalMessage()`: Set the final message depending on the success or failure to solve the puzzle.
- `makeGuess(letter)`: The main method for advancing the game. This method stitches together the others. It's only argument is the letter guessed by the user.
- `wordIncludes(word, letter)`: A helper method to determine if a word includes a letter.

### Exports
`Game` function reference.

## helpers.js
helpers.js defines helper functions used by other components of the game. There are two functions defined and exported.

`consoleWriter(toWrite, elt)`

consoleWriter is a way of writing text to the screen as though it were being typed by a machine. The effect is achieved by passing a message, `toWrite`, to a setInterval function which strips down the input to then reprint it one character at a time. `elt` is the target element to which the message should be written. The inner HTML of the element is rewritten repeatedly with an expanding paragraph element.

Because consoleWriter makes use of setInterval, it is asynchronous by nature. To enable delaying other code, such as writing a second message, a Promise object is returned and can be used.

`createElement(message, tag)`

createElement creates and returns an element of type `tag` containing `message`.

## hangman.js
This is the entrance point for the application, and as such, controls the flow of the game while using the other modules for the data and logic.

The game is run using the `loadGame()` function which creates a new `Game` object at start. loadGame declares three functions to advance gameplay: `writeStats()`, `nextTurn()`, `endGame()`. In order, `nextTurn()` is first called when a key is pressed by the user. If the key is a letter, then the local game object's `makeGuess` function is called. Following, `writeStats()` rewrites the game stats (solution, letters guessed, guesses remaining). The game status is then checked and if true, `endGame()` is called to display the final results and offer to start a new game.

My goal while writing this module was to keep all gameflow logic here, while deferring to other modules for specific implementation of game mechanics such as making a guess or creating a puzzle.

## Browser dependecy management
The application was developed using Node so modules make use of `require` and `exports` to share code. To compile this for running in the browser, I use webpack to handle the dependencies and produce a single file, bundle.js.
