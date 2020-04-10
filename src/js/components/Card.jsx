import React, { Component, Fragment } from "react";
import chunk from "lodash/chunk";
import take from "lodash/take";
import shuffle from "lodash/shuffle";

import MEETING_CLICHES from "../data/meeting-cliches";

export class Card extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.hasBeenDaubed = this.hasBeenDaubed.bind(this);

    const pool = take(shuffle(MEETING_CLICHES), 24);

    this.state = {
      daubed: ["FREE"],
      texts: [...pool.slice(0, 12), "FREE", ...pool.slice(12)]
    };
  }

  toggle(text) {
    console.log(text);
    this.hasBeenDaubed(text) ? this.undaub(text) : this.daub(text);
  }

  daub(textToDaub) {
    this.setState({
      daubed: [...this.state.daubed, textToDaub]
    });
  }

  undaub(textToUndaub) {
    this.setState({
      daubed: this.state.daubed.filter(text => text !== textToUndaub)
    });
  }

  hasBeenDaubed(text) {
    return this.state.daubed.includes(text);
  }

  render() {
    const DAUBED_CLASSES = "text-white bg-black";
    const UNDAUBED_CLASSES = "text-black bg-white";

    return (
      <Fragment>
        <div className="text-center">
          <h1 className="text-20 my-16">BingoBango</h1>
        </div>
        <div className="text-center">
          {chunk(this.state.texts, 5).map((row, y) => (
            <div className="flex border-1 justify-center" key={y}>
              {row.map((text, x) => {
                return (
                  <div
                    className={`flex w-62 h-62 p-2 select-none items-center text-center justify-center border-solid border-1 border-black text-11 uppercase ${
                      this.hasBeenDaubed(text) ? DAUBED_CLASSES : UNDAUBED_CLASSES
                    }`}
                    key={x}
                    onClick={() => this.toggle(text)}
                  >
                    <span>{text}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}
