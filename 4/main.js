const fs = require("fs");
const path = require("path");

const getAdjacentCells = (i, j, matrix) => {
  const adjacentCells = [
    matrix[i - 1]?.[j - 1],
    matrix[i - 1]?.[j],
    matrix[i - 1]?.[j + 1],
    matrix[i]?.[j - 1],
    matrix[i]?.[j + 1],
    matrix[i + 1]?.[j - 1],
    matrix[i + 1]?.[j],
    matrix[i + 1]?.[j + 1],
  ].filter((cell) => cell !== undefined);

  return adjacentCells;
};
const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "db", "input.txt"), "utf8");
  const parsedData = data.split("\n");

  const matrix = parsedData.map((row) =>
    row.split("").map((char) => (char === "@" ? 1 : 0))
  );
  const matrixCopy = matrix.map((row) => row.map((cell) => cell));

  let countOfRolls = 0;

  let loop = true;
  while (loop) {
    for (let i = 0; i < matrix.length; i++) {
       loop = false;
      for (let j = 0; j < matrix[i].length; j++) {
        const adjacentCells = getAdjacentCells(i, j, matrix);
        const countOfAdjacentRolls = adjacentCells.filter(
          (cell) => cell === 1
        ).length;
        if (countOfAdjacentRolls < 4 && matrixCopy[i][j] === 1) {
          countOfRolls++;
          matrix[i][j] = 0;
          matrixCopy[i][j] = 2;
          loop = true;
        }
      }
    }
  }

  console.log(countOfRolls);
  console.log(matrix);
  console.log(matrixCopy);
};

main();
