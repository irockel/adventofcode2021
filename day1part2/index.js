// read the numbers from the input file and count what signals are bigger than
// the previous one by always looking at a block of three numbers shifted by one to
// each other.
const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  let isBiggerCount = 0;

  for (let i = 0; i < lines.length; i++) {
      if (i > 3) {
          let slidingWindowA = parseInt(lines[i-2]) + parseInt(lines[i-3]) + parseInt(lines[i-4]);
          let slidingWindowB = parseInt(lines[i-1]) + parseInt(lines[i-2]) + parseInt(lines[i-3]);
          if (slidingWindowB > slidingWindowA) {
              isBiggerCount++;
          }
      }
  }

  console.log("The amount of signals bigger than the last one is " + isBiggerCount);

} catch (err) {
  console.error(err)
}
