import "./score.styles.css";
export default function Score({ score }) {
  return (
    <div className="score-container">
      {score}
      <span className="score-points">points</span>
    </div>
  );
}
