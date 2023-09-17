import "./leaderboard.styles.css";

export default function Leaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
