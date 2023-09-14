import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import "./gameWords.styles.css";
import oktoberfestImage from "../../assets/images/octoberfest.jpeg";
import cancerAwarenessImage from "../../assets/images/cancer.jpg";
import Timer from "../../components/timer/timer.component";
import Countdown from "../../components/countdown/countdown.component";

export default function GameWords() {
  const contextData = useContext(MyContext);
  const { theme, gameMode } = contextData;
  const [showWordsContainer, setShowWordsContainer] = useState(false);

  // Use useEffect to delay the appearance of game-words-container
  useEffect(() => {
    const delay = setTimeout(() => {
      setShowWordsContainer(true);
    }, 3000); // Delay for 3 seconds

    return () => {
      clearTimeout(delay); // Clear the timeout if the component unmounts early
    };
  }, []);

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
              <p className="game-word-to-write">WITCH</p>
              <p className="game-word-being-written">_ _ _ _ _</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
