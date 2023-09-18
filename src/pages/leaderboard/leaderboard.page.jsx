import SectionTitle from "../../components/sectionTitle/sectionTitle.component";
import "./leaderboard.styles.css";

export default function Leaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
  };

  return (
    <div className="leaderboard-container">
      <SectionTitle title="Leaderboard"></SectionTitle>
      <ul className="leaderboard-ul">
        {leaderboard.map((entry, index) => (
          <li className="leaderboard-li" key={index}>
            <p className="lb-li-items lb-li-name">
              {getMedal(index)} {entry.name}
            </p>
            <p className="lb-li-items lb-li-score">{entry.score}</p>
            <p className="lb-li-items lb-li-theme">{entry.theme}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
