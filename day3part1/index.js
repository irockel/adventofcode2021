// move the submarine through the ocean.
const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  // split the contents by new line
  const lines = data.split(/\r?\n/);
  let gammaBits = "";
  let epsilonBits = "";

  for (let i = 0; i < lines[0].length; i++) {
      let zeroCounts = 0;
      let oneCounts = 0;
      for (let j = 0; j < lines.length; j++) {
          let token = lines[j].charAt(i);
          if (token === "1") {
              oneCounts++;
          } else {
              zeroCounts++;
          }
      }
      if (oneCounts > zeroCounts) {
          gammaBits += "1";
          epsilonBits += "0";
      } else {
          gammaBits += "0";
          epsilonBits += "1";
      }
  }
  console.log("gammaBits: " + gammaBits);
  console.log("epsilonBits: " + epsilonBits);

  console.log("The multiplied diagnostic gamma and epsilon is " + (parseInt(gammaBits, 2) * parseInt(epsilonBits, 2)));

} catch (err) {
  console.error(err)
}
