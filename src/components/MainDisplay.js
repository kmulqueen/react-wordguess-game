import React from "react";
import { Jumbotron, Button } from "reactstrap";
import Word from "./Word";
import Hint from "./Hint";
import Score from "./Score";

const MainDisplay = props => {
  return (
    <Jumbotron>
      <h1 className="display-3">Title</h1>

      <Hint hint={props.hint} />

      <Score
        wins={props.wins}
        losses={props.losses}
        wrongGuesses={props.wrongGuesses}
        numGuesses={props.numGuesses}
        className="my-2"
      />

      <Word word={props.word} underscores={props.underscores} />
      <p className="lead">
        <Button color="primary" onClick={props.startRound}>
          New Word
        </Button>
      </p>
    </Jumbotron>
  );
};

export default MainDisplay;
