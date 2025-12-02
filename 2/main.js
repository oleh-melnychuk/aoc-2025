const fs = require('fs');
const path = require('path');


const isInvalidId = (number) => {
    if(number.startsWith('0')) {
        return false;
    }
    const length = number.length;
    if(length % 2 !== 0 ){
        return false;
    }

    return number.slice(0, length / 2) === number.slice(length / 2, length);
}

const isExtremlyInvalid = (number) => {
   const half = Math.floor(number.length / 2);


   for(let i = 1; i <= half; i++) {
    const firstPart = number.slice(0, i);
    const repeatetString = firstPart.repeat(Math.floor(number.length / i));
    if(repeatetString === number) {
        return true;
    }
   }

   return false;

}

const main = () => {
    const data = fs.readFileSync(path.join(__dirname, 'db', 'input.txt'), 'utf8');
    const ranges = data.split(',');

    const duplicateNumbers = [];
    const extremlyInvalidNumbers = [];
   
    for (const range of ranges) {
        const [start, end] = range.split('-').map(Number);
        for (let i = start; i <= end; i++) {
            if(isInvalidId(i.toString())) {
                duplicateNumbers.push(parseInt(i));
            }
            if(isExtremlyInvalid(i.toString())) {
                extremlyInvalidNumbers.push(parseInt(i));
            }
        }
    }


    const sumOfExtremlyInvalidNumbers = extremlyInvalidNumbers.reduce((acc, curr) => acc + curr, 0);
    console.log('sumOfExtremlyInvalidNumbers', sumOfExtremlyInvalidNumbers);

    const sumOfDuplicateNumbers = duplicateNumbers.reduce((acc, curr) => acc + curr, 0);
    console.log('sumOfDuplicateNumbers', sumOfDuplicateNumbers);



}

main();