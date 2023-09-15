import { useContext, useEffect } from "react";
import { MyContext } from "../../App";

import "./gameWords.styles.css";

import oktoberfestImage from "../../assets/images/octoberfest.jpeg";
import cancerAwarenessImage from "../../assets/images/cancer.jpg";

import Timer from "../../components/timer/timer.component";
import Countdown from "../../components/countdown/countdown.component";

import { useShowCountdown } from "../../hooks/useShowCountdown";
import { useRandomWord } from "../../hooks/useRandomWord";
import { useKeyboardInput } from "../../hooks/useKeyboardInput";

export default function GameWords() {
  const contextData = useContext(MyContext);
  const { theme } = contextData;
  const showWordsContainer = useShowCountdown(3000);
  const wordToGuess = useRandomWord(theme);

  function listenToKeyboardInputs(event) {
    console.log("Key pressed:", event.key);
  }
  useKeyboardInput(listenToKeyboardInputs, showWordsContainer);

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
          className="game-image-left "
        />
      );
    }
  }

  return (
    <div className={`game-background game-background-${theme}`}>
      <div className="game-image-and-game-container">
        <div className="game-image-container">{renderImage()}</div>
        <div className="game-container">
          <Timer />
          <Countdown />
          {showWordsContainer && (
            <div className="game-words-container">
              <p className="game-word-to-write">{wordToGuess.join("")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
