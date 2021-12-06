// find overlapping vent lines.
const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  let fish = data.split(",");

  for (let i = 0; i < 256; i++) {
      desc(fish);
  }

  let length = 0;
  for (let i = 0; i < fish.length; i++) {
      if (typeof fish[i] == "string" && fish[i].includes(":")) {
          let tokens = fish[i].split(":");
          length += parseInt(tokens[0]);
      } else {
          length++;
      }
  }

  console.log("Amount of lanternfish after 256 rounds " + length);

} catch (err) {
  console.error(err)
}

/**
 * descend and grow the fish one round.
 * @param fish
 * @returns {*}
 */
function desc(fish) {
    let newFishCount = 0;
    for (let i = 0; i < fish.length; i++) {

        if (typeof fish[i] == "string" && fish[i].includes(":")) {
            let tokens = fish[i].split(":");
            if (tokens[1] === "0") {
                fish[i] = tokens[0] + ":6";
                newFishCount += parseInt(tokens[0]);
            } else {
                fish[i] = tokens[0] + ":" + (tokens[1] -1);
            }
        } else if (fish[i] === 0) {
            newFishCount++;
            fish[i] = 6;
        } else {
            fish[i]--;
        }
    }

    if (newFishCount > 0) {
        fish.push(newFishCount + ":8" );
    }

    return fish;
}

