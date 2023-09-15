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
  const [wordToGuess, setWordToGuess] = useState([]);

  // Showing the words after the 3s countdown is finished
  useEffect(() => {
    const delay = setTimeout(() => {
      setShowWordsContainer(true);
    }, 3000);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  function getRandomWord() {
    getList();
    const randomIndex = Math.floor(Math.random() * listOfWords.length);
    setWordToGuess(listOfWords[randomIndex].split(""));
  }

  let listOfWords;
  function getList() {
    if (theme === "oktoberfest") {
      listOfWords = oktoberJson.ord;
    } else if (theme === "cancerAwareness") {
      listOfWords = cancerJson.ord;
    }
  }

  useEffect(() => {
    getRandomWord();
  }, []);

  function listenToKeyboardInputs(event) {
    console.log("Key pressed:", event.key);
  }

  // Listen to keyboard inputs only after 3s delay
  useEffect(() => {
    if (showWordsContainer) {
      // Attach event listener
      window.addEventListener("keydown", listenToKeyboardInputs);

      // Cleanup
      return () => {
        window.removeEventListener("keydown", listenToKeyboardInputs);
      };
    }
  }, [showWordsContainer]);

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
