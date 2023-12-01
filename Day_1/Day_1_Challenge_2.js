"use strict";
exports.__esModule = true;
var fs = require("fs");
var numberWordsToDigits = {
    // NO ZERO
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};
var regex = /zero|one|two|three|four|five|six|seven|eight|nine|\d/g; // zero is not mentioned
function findFirstNumber(currentString) {
    var matchesRegEx = currentString.match(regex);
    if (matchesRegEx) {
        if (matchesRegEx[0].length > 1) {
            return numberWordsToDigits[matchesRegEx[0]].toString();
        }
        else {
            return matchesRegEx[0].toString();
        }
    }
    else {
        return 'number not detected, input is erroneous';
    }
}
function findLastNumber(currentString) {
    // for larger inputs this could probably be optimized to not retread the first number. This is typescript tho.
    var number = '';
    var length = currentString.length;
    while (number == '') {
        var matchesRegex = currentString.slice(length--, currentString.length).match(regex); // yes we have to go backwards because the words may overlap
        if (matchesRegex) {
            if (matchesRegex[0].length > 1) {
                return numberWordsToDigits[matchesRegex[0]].toString();
            }
            else {
                return matchesRegex[0].toString();
            }
        }
    }
}
try {
    var data = fs.readFileSync('Day_1/Day_1_Challenge_1_puzzle_input.txt', 'utf8');
    var splitlines = data.split(/\r?\n/); // .txt and split at newlines
    var Total = splitlines
        .map(function (splitlines) {
        var firstDigit = findFirstNumber(splitlines);
        var lastDigit = findLastNumber(splitlines);
        return parseInt(firstDigit + lastDigit, 10);
    })
        .reduce(function (sum, num) { return sum + num; }, 0);
    console.log(Total);
}
catch (err) { // Not sure what could even come up here
    console.error(err);
}
