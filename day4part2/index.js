// find the loosing bingo board
const fs = require('fs')

const boardSize = 5;

try {
  const data = fs.readFileSync('input.txt', 'utf8')

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // first get the turns
  let turns = lines[0].split(",");

  // parse the boards from the input data.
  let boards = parseBoards(lines);

  let winningOrder = [];
  let winningNumber = 0;

  // play the game
  for (let i = 0; i < turns.length; i++) {
      for (let j = 0; j < boards.length; j++) {
          mark(parseInt(turns[i]), boards[j]);
          if (check(boards[j])) {
              if (!contains(winningOrder, j)) {
                  winningOrder.push(j);
                  winningNumber = parseInt(turns[i]);
              }
          }
      }
      if (winningOrder.length === boards.length) {
          break;
      }
  }
  // calculate winning score
  let loosingBoardScore = calculateBoardScore(boards[winningOrder[winningOrder.length-1]], winningNumber);

  console.log("The score of the loosing board is " + loosingBoardScore);

} catch (err) {
  console.error(err)
}

function contains(winningOrder, j) {
    for (let i = 0; i < winningOrder.length; i++) {
        if (winningOrder[i] === j) {
            return true;
        }
    }

    return false;
}

function mark(number, board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === number) {
                if (number !== 0) {
                    board[i][j] = board[i][j] * -1;
                } else {
                    board[i][j] = -100;
                }
            }
        }
    }
}

/**
 * check if the given board has one.
 * @param board the board to check
 * @returns {boolean} true, if there's a winning row.
 */
function check(board) {
    for (let i = 0; i < board.length; i++) {
        let negative = true;
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] >= 0) {
                negative = false;
                break;
            }
        }

        if (negative) {
            return true;
        }
    }

    for (let i = 0; i < board[0].length; i++) {
        let negative = true;
        for (let j = 0; j < board.length; j++) {
            if (board[j][i] >= 0) {
                negative = false;
                break;
            }
        }
        if (negative) {
            return true;
        }
    }

    return false;
}

/**
 * parse in the boards from the input data
 * @param lines the input data as string lines as read from the file.
 * @returns {*[]}
 */
function parseBoards(lines) {
    let boards = [];

    let board = []
    for (let i = 2; i < lines.length; i++) {
        if (lines[i].trim() !== "") {
            let fields = lines[i].split(" ");
            let row = [];
            for (let j = 0; j < fields.length; j++) {
                // filter empty tokens because of double blanks
                if (fields[j].trim() !== "") {
                    row.push(parseInt(fields[j]));
                }
            }
            board.push(row);
        } else {
            boards.push(board);
            board = [];
        }
    }

    return boards;
}

/**
 * calculate the score of the given board.
 * @param board the board to do the calculation for
 * @returns {number} the board score as integer.
 */
function calculateBoardScore(board, winningNumber) {
    let boardScore = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] > 0) {
                boardScore += board[i][j]
            }
        }
    }

    return boardScore * winningNumber;
}


