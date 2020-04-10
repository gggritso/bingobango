import React, { Component, Fragment } from "react";

import TEXTS from "../data/meeting-cliches";

export class Card extends Component {
  constructor(props) {
    super(props);

    this.daub = this.daub.bind(this);
    this.hasBeenDaubed = this.hasBeenDaubed.bind(this);

    this.state = {
      daubed: [],
      texts: TEXTS
    };
  }

  daub(text) {
    this.setState({
      daubed: [...this.state.daubed, text]
    });
  }

  hasBeenDaubed(text) {
    return this.state.daubed.includes(text);
  }

  render() {
    return (
      <div className="">
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
