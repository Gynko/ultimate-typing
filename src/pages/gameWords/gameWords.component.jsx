import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowWordsContainer(true);
    }, 3000);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  let list = [];
  function getList(list) {
    if (theme === "oktoberfest") {
      list = oktoberJson.ord;
    } else if (theme === "cancerAwareness") {
      list = cancerJson.ord;
    }
  }

  function getRandomWord(list) {
    getList(list);
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

  function Game() {
    const randomWord = getRandomWord();
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

  return (
    <div className={`game-background game-background-${theme}`}>
      <div className="game-image-and-game-container">
        <div className="game-image-container">{renderImage()}</div>
        <div className="game-container">
          <Timer />
          <Countdown />
          {showWordsContainer && (
            <div className="game-words-container">
              <p className="game-word-to-write">{}</p>
              <input type="text" className="game-word-being-written" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
