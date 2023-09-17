import { useState, createContext } from "react";
import "./globalStyles.css";
import Home from "./pages/home/Home.component.jsx";
import Header from "./components/header/header.component.jsx";
import SelectGame from "./pages/selectGame/selectGame.component";
import SelectTheme from "./pages/selectTheme/selectTheme.component";
import GameWords from "./pages/gameWords/gameWords.component";
import Leaderboard from "./pages/leaderboard/leaderboard.page";

export const MyContext = createContext();

function App() {
  const [page, setPage] = useState("game-words");
  const [currentUser, setCurrentUser] = useState("Bobby");
  const [gameMode, setGameMode] = useState("game-words");
  const [theme, setTheme] = useState("cancerAwareness");
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  function pageRender() {
    if (page === "home") return <Home />;
    else if (page === "select-game") return <SelectGame />;
    else if (page === "select-theme") return <SelectTheme />;
    else if (page === "game-words") return <GameWords />;
    else if (page === "leaderboard") return <Leaderboard />;
  }

  function resetGame() {
    setTimer(10);
    setGameOver(false);
    setScore(0);
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
