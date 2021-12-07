// find overlapping vent lines.
const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  let mapping = [];
  let max = 0;
  lines.forEach((line) => {
     let tokens = line.split(" -> ");

     if (tokens.length > 1) {
         let coords = (tokens[0] + "," + tokens[1]).split(",");

         //console.log("coords: "+ coords + " coords[0] = " + coords[0] + ", coords[2] =" + coords[2]);
         if (coords[0] === coords[2] || coords[1] === coords[3]) {
             // only non-diagonal lines
             mapping.push(coords);
             for (let i = 0; i < coords.length; i++) {
                 if (coords[i] > max) {
                     max = coords[i];
                 }
             }
         }
     }
  });

  // coords start at 0, so we need to add one.
  max++;

  let overlapping = 0;
  for (let x = 0; x < max; x++) {
      for (let y = 0; y < max; y++) {
          overlapping += checkMatching(x, y, mapping) ? 1 : 0;
      }
  }

  console.log("Amount of points with at least two overlapping lines is " + overlapping);

} catch (err) {
  console.error(err)
}

/**
 * check matching projections for the given coordinate, if at least 2 return true
 * @param x the x value of the coordinate
 * @param y the y value of the coordinate
 * @param mappings the projections / mappings to check.
 * @returns {boolean} true, if at least projections on the given coordinate.
 */
function checkMatching(x, y, mappings) {
    let matches = 0;
    for (let k = 0; k < mappings.length; k++) {
        let coords = mappings[k];
        if (((y >= coords[1] && y <= coords[3]) ||
                (y <= coords[1] && y >= coords[3])) &&
            ((x >= coords[0] && x <= coords[2]) ||
                (x <= coords[0] && x >= coords[2])))
        {
            matches++;
            if (matches >= 2) {
                break;
            }
        }
    }

    return matches >= 2;
}

