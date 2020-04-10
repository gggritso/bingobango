import React, { Component, Fragment } from "react";

import CARDS from "../data/cards";

export class Card extends Component {
  constructor(props) {
    super(props);

    this.daub = this.daub.bind(this);

    this.state = {
      daubed: [],
      board: CARDS.test
    };
  }

  daub(square) {
    this.setState({
      daubed: [...this.state.daubed, square]
    });
  }

  render() {
    return (
      <div className="grid grid-cols-5 grid-rows-5">
        {this.state.board.map((row, y) => (
          <div className="row" key={y}>
            {row.map((square, x) => {
              return (
                <div
                  className={`relative`}
                  style={{ "padding-bottom": "100%" }}
                  key={x}
                  onClick={() => this.daub(square)}
                >
                  <span>{square}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}
