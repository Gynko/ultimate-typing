import { useContext } from "react";
import { MyContext } from "../../App";
import "./gameMode.styles.css";

export default function GameMode({
  orientation,
  title,
  description,
  image,
  alt,
}) {
  const contextData = useContext(MyContext);
  const { setGameMode, setPage } = contextData;

  function onButtonClick(value) {
    setGameMode(value);
    setPage("select-theme");
  }
  return (
    <div className="gamemode-container">
      {orientation === "right" ? (
        <button
          className="gamemode-button"
          onClick={() => onButtonClick("word attack")}
        >
          <img className="gamemode-picture" src={image} width="150" alt={alt} />
          <div
            className={`gamemode-text-container gamemode-text-container-${orientation}`}
          >
            <h2 className="gamemode-text-h2">{title}</h2>
            <p className="gamemode-text-p">{description}</p>
          </div>
        </button>
      ) : (
        <button
          className="gamemode-button"
          onClick={() => onButtonClick("trivia")}
        >
          <div
            className={`gamemode-text-container gamemode-text-container-${orientation}`}
          >
            <h2 className="gamemode-text-h2">{title}</h2>
            <p className="gamemode-text-p">{description}</p>
          </div>
          <img className="gamemode-picture" src={image} width="150" alt={alt} />
        </button>
      )}
    </div>
  );
}
