// read the numbers from the input file and count what signals are bigger than
// the previous one.
const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // the last int starts with -1;
  let lastInt = -1;
  let isBiggerCount = 0;

  // parse all lines
  lines.forEach((line) => {
        let currentInt = parseInt(line);
        if (currentInt > lastInt && lastInt !== -1) {
          isBiggerCount++;
        }
        lastInt = currentInt;
    });
  console.log("The amount of signals bigger than the last one is " + isBiggerCount);

} catch (err) {
  console.error(err)
}

