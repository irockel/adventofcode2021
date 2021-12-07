// find overlapping vent lines.
const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  let crabs = data.split(",");
  let max = findMax(crabs);

  let min = crabs.length * max * max;
  let minPos = 0;

  for (let i = 0; i < max; i++) {
    let sum = 0;
    for (let j = 0; j < crabs.length; j++) {
        sum += calculateFuel(Math.abs(crabs[j] - i));
        if (sum >= min) {
            break;
        }
    }

    if (sum < min) {
        min = sum;
        minPos = i;
    }
  }

  console.log("The minimum amount of fuel needed is " + min + " at pos " + minPos);

} catch (err) {
  console.error(err)
}

/**
 * find the crab with the maximum distance from position zero.
 * @param crabs the crabs to check.
 * @returns {number} the maximum distance.
 */
function findMax(crabs) {
    let max = 0;

    for (let i = 0; i < crabs.length; i++) {
        if (crabs[i] > max) {
            max = crabs[i];
        }
    }

    return max;
}

function calculateFuel(distance) {
    let fuel = 0;

    for (let i = 1; i <= distance; i++) {
        fuel += i;
    }

    return fuel;
}

