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
  const [wordToGuess, setWordToGuess] = useState([]);
  const [wordAsUnderscores, setWordAsUnderscores] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowWordsContainer(true);
    }, 3000);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  useEffect(() => {
    if (showWordsContainer && inputRef.current) {
      inputRef.current.focus();
      getRandomWord();
    }
  }, [showWordsContainer]);

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

  function checkInput(event) {
    const inputValue = event.target.value;
    let newScore = 0; // Temp variable to hold the new score

    if (inputValue.length <= wordToGuess.length) {
      let updatedWord = "";

      for (let index = 0; index < wordToGuess.length; index++) {
        let scoreDisplay = "";

        if (inputValue[index] === undefined) {
          updatedWord += "_";
        } else if (inputValue[index] !== wordToGuess[index]) {
          newScore -= 1; // Subtract 1 from score for incorrect letter
          scoreDisplay = '<span class="score-display wrong-score">-1</span>';
          updatedWord += `<span class="wrong-letter">${inputValue[index]}</span>${scoreDisplay}`;
        } else {
          newScore += 1; // Add 1 to score for correct letter
          scoreDisplay = '<span class="score-display correct-score">+1</span>';
          updatedWord += `${inputValue[index]}${scoreDisplay}`;
        }
      }

      setWordAsUnderscores(updatedWord);
      setScore(newScore); // Update the score state with the new score
    }
  }

  useEffect(() => {
    function wordToUnderscores() {
      const initialUnderscores = Array.from(
        { length: wordToGuess.length },
        () => "_"
      ).join("");
      setWordAsUnderscores(initialUnderscores);
    }
    wordToUnderscores();
  }, [wordToGuess]);

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

  function preventBackspace(event) {
    if (event.key === "Backspace") {
      event.preventDefault();
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
              <p
                className="game-word-to-write"
                dangerouslySetInnerHTML={{ __html: wordAsUnderscores }}
              ></p>

              <input
                ref={inputRef}
                type="text"
                onChange={checkInput}
                className="game-word-being-written hide-caret"
                onKeyDown={preventBackspace}
              />
            </div>
          )}
          <p>SCORE: {score}</p>
        </div>
      </div>
    </div>
  );
}
