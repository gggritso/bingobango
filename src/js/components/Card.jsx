import React, { Component, Fragment } from "react";
import chunk from "lodash/chunk";
import take from "lodash/take";
import shuffle from "lodash/shuffle";

import DATA from "../data/home-alone.json";
const { TEXTS, FREE } = DATA;

export class Card extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
    this.toggle = this.toggle.bind(this);
    this.hasBeenDaubed = this.hasBeenDaubed.bind(this);

    try {
      this.state = JSON.parse(localStorage.getItem("bingo"));
      if (!this.state) {
        throw "No current state";
      }
    } catch (error) {
      this.state = this.newCard();
    }
  }

  newCard() {
    const pool = take(shuffle(TEXTS), 24);

    return {
      daubed: [FREE],
      texts: [...pool.slice(0, 12), FREE, ...pool.slice(12)],
    };
  }

  reset() {
    const card = this.newCard();
    this.setState(card);
    localStorage.setItem("bingo", JSON.stringify(card));
  }

  toggle(text) {
    this.hasBeenDaubed(text) ? this.undaub(text) : this.daub(text);
  }

  daub(textToDaub) {
    this.setState(
      {
        daubed: [...this.state.daubed, textToDaub],
      },
      () => {
        localStorage.setItem("bingo", JSON.stringify(this.state));
      }
    );
  }

  undaub(textToUndaub) {
    this.setState(
      {
        daubed: this.state.daubed.filter((text) => text !== textToUndaub),
      },
      () => {
        localStorage.setItem("bingo", JSON.stringify(this.state));
      }
    );
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
          <h1 className="flex items-center flex-grow-0 m-16 text-20">
            <span className="mr-auto">BingoBango </span>
            <button className="p-2 text-white bg-black" onClick={() => this.reset()}>
              New →
            </button>
          </h1>
        </div>
        <div className="text-center">
          <div className="inline-block border-black border-solid border-1">
            {chunk(this.state.texts, 5).map((row, y) => (
              <div className="flex justify-center" key={y}>
                {row.map((text, x) => {
                  return (
                    <div
                      className={`flex w-72 h-72 p-2 select-none items-center text-center justify-center border-solid border-1 border-black text-10 uppercase ${
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
        </div>
      </Fragment>
    );
  }
}
