import React from "react";
import { Row, Col, Button } from "reactstrap";
import Word from "./Word";
import Hint from "./Hint";
import Score from "./Score";

const MainDisplay = props => {
  return (
    <div>
      <Row>
        <Col className="text-center">Word Guess Game</Col>
      </Row>
      <Row>
        <Score
          wins={props.wins}
          losses={props.losses}
          wrongGuesses={props.wrongGuesses}
          numGuesses={props.numGuesses}
        />
        <Col md="8">
          <Hint hint={props.hint} />
          <Word word={props.word} underscores={props.underscores} />
        </Col>
      </Row>
      <Row>
        <Button
          className="start-round-button"
          color="info"
          onClick={props.startRound}
        >
          Start Round
        </Button>
      </Row>
    </div>
  );
};

export default MainDisplay;
