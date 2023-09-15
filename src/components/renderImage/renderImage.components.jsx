import oktoberfestImage from "../../assets/images/octoberfest.jpeg";
import cancerAwarenessImage from "../../assets/images/cancer.jpg";
import "./renderImage.styles.css";

export default function RenderImage({ theme }) {
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
  return <div className="game-image-container">{renderImage()}</div>;
}
