// move the submarine through the ocean.
const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // the last int starts with -1;
  let forwardPos = 0;
  let depthPos = 0;
  let aimPos = 0;

  // parse all lines
  lines.forEach((line) => {
      const tokens = line.split(" ");
      if (tokens.length > 0) {
          if (tokens[0] === "forward") {
              forwardPos += parseInt(tokens[1]);
              depthPos += parseInt(tokens[1]) * aimPos;
          } else if (tokens[0] === "down") {
              aimPos += parseInt(tokens[1]);
          } else if (tokens[0] === "up") {
              aimPos -= parseInt(tokens[1]);
          }
      }
  });
  console.log("The multiplied submarine pos is " + (depthPos * forwardPos));

} catch (err) {
  console.error(err)
}
