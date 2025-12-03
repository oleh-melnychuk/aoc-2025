const fs = require("fs");
const path = require("path");

const getMaxNumbers = (numbers, lengthOfMaxNumber) => {
  let prevMaxNumberIndex = 0;
  const maxNumbers = [];
  for (let i = lengthOfMaxNumber; i > 0; i--) {
    const leftArr = numbers.slice(prevMaxNumberIndex, numbers.length - i + 1);
    const maxNumber = Math.max(...leftArr);

    prevMaxNumberIndex += leftArr.indexOf(maxNumber) + 1;
    maxNumbers.push(maxNumber * Math.pow(10, i - 1));
  }
  let sum = maxNumbers.reduce((acc, curr) => acc + curr, 0);
  return sum;
};

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "db", "input.txt"), "utf8");
  const parsedData = data.split("\n");

  let sumTwoNumbers = 0;
  let sumTwelveNumbers = 0;

  for (const line of parsedData) {
    const numbers = line.split("").map(Number);

    sumTwoNumbers += getMaxNumbers(numbers, 2);

    sumTwelveNumbers += getMaxNumbers(numbers, 12);
  }

  console.log(sumTwoNumbers);
  console.log(sumTwelveNumbers);
};

main();
