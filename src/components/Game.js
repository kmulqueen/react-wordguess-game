import React, { Component } from "react";
import MainDisplay from "./MainDisplay";
import { Container } from "reactstrap";
import words from "../words.json";

class Game extends Component {
  state = {
    words,
    selectedWord: "",
    selectedHint: "",
    lettersInWord: [],
    numBlanks: 0,
    blanksAndSuccesses: [],
    wrongGuesses: [],
    winCounter: 0,
    lossCounter: 0,
    // Set to 9 but displays 10 to make the display proper. *see Score.js
    numGuesses: 9
  };

  // start new round
  startRound = () => {
    // pick word & hint
    const { words } = this.state;
    const randomIndex = Math.floor(Math.random() * words.length);
    const pickedWord = words[randomIndex].word;
    const pickedHint = words[randomIndex].hint;

    // get the number of letters & letters in word
    const numLetters = pickedWord.length;
    const wordLetters = pickedWord.split("");

    // loop through number of letters & push underscores
    const underscores = [];
    for (var i = 0; i < numLetters; i++) {
      if (wordLetters[i] === " ") {
        underscores.push(" ");
      } else {
        underscores.push("_");
      }
    }
    this.setState({
      selectedWord: pickedWord,
      selectedHint: pickedHint,
      numBlanks: numLetters,
      lettersInWord: wordLetters,
      blanksAndSuccesses: underscores,
      numGuesses: 9,
      wrongGuesses: []
    });
  };

  // check user guess
  checkLetters = letter => {
    // get the letter guessed
    const letterGuessed = letter.key;
    const { selectedWord, numBlanks, blanksAndSuccesses } = this.state;
    let letterFound = false;

    // loop through the word and see if the letter guessed is found
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] === letterGuessed) {
        letterFound = true;
      }
    }

    // if the letter guessed is found, update the blanks array
    if (letterFound) {
      for (var j = 0; j < numBlanks; j++) {
        if (selectedWord[j] === letterGuessed) {
          blanksAndSuccesses[j] = letterGuessed;
        }
      }
      this.setState({
        blanksAndSuccesses
      });
    } else {
      // if the letter isn't found, push it to the wrongPick array
      const wrongPick = [];
      wrongPick.push(letterGuessed);
      this.setState({
        numGuesses: this.state.numGuesses - 1,
        wrongGuesses: [...this.state.wrongGuesses, wrongPick]
      });
    }
  };

  // game running, checking for all of the inputs and wins/losses
  checkGame = key => {
    console.log("check game ran.");
    this.checkLetters(key);
    this.checkLoss();
    this.checkWin();
  };

  // check for loss
  checkLoss = () => {
    const {
      numGuesses,
      blanksAndSuccesses,
      lettersInWord,
      lossCounter
    } = this.state;

    // convert arrays to strings to be compared
    let blankString = blanksAndSuccesses.toString();
    let letterString = lettersInWord.toString();

    // if the number of guesses is 0 AND the user still hasn't guessed the word, update losses
    if (numGuesses === 0 && blankString !== letterString) {
      this.setState({
        lossCounter: lossCounter + 1
      });
      this.startRound();
    }
  };

  // check for win
  checkWin = () => {
    const { blanksAndSuccesses, lettersInWord, winCounter } = this.state;
    // convert arrays to strings to be compared
    let blankString = blanksAndSuccesses.toString();
    let letterString = lettersInWord.toString();

    // compare the string values. if they equal, increase wincounter then start new round
    if (blankString === letterString) {
      this.setState({
        winCounter: winCounter + 1
      });
      this.startRound();
    }
  };

  render() {
    return (
      <Container onKeyUp={this.checkGame}>
        <MainDisplay
          word={this.state.selectedWord}
          hint={this.state.selectedHint}
          wins={this.state.winCounter}
          losses={this.state.lossCounter}
          wrongGuesses={this.state.wrongGuesses}
          numGuesses={this.state.numGuesses}
          startRound={this.startRound}
          checkLetters={this.checkLetters}
          underscores={this.state.blanksAndSuccesses}
        />
      </Container>
    );
  }
}

export default Game;
