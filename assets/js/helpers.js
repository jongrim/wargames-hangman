function consoleWriter(toWrite, elt) {
    return new Promise(function (resolve, reject) {
        // Takes the input string and writes it out at an interval
        let curChar = 0

        let writer = setInterval(function () {
            let s = elt.innerText;
            let n = getNextCharacter();
            if (n === ' ') {
                n = '&nbsp';
            } else if (n === undefined) {
                window.clearInterval(writer);
                resolve();
                return;
            } else {
                n = n.toUpperCase();
            }
            let message = s.concat(n);
            elt.innerHTML = createElement(message, 'p');
        }, 100);

        
        let getNextCharacter = function () {
            if (curChar < toWrite.length) {
                let nextChar = toWrite[curChar];
                curChar++;
                return nextChar;
            }
        }
    });
}

function createElement (message, tag) {
    return `<${tag}>${message}</${tag}>`;
}

exports.consoleWriter = consoleWriter;
exports.createElement = createElement;
