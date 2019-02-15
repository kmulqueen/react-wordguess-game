import React, { Component } from "react";
import { Container } from "reactstrap";
import Game from "./components/Game";

class App extends Component {
  render() {
    return (
      <Container>
        <Game />
      </Container>
    );
  }
}

export default App;
