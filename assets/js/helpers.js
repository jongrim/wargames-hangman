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
