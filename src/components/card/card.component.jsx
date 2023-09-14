import "./card.styles.css";

export default function Card({ src, alt, click, description }) {
  const [textAbove, textBelow] = description.split("@");
  return (
    <button className="card-button" onClick={click}>
      <img src={src} alt={alt} height="260" className="card-image" />
      <div className="card-desc-container">
        <p className="card-description">
          {textAbove}
          <span className="card-text-below">{textBelow}</span>
        </p>
      </div>
    </button>
  );
}
