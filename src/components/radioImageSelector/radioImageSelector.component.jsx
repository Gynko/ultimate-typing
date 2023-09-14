import { useState, useContext } from "react";
import { MyContext } from "../../App";
import "./radioImageSelector.styles.css";

const RadioImageSelector = ({ choices }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const contextData = useContext(MyContext);
  const { gameMode, setTheme, setPage } = contextData;

  const handleChoiceChange = (index, theme) => {
    setSelectedChoice(index);
    setTheme(theme);
  };

  return (
    <div className="radio-image-selector">
      {choices.map((choice, index) => (
        <label
          key={index}
          className={`radio-image-label ${
            index === selectedChoice ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="choices"
            value={choice.description}
            checked={index === selectedChoice}
            onChange={() => handleChoiceChange(index, choice.theme)}
            style={{ display: "none" }}
          />
          <div
            className={`radio-container ${
              index === selectedChoice ? "selected" : ""
            }`}
          >
            <img
              src={choice.image}
              alt={choice.description}
              className={`radio-image ${
                index === selectedChoice ? "selected" : ""
              }`}
            />
            <div className="description-container">
              <span className="description-text">{choice.description}</span>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioImageSelector;
