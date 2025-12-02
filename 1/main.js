const fs = require('fs');
const path = require('path');


const getCountOfZero = (previousPosition, position) => {
     if (position < 0){
        const value = Math.abs(Math.trunc(position / 100));
        return previousPosition === 0 ? value : value + 1;
     }
     if(position >= 100) {
        return Math.abs(Math.trunc(position / 100));
     }
     if(position === 0){
        return 1;
     }
     return 0;
 }

const main = () => {

    console.log(path.join(__dirname, 'db', 'task1.txt'))
   const data = fs.readFileSync(path.join(__dirname, 'db', 'task1.txt'), 'utf8');
   const parsedData = data.split('\n');
   

   let position = 50;
   let previousPosition = 50;
   let countOfExtremlyZero = 0;
   let countOfZero = 0;


   for (const step of parsedData) {
    const direction = step[0];
    const count = parseInt(step.slice(1));

    if(!direction || !count) {
        continue;
    }



    // move left
    if (direction === 'L') {
        position -= count;
    } 
    // move right
    else if (direction === 'R') {
        position += count;
    }

    countOfZero += getCountOfZero(previousPosition, position);


    // if position is 0, increment countOfZero
    if(position === 0  || position % 100 === 0) {
        countOfExtremlyZero += 1;
        position = 0;
    }

    //  If position is less than 0, set position to positive value from another side of the circle
    if (position < 0) {
        position =  100 - Math.abs(position % 100) ;
    }
    // If position is greater than 100, set position to negative value from another side of the circle
    else if (position > 100) {
        position = position % 100;
    }

    previousPosition = position;

   }

   console.log('countOfZero', countOfZero, 'countOfExtremlyZero', countOfExtremlyZero);
}

main();