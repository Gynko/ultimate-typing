import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
// Styles
import "./gameWords.styles.css";
// Components
import Timer from "../../components/timer/timer.component";
import Countdown from "../../components/countdown/countdown.component";
import RenderImage from "../../components/renderImage/renderImage.components";
import Score from "../../components/Score/score.component";
// Hooks
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
    setPage,
    score,
    setScore,
    leaderboardUpdated,
    setLeaderboardUpdated,
  } = contextData;

  const showWordsContainer = useShowCountdown(3000);

  const [wordToRemove, setWordToRemove] = useState(null);
  const [wordsRemaining, setWordsRemaining] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordAsUnderscores, setWordAsUnderscores] = useState([]);

  const [updatingLeaderboard, setUpdatingLeaderboard] = useState(false);

  let listOfWords = useListOfWords(theme, wordToRemove);
  const wordToGuess = useRandomWord(theme, listOfWords);

  const [perfectWordsInARow, setPerfectWordsInARow] = useState(0);
  const [wordScore, setWordScore] = useState(0);
  const [pointsLost, setPointsLost] = useState(0);
  const perfectWord = 50;
  const threePerfectWordsInARow = 100;

  useEffect(() => {
    let timerId;
    if (showWordsContainer) {
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

  function listenInputsWriteOutputs(event) {
    const keyPressed = event.key;
    if (
      /\p{Letter}/u.test(keyPressed) &&
      keyPressed.length === 1 &&
      !gameOver
    ) {
      if (keyPressed === wordToGuess[wordIndex]) {
        setScore((prevScore) => prevScore + 1);
        setWordScore((prevWordScore) => prevWordScore + 1);
        wordAsUnderscores[wordIndex] = (
          <React.Fragment key={`correct-${wordIndex}-${keyPressed}`}>
            <span>{keyPressed}</span>
            <div className={`score-display correct-score `}>+1</div>
          </React.Fragment>
        );
      } else {
        // Conditionally update the score based on points lost
        if (pointsLost < 5) {
          setScore((prevScore) => prevScore - 1);
          setPointsLost((prevPointsLost) => prevPointsLost + 1);
        }
        let reset = 0;
        setPerfectWordsInARow(reset);
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

  useEffect(() => {
    if (wordToGuess.length > 0) {
      setWordScore(0);
      setPointsLost(0); // Reset the points lost for the new word
    }
  }, [wordToGuess]);

  useEffect(() => {
    if (wordToGuess.length > 0 && wordScore === wordToGuess.length) {
      setScore((prevScore) => prevScore + perfectWord);
      setPerfectWordsInARow(
        (prevPerfectWordsInARow) => prevPerfectWordsInARow + 1
      );
      setWordScore(0);
    }
    if (perfectWordsInARow === 3) {
      setScore((prevScore) => prevScore + threePerfectWordsInARow);
      let reset = 0;
      setPerfectWordsInARow(reset);
    }
  }, [wordToGuess, wordScore, perfectWordsInARow, setScore]);

  useEffect(() => {
    if (timer === 0) {
      setGameOver(true);
    }
  }, [timer, setGameOver]);

  useEffect(() => {
    if (gameOver && !leaderboardUpdated && !updatingLeaderboard) {
      setUpdatingLeaderboard(true); // Acquire the lock

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

      setUpdatingLeaderboard(false); // Release the lock
    }
  }, [
    gameOver,
    contextData.currentUser,
    contextData.theme,
    score,
    leaderboardUpdated,
    updatingLeaderboard,
  ]);

  useEffect(() => {
    resetGame();
    setLeaderboardUpdated(false);
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
                click={() => setPage("leaderboard")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
