// move the submarine through the ocean.
const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  oxygenRating = filterResults(false, lines, 0);
  co2Rating = filterResults(true, lines, 0);

  console.log("The multiplied diagnostic oxygen and co2 rating is " + (parseInt(oxygenRating, 2) * parseInt(co2Rating, 2)));

} catch (err) {
  console.error(err)
}

/**
 * filter the results based on either the least value or the lower
 * value.
 * @param least boolean, true if the least value should be taken into account
 * @param lines the lines to filter.
 * @param index the start index, use 0 for the first call.
 */
function filterResults(least, lines, index) {
    let zeroList = [];
    let oneList = [];

    if (lines.length === 1) {
        return lines[0];
    } else {
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].charAt(index) === "1") {
                oneList.push(lines[i]);
            } else {
                zeroList.push(lines[i]);
            }
        }

        if (!least) {
            return filterResults(least, oneList.length >= zeroList.length ? oneList : zeroList,
                index === oneList[0].length -1 ? 0 : index+1);
        } else {
            return filterResults(least, oneList.length < zeroList.length ? oneList : zeroList,
                index === oneList[0].length -1 ? 0 : index+1);
        }
    }
}
