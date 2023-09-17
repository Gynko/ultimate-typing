import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
// Styles
import "./gameWords.styles.css";
// Components
import Timer from "../../components/timer/timer.component";
import Countdown from "../../components/countdown/countdown.component";
import RenderImage from "../../components/renderImage/renderImage.components";
import Score from "../../components/Score/score.component";
// Hooks bonanza
import { useShowCountdown } from "../../hooks/useShowCountdown";
import { useRandomWord } from "../../hooks/useRandomWord";
import { useKeyboardInput } from "../../hooks/useKeyboardInput";
import { useListOfWords } from "../../hooks/useListOfWords";
import Button3d from "../../components/button-3d/button-3d.component";

export default function GameWords() {
  const contextData = useContext(MyContext);
  const {
    theme,
    timer,
    setTimer,
    gameOver,
    setGameOver,
    resetGame,
    page,
    score,
    setScore,
  } = contextData;

  const showWordsContainer = useShowCountdown(3000);

  const [wordToRemove, setWordToRemove] = useState(null);
  const [wordsRemaining, setWordsRemaining] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordAsUnderscores, setWordAsUnderscores] = useState([]);
  const [leaderboardUpdated, setLeaderboardUpdated] = useState(false);

  let listOfWords = useListOfWords(theme, wordToRemove);
  const wordToGuess = useRandomWord(theme, listOfWords);

  // Score
  const [perfectWordsInARow, setperfectWordsInARow] = useState(0);
  const [wordScore, setWordScore] = useState(0);
  const perfectWord = 50;
  const threePerfectWordsInARow = 100;

  // Timer logic
  useEffect(() => {
    let timerId;
    if (showWordsContainer) {
      // Only start the timer after the initial countdown
      timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerId);
            return 0;
          }
        });
      }, 1000);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [showWordsContainer, setTimer]);

  useEffect(() => {
    setWordsRemaining(listOfWords.length);
  }, [listOfWords, wordsRemaining]);

  useEffect(() => {
    const newWordAsUnderscores = Array.from(
      { length: wordToGuess.length },
      () => "_"
    );
    setWordAsUnderscores(newWordAsUnderscores);
  }, [wordToGuess]);

  function removeWordFromList(word) {
    setWordToRemove(word);
    let index = 0;
    setWordIndex(index);
  }

  // Dealing with the keyboard inputs, updating the score and the display
  function listenInputsWriteOutputs(event) {
    const keyPressed = event.key;
    if (
      /\p{Letter}/u.test(keyPressed) &&
      keyPressed.length === 1 &&
      !gameOver
    ) {
      // Update the next score and the display based on the key pressed
      if (keyPressed === wordToGuess[wordIndex]) {
        setScore((prevScore) => prevScore + 1);
        setWordScore((prevWordScore) => prevWordScore + 1);
        wordAsUnderscores[wordIndex] = (
          <React.Fragment key={`correct-${wordIndex}-${keyPressed}`}>
            <span>{keyPressed}</span>
            <div className="score-display correct-score ">+1</div>
          </React.Fragment>
        );
      } else {
        setScore((prevScore) => prevScore - 1);
        let reset = 0;
        setperfectWordsInARow(reset);
        wordAsUnderscores[wordIndex] = (
          <React.Fragment key={`wrong-${wordIndex}-${keyPressed}`}>
            <span className="wrong-letter">{keyPressed}</span>
            <div className="score-display wrong-score">-1</div>
          </React.Fragment>
        );
      }
      let newWordIndex = wordIndex + 1;
      setWordIndex(newWordIndex);
      if (newWordIndex === wordToGuess.length) {
        let word = wordToGuess.join("");
        removeWordFromList(word);
      }
    }
  }
  useKeyboardInput(listenInputsWriteOutputs, showWordsContainer);

  // Reseting wordScore
  useEffect(() => {
    if (wordToGuess.length > 0) {
      setWordScore(0); // Reset word score
    }
  }, [wordToGuess]);

  // Dealing with perfect score
  useEffect(() => {
    if (wordToGuess.length > 0 && wordScore === wordToGuess.length) {
      setScore((prevScore) => prevScore + perfectWord);
      setperfectWordsInARow(
        (prevPerfectWordsInARow) => prevPerfectWordsInARow + 1
      );
      setWordScore(0); // Reset word score for the next word
    }
    if (perfectWordsInARow === 3) {
      setScore((prevScore) => prevScore + threePerfectWordsInARow);
      let reset = 0;
      setperfectWordsInARow(reset);
    }
  }, [wordToGuess, wordScore, perfectWordsInARow, setScore]);

  // When countdown reach 0
  useEffect(() => {
    if (timer === 0) {
      setGameOver((previous) => true);
    }
  }, [timer, setGameOver]);

  // Save score when the game is over
  useEffect(() => {
    if (gameOver && !leaderboardUpdated) {
      const leaderboard = JSON.parse(
        localStorage.getItem("leaderboard") || "[]"
      );
      leaderboard.push({
        name: contextData.currentUser,
        theme: contextData.theme,
        score: score,
      });
      leaderboard.sort((a, b) => b.score - a.score);
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

      setLeaderboardUpdated(true); // set the flag to true
    }
  }, [
    gameOver,
    score,
    contextData.currentUser,
    contextData.theme,
    leaderboardUpdated,
  ]);

  useEffect(() => {
    resetGame();
  }, [page]);

  return (
    <div className={`game-background game-background-${theme}`}>
      <div className="game-image-and-game-container">
        <RenderImage theme={theme} />
        <div className="game-container">
          {gameOver === false ? (
            <>
              <Score score={score} />
              <Timer />
              <Countdown />
              {showWordsContainer && (
                <div className="game-words-container">
                  <p className="game-word-to-write">{wordToGuess.join("")}</p>
                  <div className="game-word-being-written">
                    {wordAsUnderscores}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="game-over-container">
              <h2 className="game-over-title">Game over!</h2>
              <p className="game-over-score">Score: {score}</p>
              <Button3d
                color={"green"}
                size="big"
                text="To Leaderboard"
                type="button"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
