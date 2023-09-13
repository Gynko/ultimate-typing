import { useState, createContext } from "react";
import "./globalStyles.css";
import Home from "./pages/home/Home.component.jsx";
import Header from "./components/header/header.component.jsx";
import SelectGame from "./pages/selectGame/selectGame.component";

export const MyContext = createContext();

function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState("");

  function pageRender() {
    if (page === "home") return <Home />;
    else if (page === "select-game") return <SelectGame />;
  }

  return (
    <MyContext.Provider value={{ setPage, currentUser, setCurrentUser }}>
      <div>
        <Header></Header>
        {pageRender()}
      </div>
    </MyContext.Provider>
  );
}

export default App;
