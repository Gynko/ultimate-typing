import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
import "./gameMode.styles.css";

export default function GameMode({
  orientation,
  title,
  description,
  image,
  alt,
  game,
}) {
  const contextData = useContext(MyContext);
  const { gameMode, setGameMode } = contextData;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(gameMode === game); // Compare to the 'game' prop
  }, [gameMode, game]);

  function onButtonClick(value) {
    setGameMode(value);
  }

  return (
    <div className="gamemode-container">
      {orientation === "right" ? (
        <button
          className="gamemode-button"
          value={game} // Use 'game' prop here
          onClick={() => onButtonClick(game)} // Use 'game' prop here
        >
          <img
            className={`gamemode-picture ${isSelected ? "selected" : ""}`}
            src={image}
            width="150"
            alt={alt}
          />
          <div
            className={`gamemode-text-container gamemode-text-container-${orientation}`}
          >
            <h2 className="gamemode-text-h2">{title}</h2>
            <p className="gamemode-text-p">{description}</p>
          </div>
        </button>
      ) : null}
    </div>
  );
}
