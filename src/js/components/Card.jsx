import React, { Component, Fragment } from "react";
import chunk from "lodash/chunk";
import take from "lodash/take";
import shuffle from "lodash/shuffle";

import DATA from "../data/oscars-2025.json";
const { TITLE, TEXTS, FREE } = DATA;

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

  throwError() {
    throw new Error("Uh oh, Now you've done it!");
  }

  newCard() {
    const pool = take(shuffle(TEXTS), 24);

    return {
      daubed: [FREE],
      texts: [...pool.slice(0, 12), FREE, ...pool.slice(12)]
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
        daubed: [...this.state.daubed, textToDaub]
      },
      () => {
        localStorage.setItem("bingo", JSON.stringify(this.state));
      }
    );
  }

  undaub(textToUndaub) {
    this.setState(
      {
        daubed: this.state.daubed.filter(text => text !== textToUndaub)
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
    return (
      <Fragment>
        <div className="text-center">
          <h1 className="flex items-center flex-grow-0 m-16 text-20">
            <span className="mr-auto">{TITLE ?? "BingoBango"}</span>
            <button
              className="p-2 text-white bg-black"
              onClick={() => this.reset()}
            >
              New →
            </button>
          </h1>
        </div>
        <div className="text-center">
          <div className="inline-block border-black border-solid border-1">
            {chunk(this.state.texts, 5).map((row, y) => (
              <div className="flex justify-center" key={y}>
                {row.map((text, x) => {
                  return text.endsWith(".jpg") ? (
                    <ImageCell
                      url={text}
                      hasBeenDaubed={this.hasBeenDaubed(text)}
                      key={x}
                      onClick={() => this.toggle(text)}
                    />
                  ) : (
                    <TextCell
                      text={text}
                      hasBeenDaubed={this.hasBeenDaubed(text)}
                      key={x}
                      onClick={() => this.toggle(text)}
                    />
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

const TextCell = ({ text, hasBeenDaubed, onClick }) => {
  const DAUBED_CLASSES = "text-white bg-black";
  const UNDAUBED_CLASSES = "text-black bg-white";

  return (
    <div
      className={`flex w-72 h-72 p-2 select-none items-center text-center justify-center leading-3 border-solid border-1 border-black text-10 uppercase ${
        hasBeenDaubed ? DAUBED_CLASSES : UNDAUBED_CLASSES
      }`}
      onClick={onClick}
    >
      <span>{text}</span>
    </div>
  );
};

const ImageCell = ({ url, hasBeenDaubed, onClick }) => {
  const DAUBED_CLASSES = "opacity-25";
  const UNDAUBED_CLASSES = "opacity-100";

  return (
    <div
      className={`flex w-72 h-72 p-2 bg-black select-none border-solid border-1 border-black`}
      onClick={onClick}
    >
      <img
        src={`./img/${url}`}
        className={` ${hasBeenDaubed ? DAUBED_CLASSES : UNDAUBED_CLASSES}`}
      />
    </div>
  );
};
