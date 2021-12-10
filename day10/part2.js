// find overlapping vent lines.
const fs = require('fs')

try {
    const data = fs.readFileSync('input.txt', 'utf8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);
    let closingScores = [];

    for (let i = 0; i < lines.length; i++) {
        let result = validCheck(lines[i]);
        if (result > 0) {
            closingScores.push(result);
        }
    }

    // determine the middle score of the sorted result
    closingScores.sort((a, b) => a - b);;
    let middleScore = closingScores[(Math.round(closingScores.length / 2))-1];

    console.log("The middle high score of illegal characters is " + middleScore);

} catch (err) {
    console.error(err)
}

/**
 * check if the line is valid and return a score value for fill up brackets needed
 * ): 1 point.
 * ]: 2 points.
 * }: 3 points.
 * >: 4 points.
 *
 * @param line
 * @returns {number}
 */
function validCheck(line) {
    let bracketStack = [];
    let score = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === "(" || line[i] === "[" || line[i] === "{" || line[i] === "<") {
            bracketStack.push(line[i]);
        } else if ((line[i] === ")" && bracketStack[bracketStack.length - 1] === "(")
            || (line[i] === "]" && bracketStack[bracketStack.length - 1] === "[")
            || (line[i] === "}" && bracketStack[bracketStack.length - 1] === "{")
            || (line[i] === ">" && bracketStack[bracketStack.length - 1] === "<")) {
            bracketStack.pop();
        } else {
            return -1;
        }
    }

    for (let i = bracketStack.length -1; i >= 0; i--) {
        let char = bracketStack[i];
        score *= 5;
        if (char === "(") {
            score += 1;
        } else if (char === "[") {
            score += 2;
        } else if (char === "{") {
            score += 3;
        } else if (char === "<") {
            score += 4;
        }
    }

    return score;
}
