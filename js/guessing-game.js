/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
function generateWinningNumber() {
  let num = Math.random() * 100 + 1;
  return Math.floor(num);
}
console.log(generateWinningNumber());
function shuffle(arr) {
  //Fisher-Yates - https://bost.ocks.org/mike/shuffle/
  for (let i = arr.length - 1; i > 0; i--) {
    debugger;
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower() {
    if (this.playersGuess < this.winningNumber) {
      return true;
    } else return false;
  }

  playersGuessSubmission(num1) {
    if (num1 > 100 || num1 < 1 || typeof num1 !== "number") {
      throw "That is an invalid guess.";
    } else this.playersGuess = num1;
    return this.checkGuess();
  }
}
Game.prototype.checkGuess = function () {
  let count = 0;
  while (count < 6) {
    if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    } else {
      this.pastGuesses.push(this.playersGuess);
      count = count + 1;
      if (count === 5) {
        return "You Lose";
      }
      if (this.difference() < 10) {
        return "You're burning up!";
      } else if (this.difference() < 25) {
        return "You're lukewarm.";
      } else if (this.difference() < 50) {
        return "You're a bit chilly.";
      } else {
        return "You're ice cold!";
      }
    }
  }
};
function newGame() {
  const game = new Game();
  return game;
}
Game.prototype.provideHint = function () {
  let arr2 = [];
  arr2.push(Game.winningNumber);
  while (arr2.length < 3) {
    arr2.push(generateWinningNumber());
  }
  return shuffle(arr2);
};
// console.log(game.playersGuessSubmission(72));
// console.log(game.difference());
// console.log(game.playersGuess);
