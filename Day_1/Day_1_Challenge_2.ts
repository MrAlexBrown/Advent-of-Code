import * as fs from 'fs';

// The trap is that the strings cannot be directly replaced due to overlapping;
// Simply replacing strings with numbers and invoking part 1 solution does not work.
// There is actually very little in common between the two 'parts' of 'the same' problem.

interface NumberWordMapping {
    [key: string]: number;
}

const numberWordsToDigits: NumberWordMapping = {
    // NO ZERO
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

const regex = /zero|one|two|three|four|five|six|seven|eight|nine|\d/g;  // zero is not mentioned

function findFirstNumber(currentString: string) {
const matchesRegEx = currentString.match(regex);
if (matchesRegEx) {
    if (matchesRegEx[0].length > 1) {
    return numberWordsToDigits[matchesRegEx[0]].toString();
    } else {
    return matchesRegEx[0].toString();
    }
} else {
    return 'number not detected, input is erroneous';
}
}

function findLastNumber(currentString: string) {
    // for larger inputs this could probably be optimized to not retread the first number. This is typescript tho.
let number = '';
let length = currentString.length;

while (number == '') {
    const matchesRegex = currentString.slice(length--, currentString.length).match(regex);   // yes we have to go backwards because the words may overlap
    if (matchesRegex) {
    if (matchesRegex[0].length > 1) {
        return numberWordsToDigits[matchesRegex[0]].toString();
    } else {
        return matchesRegex[0].toString();
    }
    }
}
}

try {
const data = fs.readFileSync('Day_1/Day_1_Challenge_1_puzzle_input.txt', 'utf8');
const splitlines = data.split(/\r?\n/);   // .txt and split at newlines

const Total = splitlines
    .map((splitlines) => {
    const firstDigit = findFirstNumber(splitlines);
    const lastDigit = findLastNumber(splitlines);

    return parseInt(firstDigit + lastDigit, 10);
    })
    .reduce((sum, num) => sum + num, 0);

console.log(Total);
} catch (err) { // Not sure what could even come up here
console.error(err);
}