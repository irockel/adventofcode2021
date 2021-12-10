// find overlapping vent lines.
const fs = require('fs')

try {
    const data = fs.readFileSync('input.txt', 'utf8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);
    let invalidHighScore = 0;

    for (let i = 0; i < lines.length; i++) {
        let result = validCheck(lines[i]);
        if (result > 0) {
            invalidHighScore += result;
        }
    }

    console.log("The high score of illegal characters is  " + invalidHighScore);

} catch (err) {
    console.error(err)
}

/**
 * check if the line is valid and return a score value for the first invalid
 * character found:
 * ): 3 points.
 * ]: 57 points.
 * }: 1197 points.
 * >: 25137 points.
 * @param line
 * @returns {number}
 */
function validCheck(line) {
    let bracketStack = [];
    for (let i = 0; i < line.length; i++) {
        if (line[i] === "(" || line[i] === "[" || line[i] === "{" || line[i] === "<") {
            bracketStack.push(line[i]);
        } else if ((line[i] === ")" && bracketStack[bracketStack.length - 1] === "(")
            || (line[i] === "]" && bracketStack[bracketStack.length - 1] === "[")
            || (line[i] === "}" && bracketStack[bracketStack.length - 1] === "{")
            || (line[i] === ">" && bracketStack[bracketStack.length - 1] === "<")) {
            bracketStack.pop();
        } else {
            if (line[i] === ")") {
                return 3;
            } else if (line[i] === "]") {
                return 57;
            } else if (line[i] === "}") {
                return 1197;
            } else if (line[i] === ">") {
                return 25137;
            }
        }
    }

    return 0;
}
