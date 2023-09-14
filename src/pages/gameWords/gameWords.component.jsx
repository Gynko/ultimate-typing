import { useContext, useEffect, useState, useRef } from "react";
import { MyContext } from "../../App";

import "./gameWords.styles.css";

import oktoberfestImage from "../../assets/images/octoberfest.jpeg";
import cancerAwarenessImage from "../../assets/images/cancer.jpg";

import Timer from "../../components/timer/timer.component";
import Countdown from "../../components/countdown/countdown.component";

import oktoberJson from "../../data/Oktoberfest.json";
import cancerJson from "../../data/CancerAwareness.json";

export default function GameWords() {
  const contextData = useContext(MyContext);
  const { theme } = contextData;
  const [showWordsContainer, setShowWordsContainer] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Set a delay to show the words container
    const delay = setTimeout(() => {
      setShowWordsContainer(true);
    }, 3000);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(delay);
    };
  }, []);

  useEffect(() => {
    // Check if showWordsContainer is true and inputRef.current exists
    if (showWordsContainer && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showWordsContainer]);

  let listOfWords;
  function getList() {
    if (theme === "oktoberfest") {
      listOfWords = oktoberJson.ord;
    } else if (theme === "cancerAwareness") {
      listOfWords = cancerJson.ord;
    }
  }

  function getRandomWord() {
    getList();
    const randomIndex = Math.floor(Math.random() * listOfWords.length);
    return listOfWords[randomIndex];
  }

  function Game() {
    const randomWord = getRandomWord();
    return randomWord;
  }

  // I get the random word
  // Then I show the word
  // Then I show the word with spacings
  // Then I start the countdown
  // Then I get the first input
  // I Check if matches the first letter
  // If so I trigger the +1 points, if not -1
  // Go to second

  function renderImage() {
    if (theme === "oktoberfest") {
      return (
        <img
          src={oktoberfestImage}
          alt="octoberfest"
          className="game-image-left"
        />
      );
    } else if (theme === "cancerAwareness") {
      return (
        <img
          src={cancerAwarenessImage}
          alt="cancer awareness with ribbon"
          className="game-image-left"
        />
      );
    }
  }

  function inputRender() {}

  return (
    <div className={`game-background game-background-${theme}`}>
      <div className="game-image-and-game-container">
        <div className="game-image-container">{renderImage()}</div>
        <div className="game-container">
          <Timer />
          <Countdown />
          {showWordsContainer && (
            <div className="game-words-container">
              <p className="game-word-to-write">{Game()}</p>
              <input
                ref={inputRef}
                type="text"
                className="game-word-being-written"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
