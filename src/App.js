import { useState, createContext } from "react";
import "./globalStyles.css";
import Home from "./pages/home/Home.component.jsx";
import Header from "./components/header/header.component.jsx";
import SelectGame from "./pages/selectGame/selectGame.component";
import GameWords from "./pages/gameWords/gameWords.component";
import Leaderboard from "./pages/leaderboard/leaderboard.page";

export const MyContext = createContext();

function App() {
  const [page, setPage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [theme, setTheme] = useState("");
  const TIMER = 45;
  const [timer, setTimer] = useState(TIMER);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [leaderboardUpdated, setLeaderboardUpdated] = useState(false);

  function pageRender() {
    if (page === "home") return <Home />;
    else if (page === "select-game") return <SelectGame />;
    else if (page === "game-words") return <GameWords />;
    else if (page === "leaderboard") return <Leaderboard />;
  }

  function resetGame() {
    setTimer(TIMER);
    setGameOver(false);
    setScore(0);
    setLeaderboardUpdated(false);
  }

  return (
    <MyContext.Provider
      value={{
        setPage,
        currentUser,
        setCurrentUser,
        gameMode,
        setGameMode,
        theme,
        leaderboardUpdated,
        setLeaderboardUpdated,
        setTheme,
        timer,
        setTimer,
        resetGame,
        gameOver,
        setGameOver,
        score,
        setScore,
      }}
    >
      <div>
        <Header></Header>
        {pageRender()}
      </div>
    </MyContext.Provider>
  );
}

export default App;
