import React from "react";

const Score = props => {
  return (
    <div>
      <p>Wins: {props.wins}</p>
      <p>Losses: {props.losses}</p>
      {/* Increase the number of guesses by 1 to make the last guess 1, and not 0. It resets to 10 after 1 is guessed */}
      <p>Guesses Remaining: {props.numGuesses + 1}</p>
      <p>Wrong Guesses: {props.wrongGuesses}</p>
    </div>
  );
};

export default Score;
