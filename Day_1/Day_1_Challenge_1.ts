/*

*/

import * as fs from 'fs';

// read input file
const input: string = fs.readFileSync('Day_1/Day_1_Challenge_1_puzzle_input.txt', 'utf8');

// split the input into an array of strings
const inputArray: string[] = input.split('\n');
// make another empty array to store the numbers, one per line
const inputNumbers: number[] = [];

// for each string in the array, find the first number (0 to 9, ignoring text) which appears and set it to firstdigit
// then find the last number (0 to 9, ignoring text) which appears and set it to seconddigit
// each line in the input file has at least one number but also has letters which we want to ignore

for (let i = 0; i < inputArray.length; i++) {
    const firstDigit: number = Number(inputArray[i].match(/\d/));
    const secondDigit: number = Number(inputArray[i].match(/\d/g).pop()); // this will never be undefined because we know there is at least one number on each line
    // combine the two digits into a number (e.g. 1 and 2 becomes 12) and push it to the inputNumbers array
    inputNumbers.push(firstDigit * 10 + secondDigit);
}

// now add together all the numbers in the inputNumbers array
let total: number = 0;
for (let i = 0; i < inputNumbers.length; i++) {
    total += inputNumbers[i];
}

// print the total
console.log(total);