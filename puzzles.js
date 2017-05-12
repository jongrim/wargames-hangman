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
        )
    ]

    function getPuzzle() {
        return puzzles[(Math.floor(Math.random() * puzzles.length))];
    }

    return {
        getPuzzle: getPuzzle
    }
}();
