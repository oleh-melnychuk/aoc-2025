const fs = require('fs');
const path = require('path');


const main = () => {

    console.log(path.join(__dirname, 'db', 'task1.txt'))
   const data = fs.readFileSync(path.join(__dirname, 'db', 'task1.txt'), 'utf8');
   const parsedData = data.split('\n');
   

   let position = 50;
   let countOfSteps = 0;
   let countOfZero = 0;


   for (const step of parsedData) {
    const direction = step[0];
    const count = parseInt(step.slice(1));

    if(!direction || !count) {
        continue;
    }

    console.log('direction', direction, 'count', count);


    // move left
    if (direction === 'L') {
        position -= count;
    } 
    // move right
    else if (direction === 'R') {
        position += count;
    }


    // if position is 0, increment countOfZero
    if(position === 0  || position % 100 === 0) {
        countOfZero += 1;
        continue;
    }

    //  If position is less than 0, set position to positive value from another side of the circle
    if (position < 0) {
        position =  100 - Math.abs(position % 100) ;
    }
    // If position is greater than 100, set position to negative value from another side of the circle
    else if (position > 100) {
        position = position % 100;
    }

    // increment count of steps
    countOfSteps += 1;
    console.log('position', position);
    console.log('________________________________________');
   }

   console.log(position);
   console.log('countOfZero', countOfZero);
   console.log('countOfSteps', countOfSteps);
}

main();