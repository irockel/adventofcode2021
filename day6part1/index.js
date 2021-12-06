// find overlapping vent lines.
const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  let fish = data.split(",");

  for (let i = 0; i < 80; i++) {
      desc(fish);
  }

  console.log("Amount of lanternfish after 80 rounds " + fish.length);

} catch (err) {
  console.error(err)
}

/**
 * descend and grow the fish one round.
 * @param fish
 * @returns {*}
 */
function desc(fish) {
    let newFish = [];
    for (let i = 0; i < fish.length; i++) {
        if (fish[i] === 0) {
            newFish.push(8);
            fish[i] = 6;
        } else {
            fish[i]--;
        }
    }

    if (newFish.length > 0) {
        fish.push(...newFish);
    }

    //console.log("fish: " + fish);
}

